import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  IdentityDocument,
  VerificationPair,
  ShareLink,
  ActivityEvent,
  UserPreferences,
  DocumentType,
} from '../types';
import {
  initialUserProfile,
  initialDocuments,
  initialVerificationPairs,
  initialShareLinks,
  initialActivityEvents,
  defaultPreferences,
} from '../data/mockData';
import { authService } from '../services/authService';
import { documentService } from '../services/documentService';
import { sharingService } from '../services/sharingService';
import { activityService } from '../services/activityService';

export interface ToastItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface IdentityContextType {
  user: UserProfile;
  documents: IdentityDocument[];
  verificationPairs: VerificationPair[];
  shareLinks: ShareLink[];
  activityEvents: ActivityEvent[];
  preferences: UserPreferences;
  isAuthenticated: boolean;
  isOnboardingOpen: boolean;
  toasts: ToastItem[];
  // Actions
  login: (identifier: string, pass: string) => Promise<void>;
  loginDemo: () => Promise<void>;
  sendOtp: (email: string, mode?: 'login' | 'signup') => Promise<any>;
  verifyOtp: (
    email: string, 
    otp: string, 
    signupData?: { name?: string; mobile?: string; mode?: 'login' | 'signup' }
  ) => Promise<void>;
  signup: (name: string, email: string, mobile: string) => Promise<void>;
  logout: () => void;
  addDocument: (type: DocumentType, customTitle?: string) => Promise<void>;
  removeDocument: (id: string) => Promise<void>;
  generateShareLink: (
    selectedDocs: DocumentType[],
    duration: string,
    purpose: string,
    org?: string
  ) => Promise<ShareLink>;
  revokeShareLink: (id: string) => Promise<void>;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  addToast: (title: string, message?: string, type?: ToastItem['type']) => void;
  removeToast: (id: string) => void;
}

const IdentityContext = createContext<IdentityContextType | undefined>(undefined);

export const IdentityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [documents, setDocuments] = useState<IdentityDocument[]>(initialDocuments);
  const [verificationPairs, setVerificationPairs] = useState<VerificationPair[]>(initialVerificationPairs);
  const [shareLinks, setShareLinks] = useState<ShareLink[]>(initialShareLinks);
  const [activityEvents, setActivityEvents] = useState<ActivityEvent[]>(initialActivityEvents);
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default true for instant exploration, supports logout
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (title: string, message?: string, type: ToastItem['type'] = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = async (identifier: string, pass: string) => {
    const profile = await authService.login(identifier, pass);
    setUser(profile);
    setIsAuthenticated(true);
    addToast('Signed In', `Welcome back, ${profile.name}`, 'success');
  };

  const loginDemo = async () => {
    const profile = await authService.loginDemo();
    setUser(profile);
    setIsAuthenticated(true);
    addToast('Demo Mode Active', 'Loaded sample verified identity profile', 'info');
  };

  const sendOtp = async (email: string, mode: 'login' | 'signup' = 'login') => {
    const res = await authService.sendOtp(email, mode);
    addToast('OTP Dispatched', `Verification code sent to ${email}`, 'info');
    return res;
  };

  const verifyOtp = async (
    email: string, 
    otp: string, 
    signupData?: { name?: string; mobile?: string; mode?: 'login' | 'signup' }
  ) => {
    const res = await authService.verifyOtp(email, otp, signupData);
    if (res.access_token) {
      localStorage.setItem('oneid_access_token', res.access_token);
    }
    setUser(res.user);
    setIsAuthenticated(true);
    addToast(signupData?.mode === 'signup' ? 'Profile Created' : 'Login Successful', `Welcome, ${res.user.name}!`, 'success');
  };

  const signup = async (name: string, email: string, mobile: string) => {
    const profile = await authService.signup(name, email, mobile);
    setUser(profile);
    setIsAuthenticated(true);
    setIsOnboardingOpen(true);
    addToast('Account Created', 'Welcome to OneID! Please review your onboarding checklist.', 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    addToast('Signed Out', 'You have been safely signed out.', 'info');
  };

  const addDocument = async (type: DocumentType, customTitle?: string) => {
    const newDoc = await documentService.addDocument(type, customTitle);
    
    // Check if doc already in list with status 'not_added'
    const existingIndex = documents.findIndex((d) => d.type === type);
    if (existingIndex !== -1) {
      const updated = [...documents];
      updated[existingIndex] = newDoc;
      setDocuments(updated);
    } else {
      setDocuments((prev) => [newDoc, ...prev]);
    }

    // Recalculate user documents added count & confidence
    const newDocAddedCount = documents.filter((d) => d.status === 'associated').length + 1;
    setUser((prev) => ({
      ...prev,
      overallConfidence: Math.min(99.4, Number((prev.overallConfidence + 0.4).toFixed(1))),
    }));

    // Log activity
    const activity = await activityService.logActivity(
      'documents',
      `${newDoc.title} associated`,
      'Document format and biometrics cross-referenced with your identity profile.'
    );
    setActivityEvents((prev) => [activity, ...prev]);

    addToast('Document Associated', `${newDoc.title} added to your identity profile.`, 'success');
  };

  const removeDocument = async (id: string) => {
    const target = documents.find((d) => d.id === id);
    if (!target) return;

    // Reset status to not_added instead of removing entirely if standard document
    const standardTypes: DocumentType[] = ['aadhaar', 'pan', 'voter_id', 'passport', 'driving_licence'];
    if (standardTypes.includes(target.type)) {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === id
            ? {
                ...d,
                status: 'not_added',
                maskedNumber: 'Not Added',
                confidenceScore: 0,
                lastVerifiedDate: '—',
                addedDate: '—',
              }
            : d
        )
      );
    } else {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    }

    const activity = await activityService.logActivity(
      'documents',
      `${target.title} removed`,
      'Document association revoked from your identity profile.'
    );
    setActivityEvents((prev) => [activity, ...prev]);

    addToast('Document Removed', `${target.title} unlinked from profile.`, 'info');
  };

  const generateShareLink = async (
    selectedDocs: DocumentType[],
    duration: string,
    purpose: string,
    org?: string
  ): Promise<ShareLink> => {
    const newShare = await sharingService.generateShareLink(
      selectedDocs,
      duration,
      purpose,
      org
    );
    setShareLinks((prev) => [newShare, ...prev]);

    const activity = await activityService.logActivity(
      'sharing',
      `Secure link generated (${newShare.token})`,
      `Created ${duration} access token for ${purpose}.`
    );
    setActivityEvents((prev) => [activity, ...prev]);

    addToast('Secure Link Generated', `Token ${newShare.token} is now active.`, 'success');
    return newShare;
  };

  const revokeShareLink = async (id: string) => {
    await sharingService.revokeShareLink(id);
    setShareLinks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'revoked' } : s))
    );

    const activity = await activityService.logActivity(
      'sharing',
      'Share link revoked',
      'Access token immediately invalidated. Third-party access terminated.'
    );
    setActivityEvents((prev) => [activity, ...prev]);

    addToast('Access Revoked', 'The verification token has been deactivated.', 'warning');
  };

  const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPrefs }));
    addToast('Preferences Updated', 'Your security settings have been saved.', 'success');
  };

  const openOnboarding = () => setIsOnboardingOpen(true);
  const closeOnboarding = () => setIsOnboardingOpen(false);

  return (
    <IdentityContext.Provider
      value={{
        user,
        documents,
        verificationPairs,
        shareLinks,
        activityEvents,
        preferences,
        isAuthenticated,
        isOnboardingOpen,
        toasts,
        login,
        loginDemo,
        sendOtp,
        verifyOtp,
        signup,
        logout,
        addDocument,
        removeDocument,
        generateShareLink,
        revokeShareLink,
        updatePreferences,
        openOnboarding,
        closeOnboarding,
        addToast,
        removeToast,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};

export const useIdentity = () => {
  const context = useContext(IdentityContext);
  if (!context) {
    throw new Error('useIdentity must be used within an IdentityProvider');
  }
  return context;
};
