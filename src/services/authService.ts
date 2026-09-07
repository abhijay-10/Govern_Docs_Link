import { UserProfile } from '../types';
import { initialUserProfile } from '../data/mockData';

// Simulates future FastAPI POST /auth/login and POST /auth/signup
export const authService = {
  async login(identifier: string, _password: string): Promise<UserProfile> {
    // Simulated network latency
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // In mock mode, preserve or personalize user profile
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
    await new Promise((resolve) => setTimeout(resolve, 700));
    return {
      ...initialUserProfile,
      name: fullName || 'New User',
      email: email || 'user@example.com',
      mobile: mobile || '+91 ••••• •••••',
      overallConfidence: 85.0,
      consistencyBreakdown: {
        name: 90,
        dob: 95,
        address: 80,
        document: 85,
      },
    };
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    return initialUserProfile;
  },
};
