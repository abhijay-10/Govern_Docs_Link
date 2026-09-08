import logging
from ..config import settings
from .base import BaseOtpStore
from .sqlite_store import SqliteOtpStore
from .redis_store import RedisOtpStore

logger = logging.getLogger("otp_backend")

async def get_otp_store() -> BaseOtpStore:
    """
    Factory function to select the best storage backend:
    - Attempts Redis if REDIS_URL is provided
    - Seamlessly falls back to embedded SQLite store with zero external setup
    """
    if settings.REDIS_URL:
        try:
            logger.info(f"Attempting to connect to Redis at {settings.REDIS_URL}...")
            store = RedisOtpStore(settings.REDIS_URL)
            await store.initialize()
            logger.info("Successfully connected to Redis OTP store.")
            return store
        except Exception as e:
            logger.warning(
                f"Could not connect to Redis ({e}). Falling back to SQLite embedded store."
            )
    
    # Default to SQLite
    sqlite_store = SqliteOtpStore(settings.SQLITE_PATH)
    await sqlite_store.initialize()
    logger.info(f"Initialized SQLite OTP store at {settings.SQLITE_PATH}")
    return sqlite_store
