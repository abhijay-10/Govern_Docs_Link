import urllib.request
import urllib.error
import json
import sqlite3
from pathlib import Path

BASE_URL = "http://127.0.0.1:8000"
DB_PATH = Path(__file__).resolve().parent.parent / "data" / "otp_storage.db"

def post_json(endpoint: str, data: dict):
    url = f"{BASE_URL}{endpoint}"
    payload = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode("utf-8"))

def get_json(endpoint: str):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        return resp.status, json.loads(resp.read().decode("utf-8"))

def main():
    print("=== LIVE API VERIFICATION TEST ===")
    
    # 1. Health check
    status, body = get_json("/api/auth/health")
    print(f"1. Health Check: status={status}, body={body}")
    assert status == 200
    assert body["status"] == "healthy"
    
    # 2. Send OTP
    email = "live.tester@oneid.gov"
    status, body = post_json("/api/auth/send-otp", {"email": email})
    print(f"2. Send OTP: status={status}, body={body}")
    assert status == 200
    assert body["success"] is True
    
    # 3. Test wrong OTP
    status, body = post_json("/api/auth/verify-otp", {"email": email, "otp": "000000"})
    print(f"3. Wrong OTP Attempt: status={status}, body={body}")
    assert status == 400
    assert "Incorrect OTP" in body["detail"]
    
    print("\nLive API Endpoints verified successfully over HTTP!")

if __name__ == "__main__":
    main()
