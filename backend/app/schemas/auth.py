from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal
import re

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

class SendOtpRequest(BaseModel):
    email: str = Field(..., description="Target email to receive OTP")
    mode: Literal["login", "signup"] = Field("login", description="Flow mode: 'login' requires existing account, 'signup' creates new account")

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not EMAIL_REGEX.match(v):
            raise ValueError("Invalid email format")
        return v

class SendOtpResponse(BaseModel):
    success: bool = True
    message: str
    email: str
    expires_in_seconds: int
    registered: bool = False
    user_name: Optional[str] = None
    user_id: Optional[str] = None

class VerifyOtpRequest(BaseModel):
    email: str = Field(..., description="Email associated with the OTP")
    otp: str = Field(..., min_length=4, max_length=8, description="The OTP entered by user")
    mode: Optional[Literal["login", "signup"]] = "login"
    name: Optional[str] = None
    mobile: Optional[str] = None

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not EMAIL_REGEX.match(v):
            raise ValueError("Invalid email format")
        return v

class UserProfileResponse(BaseModel):
    id: str
    name: str
    email: str
    mobile: Optional[str] = None
    role: str = "citizen"

class AuthTokenResponse(BaseModel):
    success: bool = True
    message: str
    access_token: str
    token_type: str = "bearer"
    user: UserProfileResponse
