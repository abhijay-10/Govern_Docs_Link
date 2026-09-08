import os
from pathlib import Path
from typing import List

BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env manually if exists without requiring external dependencies
env_path = BASE_DIR / ".env"
if env_path.exists():
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ[key.strip()] = val.strip()

class Settings:
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes")
    
    ALLOWED_ORIGINS: List[str] = [
        origin.strip() 
        for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173").split(",")
        if origin.strip()
    ]
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "govern-docs-link-super-secret-key-salt-98213")
    OTP_EXPIRE_SECONDS: int = int(os.getenv("OTP_EXPIRE_SECONDS", "300")) # 5 minutes default
    OTP_LENGTH: int = int(os.getenv("OTP_LENGTH", "6"))
    MAX_OTP_ATTEMPTS: int = int(os.getenv("MAX_OTP_ATTEMPTS", "5"))
    
    # Redis configuration
    REDIS_URL: str = os.getenv("REDIS_URL", "").strip()
    
    # SQLite file path
    SQLITE_PATH: Path = BASE_DIR / "data" / "otp_storage.db"
    
    # Email SMTP settings
    SMTP_HOST: str = os.getenv("SMTP_HOST", "").strip()
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "").strip()
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "").strip()
    SMTP_FROM: str = os.getenv("SMTP_FROM", "noreply@oneid.local").strip()

settings = Settings()
