import React, { useState } from 'react';
import { useIdentity } from '../context/IdentityContext';
import { DocumentType, ShareLink } from '../types';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import { DocumentIcon } from '../components/identity/DocumentIcon';
import { 
  Share2, 
  Copy, 
  QrCode, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  Building,
  Key,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SecureSharingPage: React.FC = () => {
  const { documents, shareLinks, generateShareLink, revokeShareLink, addToast } = useIdentity();

  const [selectedDocs, setSelectedDocs] = useState<DocumentType[]>(['pan', 'aadhaar']);
  const [duration, setDuration] = useState<string>('24 hours');
  const [purpose, setPurpose] = useState<string>('Employment');
  const [recipientOrg, setRecipientOrg] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Modals state
  const [qrModalShare, setQrModalShare] = useState<ShareLink | null>(null);
  const [linkToRevoke, setLinkToRevoke] = useState<ShareLink | null>(null);

  const availableDocs = documents.filter((d) => d.status === 'associated');

  const durations = ['15 minutes', '1 hour', '24 hours', '7 days'];
  const purposes = ['Employment', 'Banking', 'Rental', 'Education', 'Other'];

  const handleToggleDoc = (type: DocumentType) => {
    if (selectedDocs.includes(type)) {
      if (selectedDocs.length === 1) {
        addToast('Selection Required', 'You must select at least one document to share.', 'warning');
        return;
      }
      setSelectedDocs(selectedDocs.filter((t) => t !== type));
    } else {
      setSelectedDocs([...selectedDocs, type]);
    }
  };

  const handleCreateShare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDocs.length === 0) return;
    setIsGenerating(true);
    await generateShareLink(selectedDocs, duration, purpose, recipientOrg);
    setIsGenerating(false);
  };

  const handleCopyLink = (token: string) => {
    const url = `${window.location.origin}/verify/${token}`;
    navigator.clipboard.writeText(url);
    addToast('Link Copied', `Copied verification URL for token ${token}`, 'success');
  };

  const handleConfirmRevoke = () => {
    if (linkToRevoke) {
      revokeShareLink(linkToRevoke.id);
      setLinkToRevoke(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Secure Sharing
          </h1>
          <Badge variant="info" size="sm" dot>
            Time-Gated Access
          </Badge>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Generate temporary, expiring verification tokens. Share only what is strictly necessary.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Share Link Generator */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-7 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">
              Generate Verification Link
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select documents, purpose, and time-to-live expiration window.
            </p>
          </div>

          <form onSubmit={handleCreateShare} className="space-y-5">
            {/* 1. Select Documents */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                1. Select Associated Documents
              </label>
              <div className="space-y-2">
                {availableDocs.map((doc) => {
                  const isChecked = selectedDocs.includes(doc.type);
                  return (
                    <div
                      key={doc.id}
                      onClick={() => handleToggleDoc(doc.type)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-brand-600 bg-brand-50/40 text-slate-900 shadow-subtle'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by div click
                          className="w-4 h-4 rounded text-brand-600 border-slate-300 focus:ring-brand-500"
                        />
                        <DocumentIcon type={doc.type} size="sm" />
                        <div>
                          <span className="text-xs sm:text-sm font-semibold block">
                            {doc.title}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {doc.maskedNumber}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-medium text-emerald-600">
                        {doc.confidenceScore}% match
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Access Duration */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                2. Select Access Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {durations.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                      duration === d
                        ? 'border-brand-600 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Purpose */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                3. Verification Purpose
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {purposes.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPurpose(p)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                      purpose === p
                        ? 'border-brand-600 bg-brand-50 text-brand-900 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Recipient Organization */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Organization / Employer Name (Optional)
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Acme Financial, Zeta Tech Labs"
                  value={recipientOrg}
                  onChange={(e) => setRecipientOrg(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 text-slate-800"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              isLoading={isGenerating}
              icon={<Key className="w-4 h-4" />}
            >
              Generate Secure Link
            </Button>
          </form>
        </div>

        {/* Right Column: Active Shares & Live Security Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Privacy Advice Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-400">
              <Lock className="w-4 h-4" />
              Minimal Data Principle
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              "Share only what is necessary."
            </h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              When third-parties request identity verification, OneID exposes matching confirmations and confidence metrics without delivering unmasked, downloadable photocopies.
            </p>
          </div>

          {/* Active Links List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Active Verification Links
              </h3>
              <Badge variant="neutral" size="sm">
                {shareLinks.filter((s) => s.status === 'active').length} Active
              </Badge>
            </div>

            <div className="space-y-3.5">
              {shareLinks.map((share) => {
                const isActive = share.status === 'active';

                return (
                  <div
                    key={share.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'border-slate-200/90 bg-slate-50/50'
                        : 'border-slate-100 bg-slate-50/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {share.token}
                          </span>
                          <Badge
                            variant={isActive ? 'success' : 'neutral'}
                            size="sm"
                            dot={isActive}
                          >
                            {share.status === 'active' ? 'Active' : share.status}
                          </Badge>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 mt-1.5">
                          {share.purpose} {share.organization && `• ${share.organization}`}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Expires: {share.expiresAt}
                        </p>
                      </div>

                      {isActive && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleCopyLink(share.token)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white transition-colors"
                            title="Copy link"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setQrModalShare(share)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white transition-colors"
                            title="Generate QR code"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setLinkToRevoke(share)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white transition-colors"
                            title="Revoke access"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {isActive && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <Link
                          to={`/verify/${share.token}`}
                          className="text-brand-600 hover:underline font-medium inline-flex items-center gap-1"
                        >
                          Preview Receiver Portal <ExternalLink className="w-3 h-3" />
                        </Link>
                        <span className="text-slate-400 text-[11px]">
                          {share.selectedDocuments.length} docs authorized
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <Modal
        isOpen={!!qrModalShare}
        onClose={() => setQrModalShare(null)}
        title="Secure QR Verification Pass"
        description="Scan this dynamic QR token to inspect authorized consistency records."
        maxWidth="sm"
      >
        {qrModalShare && (
          <div className="text-center space-y-4">
            {/* SVG simulated QR Code */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 inline-block mx-auto">
              <svg
                width="160"
                height="160"
                viewBox="0 0 160 160"
                className="mx-auto"
              >
                {/* SVG pattern simulating clean QR code squares */}
                <rect width="160" height="160" fill="white" />
                {/* Corner markers */}
                <rect x="10" y="10" width="40" height="40" fill="#0F172A" rx="4" />
                <rect x="18" y="18" width="24" height="24" fill="white" />
                <rect x="24" y="24" width="12" height="12" fill="#0F172A" />

                <rect x="110" y="10" width="40" height="40" fill="#0F172A" rx="4" />
                <rect x="118" y="18" width="24" height="24" fill="white" />
                <rect x="124" y="24" width="12" height="12" fill="#0F172A" />

                <rect x="10" y="110" width="40" height="40" fill="#0F172A" rx="4" />
                <rect x="18" y="118" width="24" height="24" fill="white" />
                <rect x="24" y="124" width="12" height="12" fill="#0F172A" />

                {/* Random matrix blocks */}
                <rect x="60" y="20" width="12" height="12" fill="#2563EB" />
                <rect x="80" y="35" width="16" height="8" fill="#0F172A" />
                <rect x="60" y="60" width="40" height="40" fill="#0F172A" rx="4" />
                <rect x="70" y="70" width="20" height="20" fill="white" />
                <rect x="76" y="76" width="8" height="8" fill="#2563EB" />

                <rect x="20" y="65" width="14" height="14" fill="#0F172A" />
                <rect x="38" y="85" width="10" height="10" fill="#0F172A" />
                <rect x="115" y="65" width="20" height="10" fill="#0F172A" />
                <rect x="125" y="85" width="14" height="14" fill="#0F172A" />
                <rect x="65" y="115" width="14" height="14" fill="#0F172A" />
                <rect x="85" y="125" width="20" height="10" fill="#0F172A" />
                <rect x="115" y="115" width="25" height="25" fill="#2563EB" rx="3" />
              </svg>
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-slate-800 tracking-widest block">
                TOKEN: {qrModalShare.token}
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Valid for {qrModalShare.purpose} • Expires {qrModalShare.expiresAt}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleCopyLink(qrModalShare.token)}
                icon={<Copy className="w-3.5 h-3.5" />}
              >
                Copy Link
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setQrModalShare(null)}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Revocation Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!linkToRevoke}
        onClose={() => setLinkToRevoke(null)}
        onConfirm={handleConfirmRevoke}
        title="Revoke Verification Link?"
        message={`Immediately invalidates token ${linkToRevoke?.token}. Anyone accessing this link will receive an expired/revoked error screen.`}
        confirmLabel="Revoke Immediately"
        isDangerous
      />
    </div>
  );
};
