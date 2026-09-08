import json
import time
from typing import Optional
from .base import BaseOtpStore, OtpRecord, UserRecord

try:
    import redis.asyncio as aioredis
except ImportError:
    aioredis = None

class RedisOtpStore(BaseOtpStore):
    def __init__(self, redis_url: str):
        self.redis_url = redis_url
        self.client: Optional["aioredis.Redis"] = None

    def _key(self, email: str) -> str:
        return f"otp:{email.lower().strip()}"

    async def initialize(self) -> None:
        if aioredis is None:
            raise RuntimeError("redis package is not installed.")
        self.client = aioredis.from_url(
            self.redis_url,
            decode_responses=True,
            socket_connect_timeout=2.0
        )
        # Ping to verify connection
        await self.client.ping()

    async def close(self) -> None:
        if self.client:
            await self.client.aclose()

    async def save_otp(self, record: OtpRecord, ttl_seconds: int) -> None:
        if not self.client:
            raise RuntimeError("Redis store not initialized")
        
        key = self._key(record.email)
        payload = {
            "email": record.email.lower(),
            "hashed_otp": record.hashed_otp,
            "salt": record.salt,
            "created_at": str(record.created_at),
            "expires_at": str(record.expires_at),
            "attempts": str(record.attempts),
            "max_attempts": str(record.max_attempts)
        }
        # Store as hash and set TTL
        async with self.client.pipeline(transaction=True) as pipe:
            pipe.hset(key, mapping=payload)
            pipe.expire(key, ttl_seconds)
            await pipe.execute()

    async def get_otp(self, email: str) -> Optional[OtpRecord]:
        if not self.client:
            raise RuntimeError("Redis store not initialized")
        
        key = self._key(email)
        data = await self.client.hgetall(key)
        if not data:
            return None
        
        return OtpRecord(
            email=data["email"],
            hashed_otp=data["hashed_otp"],
            salt=data["salt"],
            created_at=float(data["created_at"]),
            expires_at=float(data["expires_at"]),
            attempts=int(data.get("attempts", 0)),
            max_attempts=int(data.get("max_attempts", 5))
        )

    async def increment_attempts(self, email: str) -> int:
        if not self.client:
            raise RuntimeError("Redis store not initialized")
        
        key = self._key(email)
        new_val = await self.client.hincrby(key, "attempts", 1)
        return int(new_val)

    async def delete_otp(self, email: str) -> bool:
        if not self.client:
            raise RuntimeError("Redis store not initialized")
        
        key = self._key(email)
        deleted = await self.client.delete(key)
        return bool(deleted > 0)

    async def get_user(self, email: str) -> Optional[UserRecord]:
        if not self.client:
            raise RuntimeError("Redis store not initialized")
        user_key = f"oneid:user:{email.lower().strip()}"
        data = await self.client.hgetall(user_key)
        if not data:
            # Check default seed for Abhijay
            if email.lower().strip() in ("parasharabhijay@gmail.com", "abhijay.parashar@example.com"):
                return UserRecord(
                    id="usr_oneid_8921",
                    name="Abhijay Parashar",
                    email=email.lower().strip(),
                    mobile="+91 98765 43210",
                    created_at=time.time(),
                    is_verified=True
                )
            return None
        return UserRecord(
            id=data["id"],
            name=data["name"],
            email=data["email"],
            mobile=data.get("mobile"),
            created_at=float(data.get("created_at", 0)),
            is_verified=bool(int(data.get("is_verified", 1)))
        )

    async def save_user(self, user: UserRecord) -> None:
        if not self.client:
            raise RuntimeError("Redis store not initialized")
        user_key = f"oneid:user:{user.email.lower().strip()}"
        await self.client.hset(user_key, mapping={
            "id": user.id,
            "name": user.name,
            "email": user.email.lower().strip(),
            "mobile": user.mobile or "",
            "created_at": str(user.created_at or time.time()),
            "is_verified": "1" if user.is_verified else "0"
        })

    async def get_name(self) -> str:
        return f"Redis (In-Memory Key-Value with Native TTL @ {self.redis_url})"
