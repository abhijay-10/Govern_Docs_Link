import asyncio
import sys
from pathlib import Path
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.main import app

def test_api():
    print("=== Testing FastAPI Auth API Endpoints ===")
    
    with TestClient(app) as client:
        # 1. Health check
        res = client.get("/api/auth/health")
        print("Health status:", res.status_code, res.json())
        assert res.status_code == 200
        assert res.json()["status"] == "healthy"
        
        # 2. Unregistered user tries to sign in -> Must return 404
        unreg_email = "nonexistent.user.9812@example.com"
        res_unreg = client.post("/api/auth/send-otp", json={"email": unreg_email, "mode": "login"})
        print("Unregistered user login attempt status:", res_unreg.status_code, res_unreg.json())
        assert res_unreg.status_code == 404
        assert "sign up" in res_unreg.json()["detail"].lower()
        print("Blocked unregistered user from login successfully.")
        
        # 3. Registered user (Abhijay Parashar) signs in -> Must succeed & identify profile
        reg_email = "parasharabhijay@gmail.com"
        res_reg = client.post("/api/auth/send-otp", json={"email": reg_email, "mode": "login"})
        print("Registered user send-otp status:", res_reg.status_code, res_reg.json())
        assert res_reg.status_code == 200
        data_reg = res_reg.json()
        assert data_reg["success"] is True
        assert data_reg["registered"] is True
        assert data_reg["user_name"] == "Abhijay Parashar"
        assert data_reg["user_id"] == "usr_oneid_8921"
        print("Auto-identified registered profile:", data_reg["user_name"], f"({data_reg['user_id']})")
        
        # 4. Wrong OTP for registered user
        res_wrong = client.post("/api/auth/verify-otp", json={"email": reg_email, "otp": "000000"})
        print("Verify Wrong OTP status:", res_wrong.status_code, res_wrong.json())
        assert res_wrong.status_code == 400
        assert "Incorrect OTP" in res_wrong.json()["detail"]
        
        # 5. New user Sign Up flow
        import time as _time
        new_email = f"priya.sharma.{int(_time.time())}@example.com"
        res_signup_otp = client.post("/api/auth/send-otp", json={"email": new_email, "mode": "signup"})
        print("New user signup send-otp status:", res_signup_otp.status_code, res_signup_otp.json())
        assert res_signup_otp.status_code == 200
        assert res_signup_otp.json()["registered"] is False
        
        # Fetch generated OTP from service to simulate entering real OTP
        otp_service = app.state.otp_service
        raw_otp, _ = asyncio.run(otp_service.create_and_store_otp(new_email))
        
        # Verify signup OTP and create user
        res_verify_signup = client.post("/api/auth/verify-otp", json={
            "email": new_email,
            "otp": raw_otp,
            "mode": "signup",
            "name": "Priya Sharma",
            "mobile": "+91 98111 22233"
        })
        print("Verify signup status:", res_verify_signup.status_code, res_verify_signup.json())
        assert res_verify_signup.status_code == 200
        signup_data = res_verify_signup.json()
        assert signup_data["success"] is True
        assert signup_data["user"]["name"] == "Priya Sharma"
        assert signup_data["user"]["email"] == new_email
        
        # Now Priya Sharma is registered! If she tries to sign up again, it should return 409
        res_signup_dup = client.post("/api/auth/send-otp", json={"email": new_email, "mode": "signup"})
        assert res_signup_dup.status_code == 409
        print("Duplicate signup prevented successfully.")
        
        # And if Priya Sharma logs in, it auto-recognizes her!
        res_priya_login = client.post("/api/auth/send-otp", json={"email": new_email, "mode": "login"})
        assert res_priya_login.status_code == 200
        assert res_priya_login.json()["registered"] is True
        assert res_priya_login.json()["user_name"] == "Priya Sharma"
        print("Auto-identified newly registered profile on subsequent login.")

    print("\nAll Registration and Identity Verification API Tests Passed Successfully!")

if __name__ == "__main__":
    test_api()
