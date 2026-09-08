import { IdentityDocument, DocumentType } from '../types';
import { initialDocuments } from '../data/mockData';

export interface OCRResult {
  documentType: string;
  name: string;
  dobMasked: string;
  maskedNumber: string;
  confidence: number;
}

// Simulates future FastAPI POST /documents, GET /documents, DELETE /documents/:id
export const documentService = {
  async getDocuments(): Promise<IdentityDocument[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...initialDocuments];
  },

  async simulateOCR(type: DocumentType, _fileName: string): Promise<OCRResult> {
    // Returns realistic OCR mock extraction based on document type
    await new Promise((resolve) => setTimeout(resolve, 400));
    switch (type) {
      case 'passport':
        return {
          documentType: 'Passport (Republic of India)',
          name: 'ABHIJAY PARASHAR',
          dobMasked: '••/••/2003',
          maskedNumber: 'Z•••••78',
          confidence: 99.4,
        };
      case 'driving_licence':
        return {
          documentType: 'Driving Licence',
          name: 'ABHIJAY PARASHAR',
          dobMasked: '••/••/2003',
          maskedNumber: 'MH-02-•••••92',
          confidence: 97.9,
        };
      case 'aadhaar':
        return {
          documentType: 'Aadhaar Card',
          name: 'ABHIJAY PARASHAR',
          dobMasked: '••/••/2003',
          maskedNumber: 'XXXX XXXX 4821',
          confidence: 99.1,
        };
      case 'pan':
      default:
        return {
          documentType: 'PAN Card',
          name: 'ABHIJAY PARASHAR',
          dobMasked: '••/••/2003',
          maskedNumber: 'XXXXX1234X',
          confidence: 98.4,
        };
    }
  },

  async addDocument(type: DocumentType, customTitle?: string): Promise<IdentityDocument> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const titles: Record<DocumentType, string> = {
      aadhaar: 'Aadhaar Card',
      pan: 'Permanent Account Number (PAN)',
      voter_id: 'Voter ID (EPIC Card)',
      passport: 'Passport (Republic of India)',
      driving_licence: 'Driving Licence',
      other: customTitle || 'Government Identity Document',
    };

    const numbers: Record<DocumentType, string> = {
      aadhaar: 'XXXX XXXX 4821',
      pan: 'XXXXX1234X',
      voter_id: 'ABCXXXX456',
      passport: 'Z•••••78',
      driving_licence: 'MH-02-•••••92',
      other: 'DOC-••••-99',
    };

    const issuers: Record<DocumentType, string> = {
      aadhaar: 'Unique Identification Authority of India (UIDAI)',
      pan: 'Income Tax Department of India',
      voter_id: 'Election Commission of India (ECI)',
      passport: 'Ministry of External Affairs (MEA)',
      driving_licence: 'Ministry of Road Transport & Highways (MoRTH)',
      other: 'Competent Authority',
    };

    return {
      id: `doc_${type}_${Date.now()}`,
      type,
      title: titles[type],
      maskedNumber: numbers[type],
      status: 'associated',
      category: type === 'pan' ? 'financial' : 'identity',
      addedDate: 'Just now',
      lastVerifiedDate: 'Just now',
      confidenceScore: 98.6,
      issuer: issuers[type],
      colorTheme: 'blue',
      matchedFields: {
        name: true,
        dob: true,
        address: true,
        format: true,
      },
      mockExtractedInfo: {
        name: 'ABHIJAY PARASHAR',
        dobMasked: '••/••/2003',
        maskedNumber: numbers[type],
        documentType: titles[type],
      },
    };
  },
};
