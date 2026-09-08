import asyncio
import os
import sys
import time
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.storage.sqlite_store import SqliteOtpStore
from app.services.otp_service import OtpService
from app.config import settings

async def run_tests():
    print("=== Testing OTP Verification Engine ===")
    test_db = Path(__file__).resolve().parent / "test_otp.db"
    if test_db.exists():
        test_db.unlink()
        
    store = SqliteOtpStore(test_db)
    await store.initialize()
    service = OtpService(store)
    
    test_email = "test.user@example.com"
    
    # Test 1: Generate & Store OTP
    print("\n[Test 1] Generating and storing OTP...")
    raw_otp, expires_in = await service.create_and_store_otp(test_email)
    print(f"Generated OTP: {raw_otp}, Expires in: {expires_in}s")
    assert len(raw_otp) == settings.OTP_LENGTH, f"Expected length {settings.OTP_LENGTH}, got {len(raw_otp)}"
    
    # Check that plain OTP is NOT stored in the database
    record = await store.get_otp(test_email)
    assert record is not None, "Record was not saved in database!"
    assert record.hashed_otp != raw_otp, "CRITICAL SECURITY FLAW: OTP was stored in plain text!"
    print(f"Database Record Verified: Hashed OTP = {record.hashed_otp[:16]}... (Salt: {record.salt[:8]}...)")
    
    # Test 2: Incorrect OTP Verification Attempt
    print("\n[Test 2] Testing incorrect OTP entry...")
    wrong_otp = "000000" if raw_otp != "000000" else "111111"
    is_valid, msg = await service.verify_and_invalidate_otp(test_email, wrong_otp)
    print(f"Wrong OTP result: valid={is_valid}, msg='{msg}'")
    assert not is_valid, "Expected wrong OTP to fail!"
    assert "remaining" in msg.lower(), f"Expected attempts remaining in msg: {msg}"
    
    # Test 3: Correct OTP Verification & Instant Invalidation
    print("\n[Test 3] Testing correct OTP verification...")
    is_valid, msg = await service.verify_and_invalidate_otp(test_email, raw_otp)
    print(f"Correct OTP result: valid={is_valid}, msg='{msg}'")
    assert is_valid, f"Expected correct OTP to succeed! Msg: {msg}"
    
    # Test 4: Replay Attack Prevention (Must be deleted/invalidated)
    print("\n[Test 4] Testing replay attack prevention (re-using verified OTP)...")
    is_valid_second, msg_second = await service.verify_and_invalidate_otp(test_email, raw_otp)
    print(f"Replay result: valid={is_valid_second}, msg='{msg_second}'")
    assert not is_valid_second, "Replay attack succeeded! OTP was not deleted after first use."
    print("Replay blocked successfully (OTP was invalidated).")
    
    # Test 5: Brute-Force Lockout
    print("\n[Test 5] Testing brute-force attempt lockout...")
    raw_otp_2, _ = await service.create_and_store_otp("lockout@example.com")
    for attempt in range(settings.MAX_OTP_ATTEMPTS):
        is_valid, msg = await service.verify_and_invalidate_otp("lockout@example.com", "999999")
        print(f"Brute-force attempt {attempt + 1}: {msg}")
    
    # Now even if the attacker enters the right code, it should be locked and deleted
    is_valid_after_lockout, msg_after = await service.verify_and_invalidate_otp("lockout@example.com", raw_otp_2)
    print(f"Attempt with correct OTP after lockout: valid={is_valid_after_lockout}, msg='{msg_after}'")
    assert not is_valid_after_lockout, "Expected lockout to invalidate OTP even with right code!"
    
    # Clean up test db
    await store.close()
    if test_db.exists():
        test_db.unlink()
    # Also clean test db wal/shm if present
    for p in test_db.parent.glob("test_otp.db*"):
        try:
            p.unlink()
        except Exception:
            pass

    print("\nAll 5 core security and business logic tests passed successfully!")

if __name__ == "__main__":
    asyncio.run(run_tests())
