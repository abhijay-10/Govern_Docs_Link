from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Optional
import time

@dataclass
class OtpRecord:
    email: str
    hashed_otp: str
    salt: str
    created_at: float
    expires_at: float
    attempts: int = 0
    max_attempts: int = 5

    @property
    def is_expired(self) -> bool:
        return time.time() > self.expires_at

    @property
    def is_locked(self) -> bool:
        return self.attempts >= self.max_attempts

@dataclass
class UserRecord:
    id: str
    name: str
    email: str
    mobile: Optional[str] = None
    created_at: float = 0.0
    is_verified: bool = True

class BaseOtpStore(ABC):
    @abstractmethod
    async def initialize(self) -> None:
        """Initialize the storage engine (tables, connections, etc.)"""
        pass

    @abstractmethod
    async def close(self) -> None:
        """Close connections cleanly"""
        pass

    @abstractmethod
    async def save_otp(self, record: OtpRecord, ttl_seconds: int) -> None:
        """Store hashed OTP with TTL"""
        pass

    @abstractmethod
    async def get_otp(self, email: str) -> Optional[OtpRecord]:
        """Fetch active OTP record for email"""
        pass

    @abstractmethod
    async def increment_attempts(self, email: str) -> int:
        """Increment failed attempts counter and return current attempts"""
        pass

    @abstractmethod
    async def delete_otp(self, email: str) -> bool:
        """Delete / invalidate OTP record after success or expiration"""
        pass

    @abstractmethod
    async def get_user(self, email: str) -> Optional[UserRecord]:
        """Fetch registered user by email"""
        pass

    @abstractmethod
    async def save_user(self, user: UserRecord) -> None:
        """Create or update registered user profile"""
        pass

    @abstractmethod
    async def get_name(self) -> str:
        """Return human-readable storage engine name (e.g. 'Redis' or 'SQLite')"""
        pass

