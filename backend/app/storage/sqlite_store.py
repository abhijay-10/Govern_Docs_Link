import sqlite3
import asyncio
import time
from pathlib import Path
from typing import Optional
from .base import BaseOtpStore, OtpRecord, UserRecord

class SqliteOtpStore(BaseOtpStore):
    def __init__(self, db_path: Path):
        self.db_path = db_path

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(str(self.db_path), check_same_thread=False)
        conn.row_factory = sqlite3.Row
        # WAL mode for fast concurrent access
        conn.execute("PRAGMA journal_mode = WAL;")
        conn.execute("PRAGMA synchronous = NORMAL;")
        return conn

    def _init_db_sync(self):
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        conn = self._get_connection()
        try:
            with conn:
                # 1. OTP temporary records table
                conn.execute("""
                    CREATE TABLE IF NOT EXISTS otp_records (
                        email TEXT PRIMARY KEY,
                        hashed_otp TEXT NOT NULL,
                        salt TEXT NOT NULL,
                        created_at REAL NOT NULL,
                        expires_at REAL NOT NULL,
                        attempts INTEGER NOT NULL DEFAULT 0,
                        max_attempts INTEGER NOT NULL DEFAULT 5
                    );
                """)
                conn.execute("CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_records(expires_at);")

                # 2. Registered Users table
                conn.execute("""
                    CREATE TABLE IF NOT EXISTS users (
                        id TEXT PRIMARY KEY,
                        name TEXT NOT NULL,
                        email TEXT UNIQUE NOT NULL,
                        mobile TEXT,
                        created_at REAL NOT NULL,
                        is_verified INTEGER NOT NULL DEFAULT 1
                    );
                """)
                conn.execute("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);")

                # 3. Seed default verified identity profile for Abhijay Parashar
                now = time.time()
                conn.execute("""
                    INSERT OR IGNORE INTO users (id, name, email, mobile, created_at, is_verified)
                    VALUES ('usr_oneid_8921', 'Abhijay Parashar', 'parasharabhijay@gmail.com', '+91 98765 43210', ?, 1);
                """, (now,))
                conn.execute("""
                    INSERT OR IGNORE INTO users (id, name, email, mobile, created_at, is_verified)
                    VALUES ('usr_oneid_8921', 'Abhijay Parashar', 'abhijay.parashar@example.com', '+91 98765 43210', ?, 1);
                """, (now,))
        finally:
            conn.close()

    async def initialize(self) -> None:
        await asyncio.to_thread(self._init_db_sync)

    async def close(self) -> None:
        # SQLite file connections are transient per call or closed automatically
        pass

    def _cleanup_expired_sync(self, conn: sqlite3.Connection):
        now = time.time()
        conn.execute("DELETE FROM otp_records WHERE expires_at < ?", (now,))
        conn.commit()

    def _save_otp_sync(self, record: OtpRecord):
        conn = self._get_connection()
        try:
            with conn:
                self._cleanup_expired_sync(conn)
                conn.execute("""
                    INSERT INTO otp_records (email, hashed_otp, salt, created_at, expires_at, attempts, max_attempts)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(email) DO UPDATE SET
                        hashed_otp = excluded.hashed_otp,
                        salt = excluded.salt,
                        created_at = excluded.created_at,
                        expires_at = excluded.expires_at,
                        attempts = 0,
                        max_attempts = excluded.max_attempts;
                """, (
                    record.email.lower(),
                    record.hashed_otp,
                    record.salt,
                    record.created_at,
                    record.expires_at,
                    record.attempts,
                    record.max_attempts
                ))
        finally:
            conn.close()

    async def save_otp(self, record: OtpRecord, ttl_seconds: int) -> None:
        await asyncio.to_thread(self._save_otp_sync, record)

    def _get_otp_sync(self, email: str) -> Optional[OtpRecord]:
        conn = self._get_connection()
        try:
            with conn:
                self._cleanup_expired_sync(conn)
                cur = conn.execute(
                    "SELECT email, hashed_otp, salt, created_at, expires_at, attempts, max_attempts FROM otp_records WHERE email = ?",
                    (email.lower(),)
                )
                row = cur.fetchone()
                if not row:
                    return None
                return OtpRecord(
                    email=row["email"],
                    hashed_otp=row["hashed_otp"],
                    salt=row["salt"],
                    created_at=row["created_at"],
                    expires_at=row["expires_at"],
                    attempts=row["attempts"],
                    max_attempts=row["max_attempts"]
                )
        finally:
            conn.close()

    async def get_otp(self, email: str) -> Optional[OtpRecord]:
        return await asyncio.to_thread(self._get_otp_sync, email)

    def _increment_attempts_sync(self, email: str) -> int:
        conn = self._get_connection()
        try:
            with conn:
                conn.execute(
                    "UPDATE otp_records SET attempts = attempts + 1 WHERE email = ?",
                    (email.lower(),)
                )
                cur = conn.execute("SELECT attempts FROM otp_records WHERE email = ?", (email.lower(),))
                row = cur.fetchone()
                return row["attempts"] if row else 0
        finally:
            conn.close()

    async def increment_attempts(self, email: str) -> int:
        return await asyncio.to_thread(self._increment_attempts_sync, email)

    def _delete_otp_sync(self, email: str) -> bool:
        conn = self._get_connection()
        try:
            with conn:
                cur = conn.execute("DELETE FROM otp_records WHERE email = ?", (email.lower(),))
                return cur.rowcount > 0
        finally:
            conn.close()

    async def delete_otp(self, email: str) -> bool:
        return await asyncio.to_thread(self._delete_otp_sync, email)

    def _get_user_sync(self, email: str) -> Optional[UserRecord]:
        conn = self._get_connection()
        try:
            cur = conn.execute("SELECT id, name, email, mobile, created_at, is_verified FROM users WHERE email = ?", (email.lower().strip(),))
            row = cur.fetchone()
            if not row:
                return None
            return UserRecord(
                id=row["id"],
                name=row["name"],
                email=row["email"],
                mobile=row["mobile"],
                created_at=row["created_at"],
                is_verified=bool(row["is_verified"])
            )
        finally:
            conn.close()

    async def get_user(self, email: str) -> Optional[UserRecord]:
        return await asyncio.to_thread(self._get_user_sync, email)

    def _save_user_sync(self, user: UserRecord):
        conn = self._get_connection()
        try:
            with conn:
                conn.execute("""
                    INSERT INTO users (id, name, email, mobile, created_at, is_verified)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON CONFLICT(email) DO UPDATE SET
                        name = excluded.name,
                        mobile = excluded.mobile,
                        is_verified = excluded.is_verified;
                """, (
                    user.id,
                    user.name,
                    user.email.lower().strip(),
                    user.mobile,
                    user.created_at or time.time(),
                    1 if user.is_verified else 0
                ))
        finally:
            conn.close()

    async def save_user(self, user: UserRecord) -> None:
        await asyncio.to_thread(self._save_user_sync, user)

    async def get_name(self) -> str:
        return "SQLite (Zero-Dependency Embedded Storage with TTL Index)"

