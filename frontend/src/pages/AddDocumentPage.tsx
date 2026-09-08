import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIdentity } from '../context/IdentityContext';
import { UploadZone } from '../components/upload/UploadZone';
import { DocumentType } from '../types';
import { OCRResult } from '../services/documentService';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const AddDocumentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = (searchParams.get('type') as DocumentType) || 'pan';
  const { addDocument } = useIdentity();
  const navigate = useNavigate();

  const handleSuccess = async (type: DocumentType, extractedInfo: OCRResult) => {
    await addDocument(type, extractedInfo.documentType);
    navigate('/documents');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          icon={<ArrowLeft className="w-4 h-4" />}
          className="mb-3 -ml-2"
        >
          Back
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Add an Identity Document
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Upload and cross-verify government identity documents into your secure identity profile.
        </p>
      </div>

      {/* Upload Zone */}
      <UploadZone
        initialType={initialType}
        onSuccess={handleSuccess}
        onCancel={() => navigate('/documents')}
      />

      {/* Disclaimer */}
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Privacy-First Storage Notice:</strong> Uploaded files are processed in isolated client-side memory. Optical models extract matching vectors while document numbers are automatically masked (`XXXXX1234X`). No official government database linkage is created.
        </p>
      </div>
    </div>
  );
};
