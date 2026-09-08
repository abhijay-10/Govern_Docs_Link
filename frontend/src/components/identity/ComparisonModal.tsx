import React from 'react';
import { VerificationPair } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { CheckCircle2, AlertCircle, Info, ArrowRightLeft, ShieldAlert } from 'lucide-react';

export interface ComparisonModalProps {
  pair: VerificationPair | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  pair,
  isOpen,
  onClose,
}) => {
  if (!pair) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${pair.docAName} ↔ ${pair.docBName} Consistency`}
      description="Field-level cross-document phonetic, lexical and structural matching results."
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Score Card Header */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-50 text-brand-700 rounded-lg border border-brand-100">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Comparison Status</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">{pair.status}</span>
                <Badge variant="success" size="sm" dot>
                  Verified Matrix
                </Badge>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium block">Match Score</span>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {pair.matchScore}%
            </span>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Attribute Consistency Breakdown
          </h4>

          {/* Name Match */}
          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-sm font-medium text-slate-800">Full Name</span>
                <p className="text-xs text-slate-400">Exact character and phoneme sequence match</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
              {pair.details.nameMatch}
            </span>
          </div>

          {/* Date of Birth Match */}
          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-sm font-medium text-slate-800">Date of Birth</span>
                <p className="text-xs text-slate-400">Normalized calendar year & day reconciliation</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
              {pair.details.dobMatch}
            </span>
          </div>

          {/* Address Match */}
          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4 text-amber-500" />
              <div>
                <span className="text-sm font-medium text-slate-800">Address / Jurisdiction</span>
                <p className="text-xs text-slate-400">Geocoded locality similarity index ~96%</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-100">
              {pair.details.addressMatch}
            </span>
          </div>

          {/* Document Format */}
          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-sm font-medium text-slate-800">Document Structure & Format</span>
                <p className="text-xs text-slate-400">Conforms to standard issuing authority spec</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
              {pair.details.documentFormat}
            </span>
          </div>
        </div>

        {/* Analysis Notes */}
        <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/60 text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800 block mb-1">Consistency Analysis Notes</span>
          {pair.details.notes}
        </div>

        {/* Sober Disclaimer */}
        <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/50 flex items-start gap-2.5 text-xs text-amber-800">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">AI-Assisted Consistency Analysis:</strong> This comparison indicates cryptographic and lexical alignment between provided documents. It does not represent an official government verification or statutory linkage.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Analysis
          </Button>
        </div>
      </div>
    </Modal>
  );
};
