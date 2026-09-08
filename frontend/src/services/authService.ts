import { UserProfile } from '../types';
import { initialUserProfile } from '../data/mockData';

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api/auth';

export interface SendOtpResult {
  success: boolean;
  message: string;
  email: string;
  expires_in_seconds: number;
  registered?: boolean;
  user_name?: string;
  user_id?: string;
}

export interface VerifyOtpResult {
  success: boolean;
  message: string;
  access_token: string;
  token_type: string;
  user: UserProfile;
}

export const authService = {
  /**
   * Request real-time OTP code generation from FastAPI backend
   */
  async sendOtp(email: string, mode: 'login' | 'signup' = 'login'): Promise<SendOtpResult> {
    try {
      const response = await fetch(`${API_BASE}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mode }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: 'Failed to send OTP' }));
        const error = new Error(errData.detail || 'Failed to dispatch verification code');
        (error as any).status = response.status;
        (error as any).registered = response.status === 409;
        (error as any).notFound = response.status === 404;
        throw error;
      }

      return await response.json();
    } catch (err: any) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error(
          'Backend connection unavailable. Please start the FastAPI backend server with: python backend/run.py'
        );
      }
      throw err;
    }
  },

  /**
   * Verify entered OTP against stored hash in FastAPI backend
   */
  async verifyOtp(
    email: string, 
    otp: string, 
    signupData?: { name?: string; mobile?: string; mode?: 'login' | 'signup' }
  ): Promise<VerifyOtpResult> {
    try {
      const response = await fetch(`${API_BASE}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          mode: signupData?.mode || 'login',
          name: signupData?.name,
          mobile: signupData?.mobile,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: 'Verification failed' }));
        throw new Error(errData.detail || 'Incorrect verification code');
      }

      const data = await response.json();
      
      const profile: UserProfile = {
        ...initialUserProfile,
        id: data.user?.id || initialUserProfile.id,
        name: data.user?.name || initialUserProfile.name,
        email: data.user?.email || email,
        mobile: data.user?.mobile || initialUserProfile.mobile,
      };

      return {
        success: true,
        message: data.message,
        access_token: data.access_token,
        token_type: data.token_type,
        user: profile,
      };
    } catch (err: any) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error(
          'Backend connection unavailable. Please start the FastAPI backend server with: python backend/run.py'
        );
      }
      throw err;
    }
  },

  async login(identifier: string, _password: string): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const profile = { ...initialUserProfile };
    if (identifier && identifier.includes('@')) {
      profile.email = identifier;
    }
    return profile;
  },

  async loginDemo(): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return initialUserProfile;
  },

  async signup(fullName: string, email: string, mobile: string): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      ...initialUserProfile,
      name: fullName || 'New User',
      email: email || 'user@example.com',
      mobile: mobile || '+91 ••••• •••••',
    };
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    return initialUserProfile;
  },
};
