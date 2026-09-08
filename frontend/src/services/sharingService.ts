import { ShareLink, DocumentType } from '../types';
import { initialShareLinks } from '../data/mockData';

// Simulates future FastAPI POST /sharing/generate, GET /sharing, DELETE /sharing/:id
export const sharingService = {
  async getShareLinks(): Promise<ShareLink[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...initialShareLinks];
  },

  async generateShareLink(
    selectedDocuments: DocumentType[],
    durationLabel: string,
    purpose: string,
    organization?: string
  ): Promise<ShareLink> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate clean uppercase token
    const token = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    return {
      id: `share_${token}`,
      token,
      createdDate: 'Just now',
      expiresAt: `In ${durationLabel}`,
      durationLabel,
      purpose,
      selectedDocuments,
      status: 'active',
      accessCount: 0,
      organization: organization || 'Designated Verifier',
      requestedBy: organization || 'Direct Secure Share',
    };
  },

  async revokeShareLink(shareId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return true;
  },

  async getShareLinkByToken(token: string): Promise<ShareLink | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const found = initialShareLinks.find(
      (s) => s.token.toLowerCase() === token.toLowerCase()
    );
    if (found) return found;

    // Fallback dynamic link for demo purposes
    return {
      id: `share_${token}`,
      token,
      createdDate: 'Today',
      expiresAt: '23h 41m remaining',
      durationLabel: '24 hours',
      purpose: 'Employment Verification',
      selectedDocuments: ['pan', 'aadhaar'],
      status: 'active',
      accessCount: 1,
      organization: 'Demo Organization',
      requestedBy: 'Demo Organization HR Department',
    };
  },
};
