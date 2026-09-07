import React, { useState, useRef } from 'react';
import { DocumentType } from '../../types';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Loader2, 
  ArrowRight,
  RefreshCw,
  Lock
} from 'lucide-react';
import { documentService, OCRResult } from '../../services/documentService';

export interface UploadZoneProps {
  initialType?: DocumentType;
  onSuccess: (type: DocumentType, extractedInfo: OCRResult) => void;
  onCancel?: () => void;
}

type UploadStep = 'select' | 'uploading' | 'reading' | 'extracting' | 'checking' | 'complete' | 'review';

export const UploadZone: React.FC<UploadZoneProps> = ({
  initialType = 'pan',
  onSuccess,
  onCancel,
}) => {
  const [selectedType, setSelectedType] = useState<DocumentType>(initialType);
  const [customTitle, setCustomTitle] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<UploadStep>('select');
  const [extractedData, setExtractedData] = useState<OCRResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const documentTypes: { id: DocumentType; label: string; desc: string }[] = [
    { id: 'pan', label: 'PAN Card', desc: 'Permanent Account Number' },
    { id: 'aadhaar', label: 'Aadhaar Card', desc: '12-digit UIDAI identity' },
    { id: 'voter_id', label: 'Voter ID', desc: 'Election Commission EPIC' },
    { id: 'passport', label: 'Passport', desc: 'Republic of India' },
    { id: 'driving_licence', label: 'Driving Licence', desc: 'MoRTH Transport Authority' },
    { id: 'other', label: 'Other ID', desc: 'Government issued credential' },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = async (selectedFile: File) => {
    setFile(selectedFile);

    // Run realistic 5-step animation
    setStep('uploading');
    await new Promise((r) => setTimeout(r, 650));

    setStep('reading');
    await new Promise((r) => setTimeout(r, 650));

    setStep('extracting');
    const result = await documentService.simulateOCR(selectedType, selectedFile.name);
    setExtractedData(result);
    await new Promise((r) => setTimeout(r, 650));

    setStep('checking');
    await new Promise((r) => setTimeout(r, 700));

    setStep('complete');
    await new Promise((r) => setTimeout(r, 450));

    setStep('review');
  };

  const handleReset = () => {
    setFile(null);
    setStep('select');
    setExtractedData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleConfirmAdd = () => {
    if (extractedData) {
      onSuccess(selectedType, extractedData);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8">
      {/* Type Selector */}
      {step === 'select' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
              Select Document Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {documentTypes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedType(t.id)}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    selectedType === t.id
                      ? 'border-brand-600 bg-brand-50/50 text-slate-900 shadow-subtle'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="font-semibold text-xs sm:text-sm">{t.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {selectedType === 'other' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Document Name / Issuing Body
              </label>
              <input
                type="text"
                placeholder="e.g. State Pension Card, Ration ID"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
              />
            </div>
          )}

          {/* Upload Dropzone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
              Upload Document File
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-brand-600 bg-brand-50/30 scale-[0.99]'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileInput}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center mx-auto mb-3.5 shadow-subtle">
                <UploadCloud className="w-6 h-6" />
              </div>

              <h4 className="text-sm sm:text-base font-semibold text-slate-800">
                Drop your document here, or <span className="text-brand-600 font-semibold underline">Browse Files</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1.5">
                Supported formats: PDF, JPG, PNG (Maximum file size: 10 MB)
              </p>

              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
                <Lock className="w-3 h-3 text-slate-500" />
                Your document is protected using encrypted client-side isolation.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simulated 5-Step Processing Progress */}
      {step !== 'select' && step !== 'review' && (
        <div className="py-12 px-4 text-center max-w-md mx-auto space-y-6">
          <div className="w-14 h-14 rounded-full bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center mx-auto shadow-subtle">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 capitalize">
              {step === 'uploading' && 'Uploading document...'}
              {step === 'reading' && 'Reading document format...'}
              {step === 'extracting' && 'Extracting verification attributes...'}
              {step === 'checking' && 'Checking consistency against profile...'}
              {step === 'complete' && 'Extraction complete!'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Analyzing text coordinates and validating synthetic credentials.
            </p>
          </div>

          {/* Progress Steps Indicator */}
          <div className="space-y-2 text-left bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {[
              { id: 'uploading', label: '1. Encrypted Upload' },
              { id: 'reading', label: '2. Optical Reading' },
              { id: 'extracting', label: '3. Data Extraction' },
              { id: 'checking', label: '4. Consistency Check' },
              { id: 'complete', label: '5. Match Ready' },
            ].map((s, idx) => {
              const order = ['uploading', 'reading', 'extracting', 'checking', 'complete'];
              const currentIndex = order.indexOf(step);
              const isPast = currentIndex > idx;
              const isCurrent = currentIndex === idx;

              return (
                <div key={s.id} className="flex items-center justify-between text-xs py-1">
                  <span
                    className={`font-medium ${
                      isCurrent
                        ? 'text-brand-600 font-semibold'
                        : isPast
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                  {isPast && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {isCurrent && <Loader2 className="w-3.5 h-3.5 text-brand-600 animate-spin" />}
                  {!isPast && !isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Review Extracted Information */}
      {step === 'review' && extractedData && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                ✓ Document Analyzed
              </span>
              <h3 className="text-base font-semibold text-slate-900 mt-0.5">
                Verify Extracted Information
              </h3>
            </div>
            <Badge variant="success" size="sm" dot>
              Confidence {extractedData.confidence}%
            </Badge>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Document Type</span>
                <span className="text-sm font-semibold text-slate-800">
                  {extractedData.documentType}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Identified Full Name</span>
                <span className="text-sm font-semibold text-slate-800 font-mono">
                  {extractedData.name}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Date of Birth</span>
                <span className="text-sm font-semibold text-slate-800 font-mono">
                  {extractedData.dobMasked}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Masked Document Number</span>
                <span className="text-sm font-semibold text-slate-800 font-mono">
                  {extractedData.maskedNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/60 flex items-start gap-2.5 text-xs text-blue-800 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              This document matches <strong>Abhijay Parashar</strong>'s primary profile attributes with high confidence. Adding it will link it to your local verification matrix.
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" onClick={handleReset} icon={<RefreshCw className="w-3.5 h-3.5" />}>
              Rescan File
            </Button>

            <div className="flex items-center gap-2.5">
              {onCancel && (
                <Button variant="secondary" size="sm" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmAdd}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Add to Identity Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
