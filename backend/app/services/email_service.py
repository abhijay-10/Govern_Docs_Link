import smtplib
import asyncio
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from ..config import settings

logger = logging.getLogger("otp_backend")

class EmailService:
    @staticmethod
    def _send_smtp_sync(to_email: str, subject: str, body_text: str, body_html: str):
        sender = settings.SMTP_USER if (settings.SMTP_USER and ("gmail" in settings.SMTP_HOST.lower() or "local" in settings.SMTP_FROM)) else settings.SMTP_FROM
        smtp_password = settings.SMTP_PASSWORD.replace(" ", "").strip()
        
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = sender
        msg["To"] = to_email

        msg.attach(MIMEText(body_text, "plain"))
        msg.attach(MIMEText(body_html, "html"))

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
            server.starttls()
            if settings.SMTP_USER and smtp_password:
                server.login(settings.SMTP_USER, smtp_password)
            server.sendmail(sender, [to_email], msg.as_string())

    @classmethod
    async def send_otp_email(cls, to_email: str, otp_code: str, expire_seconds: int):
        minutes = expire_seconds // 60
        subject = f"Your OneID Verification Code: {otp_code}"
        
        body_text = f"""
Hello,

Your One-Time Password (OTP) for OneID Identity Verification is:

    {otp_code}

This code will expire in {minutes} minutes.
Do NOT share this code with anyone.

If you did not request this, please ignore this email.
"""

        body_html = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; }}
    .card {{ max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px; text-align: center; }}
    .logo {{ font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 24px; }}
    .logo span {{ color: #2563eb; }}
    .title {{ font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 8px; }}
    .subtitle {{ font-size: 14px; color: #64748b; margin-bottom: 24px; }}
    .otp-box {{ background: #eff6ff; border: 2px dashed #93c5fd; border-radius: 12px; padding: 18px; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #1d4ed8; margin-bottom: 24px; }}
    .footer {{ font-size: 12px; color: #94a3b8; line-height: 1.5; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">ONE<span>ID</span></div>
    <div class="title">Verify Your Identity</div>
    <div class="subtitle">Use the verification code below to complete your sign-in:</div>
    <div class="otp-box">{otp_code}</div>
    <div class="footer">
      Valid for <strong>{minutes} minutes</strong>.<br/>
      Never share this code with anyone. If you didn't request this, you can safely ignore this email.
    </div>
  </div>
</body>
</html>
"""

        # Log visually in terminal for dev/demo mode (ASCII safe for all OS consoles)
        banner = (
            f"\n"
            f"+----------------------------------------------------------------------+\n"
            f"|                      ONEID OTP DISPATCH                              |\n"
            f"+----------------------------------------------------------------------+\n"
            f"|  Recipient : {to_email.ljust(54)}|\n"
            f"|  OTP Code  : {otp_code.ljust(54)}|\n"
            f"|  Expires In: {f'{minutes} minutes ({expire_seconds}s)'.ljust(54)}|\n"
            f"+----------------------------------------------------------------------+\n"
        )
        print(banner, flush=True)

        if settings.SMTP_HOST and settings.SMTP_USER and settings.SMTP_PASSWORD:
            try:
                await asyncio.to_thread(cls._send_smtp_sync, to_email, subject, body_text, body_html)
                logger.info(f"Successfully delivered real-time OTP email to {to_email} via SMTP.")
            except Exception as e:
                logger.error(f"Failed to deliver email via SMTP ({e}). Code printed to console above.")
        else:
            logger.info(
                f"SMTP credentials not fully configured in backend/.env. "
                f"To send real emails to your inbox, set SMTP_USER and SMTP_PASSWORD in backend/.env. "
                f"For now, OTP code is safely printed above."
            )
