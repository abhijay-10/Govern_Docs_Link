import hmac
import hashlib
import secrets
import time
from typing import Tuple
from ..config import settings
from ..storage.base import BaseOtpStore, OtpRecord

class OtpService:
    def __init__(self, store: BaseOtpStore):
        self.store = store

    def generate_otp_code(self, length: int = 6) -> str:
        """
        Generate a cryptographically secure numeric OTP of given length.
        Uses secrets.SystemRandom() so it cannot be predicted.
        """
        rng = secrets.SystemRandom()
        min_val = 10 ** (length - 1)
        max_val = (10 ** length) - 1
        return str(rng.randint(min_val, max_val))

    def hash_otp(self, otp: str, salt: str) -> str:
        """
        Hash OTP using HMAC-SHA256 with a unique salt per OTP + global SECRET_KEY.
        Even if the database is leaked, rainbow tables and precomputed tables fail.
        """
        key = (settings.SECRET_KEY + ":" + salt).encode("utf-8")
        return hmac.new(key, otp.strip().encode("utf-8"), hashlib.sha256).hexdigest()

    async def create_and_store_otp(self, email: str) -> Tuple[str, int]:
        """
        Generate raw OTP, salt, hash it, store hash in the storage engine,
        and return (raw_otp, expires_in_seconds).
        """
        raw_otp = self.generate_otp_code(length=settings.OTP_LENGTH)
        salt = secrets.token_hex(16)
        hashed_otp = self.hash_otp(raw_otp, salt)
        now = time.time()
        expires_at = now + settings.OTP_EXPIRE_SECONDS

        record = OtpRecord(
            email=email.lower().strip(),
            hashed_otp=hashed_otp,
            salt=salt,
            created_at=now,
            expires_at=expires_at,
            attempts=0,
            max_attempts=settings.MAX_OTP_ATTEMPTS
        )

        await self.store.save_otp(record, ttl_seconds=settings.OTP_EXPIRE_SECONDS)
        return raw_otp, settings.OTP_EXPIRE_SECONDS

    async def verify_and_invalidate_otp(self, email: str, entered_otp: str) -> Tuple[bool, str]:
        """
        Verify the entered OTP against stored hash:
        1. Check if record exists
        2. Check if expired
        3. Check brute-force attempt limits
        4. Hash entered OTP with stored salt
        5. Constant-time digest comparison
        6. If MATCH -> delete/invalidate OTP immediately, return (True, "Success")
        7. If MISMATCH -> increment attempt counter, return (False, "Remaining attempts: N")
        """
        record = await self.store.get_otp(email.lower().strip())
        if not record:
            return False, "OTP not found or has expired. Please request a new code."

        if record.is_expired:
            await self.store.delete_otp(email)
            return False, "OTP has expired. Please request a new code."

        if record.is_locked:
            await self.store.delete_otp(email)
            return False, "Too many incorrect attempts. This OTP has been invalidated for security. Please request a new one."

        # Compute hash of entered OTP with the stored salt
        calculated_hash = self.hash_otp(entered_otp.strip(), record.salt)

        # Constant-time comparison to prevent timing attacks
        matches = hmac.compare_digest(calculated_hash, record.hashed_otp)

        if matches:
            # Crucial step: Delete / invalidate OTP so it cannot be used again
            await self.store.delete_otp(email)
            return True, "OTP verified successfully."
        else:
            # Increment failed attempts
            current_attempts = await self.store.increment_attempts(email)
            remaining = record.max_attempts - current_attempts
            if remaining <= 0:
                await self.store.delete_otp(email)
                return False, "Incorrect OTP. Maximum attempts reached. Code has been invalidated."
            return False, f"Incorrect OTP. You have {remaining} attempt{'s' if remaining > 1 else ''} remaining."
