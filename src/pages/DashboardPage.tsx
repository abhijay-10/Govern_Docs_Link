import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIdentity } from '../context/IdentityContext';
import { DocumentCard } from '../components/identity/DocumentCard';
import { CircularScore } from '../components/identity/CircularScore';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ComparisonModal } from '../components/identity/ComparisonModal';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import { IdentityDocument, VerificationPair } from '../types';
import {
  ShieldCheck,
  FolderLock,
  Percent,
  Lock,
  Plus,
  ArrowRight,
  Sparkles,
  GitFork,
  Share2,
  ExternalLink,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, documents, verificationPairs, removeDocument, openOnboarding } = useIdentity();
  const [selectedPair, setSelectedPair] = useState<VerificationPair | null>(null);
  const [docToRemove, setDocToRemove] = useState<IdentityDocument | null>(null);

  const associatedCount = documents.filter((d) => d.status === 'associated').length;
  const totalStandardDocs = 5;

  const handleRemoveConfirm = () => {
    if (docToRemove) {
      removeDocument(docToRemove.id);
      setDocToRemove(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Good morning, {user.name.split(' ')[0]}
            </h1>
            <Badge variant="success" size="sm" dot>
              Profile Synchronized
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Here's the current status of your identity profile and document consistency matrix.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={openOnboarding}
            icon={<Sparkles className="w-3.5 h-3.5 text-brand-600" />}
          >
            Guided Tour
          </Button>

          <Link to="/documents/add">
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
            >
              Add Document
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Identity Profile Status */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Identity Profile
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              Active
            </span>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Unified Anchor Established
            </p>
          </div>
        </div>

        {/* Documents Added */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Documents Added
            </span>
            <div className="p-2 bg-blue-50 text-brand-600 rounded-xl border border-brand-100">
              <FolderLock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {associatedCount} / {totalStandardDocs}
            </span>
            <p className="text-xs text-slate-400 mt-1">
              {totalStandardDocs - associatedCount} credentials available to associate
            </p>
          </div>
        </div>

        {/* Verification Confidence */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Verification Confidence
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {user.overallConfidence}%
            </span>
            <p className="text-xs text-emerald-700 font-medium mt-1">
              {user.identityStatus}
            </p>
          </div>
        </div>

        {/* Security Status */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Security Status
            </span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {user.securityStatus}
            </span>
            <p className="text-xs text-indigo-700 font-medium mt-1">
              2FA Active • Zero Raw Storage
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Document Status & Quick Consistency */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Identity Documents
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Associated government documents linked to your primary verification profile.
            </p>
          </div>

          <Link to="/documents">
            <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Manage All
            </Button>
          </Link>
        </div>

        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onVerify={(d) => {
                const matchedPair = verificationPairs.find(
                  (p) => p.docA === d.type || p.docB === d.type
                );
                if (matchedPair) {
                  setSelectedPair(matchedPair);
                } else {
                  alert(`Consistency analysis active for ${d.title}`);
                }
              }}
              onRemove={(d) => setDocToRemove(d)}
            />
          ))}
        </div>
      </div>

      {/* Quick Visual Section: Identity Graph Banner & Cross Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consistency Score Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-card flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Profile Alignment
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Consistency Index
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Cross-reconciliation of full legal name, date of birth, and issuing formats across associated documents.
            </p>
          </div>

          <div className="py-6 flex justify-center">
            <CircularScore
              score={user.overallConfidence}
              size={170}
              label="Overall Match"
              sublabel={user.identityStatus}
            />
          </div>

          <Link to="/identity">
            <Button variant="secondary" size="sm" className="w-full justify-center">
              View Detailed Attribute Breakdown
            </Button>
          </Link>
        </div>

        {/* Pairwise Comparison Matrix Preview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Verification Cross-Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  AI-assisted document consistency analysis across paired credentials.
                </p>
              </div>
              <Link to="/verification">
                <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                  Verification Center
                </Button>
              </Link>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {verificationPairs.map((pair) => (
                <div
                  key={pair.id}
                  onClick={() => setSelectedPair(pair)}
                  className="py-3.5 flex items-center justify-between hover:bg-slate-50/70 p-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-semibold text-xs border border-slate-200/60">
                      VS
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {pair.docAName} ↔ {pair.docBName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Name: {pair.details.nameMatch} • DOB: {pair.details.dobMatch}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900 block">
                        {pair.matchScore}%
                      </span>
                      <span className="text-[11px] text-emerald-600 font-semibold">
                        {pair.status}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              Does not represent an official government verification.
            </span>
            <Link to="/graph" className="text-brand-600 font-medium hover:underline flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" />
              Open Identity Topology
            </Link>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      <ComparisonModal
        pair={selectedPair}
        isOpen={!!selectedPair}
        onClose={() => setSelectedPair(null)}
      />

      {/* Document Removal Confirmation */}
      <ConfirmationModal
        isOpen={!!docToRemove}
        onClose={() => setDocToRemove(null)}
        onConfirm={handleRemoveConfirm}
        title={`Unlink ${docToRemove?.title}?`}
        message={`Are you sure you want to unlink this credential? Its attributes will no longer participate in the consistency scoring matrix until re-associated.`}
        confirmLabel="Unlink Document"
        isDangerous
      />
    </div>
  );
};
