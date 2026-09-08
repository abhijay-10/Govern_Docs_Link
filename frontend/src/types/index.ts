export type DocumentType = 
  | 'aadhaar' 
  | 'pan' 
  | 'voter_id' 
  | 'passport' 
  | 'driving_licence' 
  | 'other';

export type DocumentStatus = 'associated' | 'not_added' | 'pending' | 'verifying';

export type DocumentCategory = 'all' | 'identity' | 'address' | 'financial' | 'other';

export interface IdentityDocument {
  id: string;
  type: DocumentType;
  title: string;
  maskedNumber: string;
  status: DocumentStatus;
  category: DocumentCategory;
  addedDate: string;
  lastVerifiedDate: string;
  confidenceScore: number;
  issuer: string;
  colorTheme: string;
  matchedFields: {
    name: boolean;
    dob: boolean;
    address?: boolean;
    format: boolean;
  };
  mockExtractedInfo?: {
    name: string;
    dobMasked: string;
    maskedNumber: string;
    documentType: string;
    issueDate?: string;
  };
}

export interface ConsistencyBreakdown {
  name: number;
  dob: number;
  address: number;
  document: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  dobMasked: string;
  identityStatus: 'Strong Match' | 'Moderate Match' | 'Review Required';
  overallConfidence: number;
  consistencyBreakdown: ConsistencyBreakdown;
  securityStatus: 'Strong' | 'Moderate' | 'Action Needed';
}

export interface VerificationPair {
  id: string;
  docA: DocumentType;
  docB: DocumentType;
  docAName: string;
  docBName: string;
  matchScore: number;
  status: 'Strong Match' | 'Moderate Match' | 'Review Required';
  details: {
    nameMatch: 'Matched' | 'Partial' | 'Mismatch';
    dobMatch: 'Matched' | 'Partial' | 'Mismatch';
    addressMatch: 'Matched' | 'Similar' | 'Different';
    documentFormat: 'Valid' | 'Unverified';
    overallConfidence: number;
    notes: string;
  };
}

export interface ShareLink {
  id: string;
  token: string;
  createdDate: string;
  expiresAt: string;
  durationLabel: string;
  purpose: string;
  selectedDocuments: DocumentType[];
  status: 'active' | 'expired' | 'revoked';
  accessCount: number;
  organization?: string;
  requestedBy?: string;
}

export type ActivityCategory = 'all' | 'security' | 'documents' | 'sharing' | 'verification';

export interface ActivityEvent {
  id: string;
  category: 'security' | 'documents' | 'sharing' | 'verification';
  title: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  device: string;
  location: string;
  ipMasked: string;
}

export interface UserPreferences {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  consentManagement: boolean;
  documentVisibility: 'strict' | 'selective' | 'open';
  dataRetentionDays: number;
  emailNotifications: boolean;
  theme: 'light' | 'dark';
}
