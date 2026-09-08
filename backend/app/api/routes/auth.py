import secrets
import time
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Request, status
from ...schemas.auth import (
    SendOtpRequest,
    SendOtpResponse,
    VerifyOtpRequest,
    AuthTokenResponse,
    UserProfileResponse
)
from ...services.otp_service import OtpService
from ...services.email_service import EmailService
from ...storage.base import UserRecord

router = APIRouter(prefix="/api/auth", tags=["Authentication & OTP"])

def get_otp_service(request: Request) -> OtpService:
    return request.app.state.otp_service

@router.post("/send-otp", response_model=SendOtpResponse)
async def send_otp(
    payload: SendOtpRequest,
    background_tasks: BackgroundTasks,
    request: Request,
    otp_service: OtpService = Depends(get_otp_service)
):
    email = payload.email.lower().strip()
    store = request.app.state.otp_store
    
    # 1. Check if user is already registered in OneID database
    existing_user = await store.get_user(email)
    
    if payload.mode == "login":
        if not existing_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No OneID profile found with this email. Please sign up to create your identity profile."
            )
    elif payload.mode == "signup":
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This email is already associated with an existing OneID profile. Please sign in."
            )

    # 2. Generate OTP & Salt, Hash OTP, and Store Hash Temporarily with TTL
    raw_otp, expires_in = await otp_service.create_and_store_otp(email)
    
    # 3. Dispatch actual OTP to user's email asynchronously in background
    background_tasks.add_task(
        EmailService.send_otp_email,
        to_email=email,
        otp_code=raw_otp,
        expire_seconds=expires_in
    )
    
    return SendOtpResponse(
        success=True,
        message=f"Verification code sent to {email}",
        email=email,
        expires_in_seconds=expires_in,
        registered=bool(existing_user),
        user_name=existing_user.name if existing_user else None,
        user_id=existing_user.id if existing_user else None
    )

@router.post("/verify-otp", response_model=AuthTokenResponse)
async def verify_otp(
    payload: VerifyOtpRequest,
    request: Request,
    otp_service: OtpService = Depends(get_otp_service)
):
    email = payload.email.lower().strip()
    entered_otp = payload.otp.strip()
    store = request.app.state.otp_store

    # 1. Hash entered OTP and compare with stored hash in constant time
    # 2. Invalidate / delete OTP immediately on match to prevent replay
    is_valid, message = await otp_service.verify_and_invalidate_otp(email, entered_otp)
    
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=message
        )

    # 3. Match verified! Fetch or create the user profile
    existing_user = await store.get_user(email)
    
    if not existing_user:
        # User completed signup verification - persist in database
        display_name = payload.name.strip() if payload.name and payload.name.strip() else email.split("@")[0].replace(".", " ").title()
        user_id = f"usr_oneid_{secrets.token_hex(4)}"
        new_user = UserRecord(
            id=user_id,
            name=display_name,
            email=email,
            mobile=payload.mobile or "+91 ••••• •••••",
            created_at=time.time(),
            is_verified=True
        )
        await store.save_user(new_user)
        existing_user = new_user

    # 4. Generate secure session token and return user profile
    session_token = secrets.token_urlsafe(32)

    user = UserProfileResponse(
        id=existing_user.id,
        name=existing_user.name,
        email=existing_user.email,
        mobile=existing_user.mobile or "+91 ••••• •••••",
        role="citizen"
    )

    return AuthTokenResponse(
        success=True,
        message="OTP verified successfully. Login successful.",
        access_token=session_token,
        token_type="bearer",
        user=user
    )

@router.get("/health")
async def health_check(request: Request):
    store = request.app.state.otp_store
    store_name = await store.get_name()
    return {
        "status": "healthy",
        "service": "OneID OTP Authentication Engine",
        "storage_engine": store_name
    }
