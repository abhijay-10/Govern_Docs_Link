import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .storage.factory import get_otp_store
from .services.otp_service import OtpService
from .api.routes.auth import router as auth_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("otp_backend")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize database/cache engine
    logger.info("Starting OTP verification backend...")
    otp_store = await get_otp_store()
    app.state.otp_store = otp_store
    app.state.otp_service = OtpService(otp_store)
    store_name = await otp_store.get_name()
    logger.info(f"OTP Backend active using storage: {store_name}")
    
    yield
    
    # Shutdown: clean up connections
    logger.info("Shutting down OTP backend...")
    if hasattr(app.state, "otp_store") and app.state.otp_store:
        await app.state.otp_store.close()

app = FastAPI(
    title="OneID - OTP Verification API",
    description="FastAPI service for generating, hashing, storing, and validating One-Time Passwords (OTPs) with brute-force protection.",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.DEBUG else settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Auth Router
app.include_router(auth_router)

@app.get("/")
async def root():
    return {
        "service": "OneID OTP Authentication Engine",
        "docs_url": "/docs",
        "endpoints": {
            "send_otp": "POST /api/auth/send-otp",
            "verify_otp": "POST /api/auth/verify-otp",
            "health": "GET /api/auth/health"
        }
    }
