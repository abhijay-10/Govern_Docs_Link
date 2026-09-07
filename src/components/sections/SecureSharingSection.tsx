import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Clock, 
  QrCode, 
  Check, 
  X, 
  Share2, 
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SecureSharingSection: React.FC = () => {
  const [requestStatus, setRequestStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  return (
    <section className="relative py-20 bg-white border-b border-slate-200/80 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/70 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <Share2 className="w-3.5 h-3.5" />
            Controlled Delegation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Secure sharing.<br />
            <span className="text-brand-600">Zero permanent exposure.</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Authorize verifiers on-demand with time-fenced verification passes. Revoke instantly or let tokens expire automatically.
          </p>
        </div>

        {/* Mockup Dual Container */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Verification Request Card (7 cols) */}
          <div className="md:col-span-7 bg-surface-muted rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                      Incoming Verification
                    </span>
                    <h3 className="text-sm font-bold text-navy-900">
                      Verification Request
                    </h3>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Awaiting Consent
                </span>
              </div>

              {/* Request Metadata Details */}
              <div className="py-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Requested by:</span>
                  <span className="font-semibold text-navy-900">Demo Organization (HR Tech)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Purpose:</span>
                  <span className="font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Employment Verification
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Access Window:</span>
                  <span className="inline-flex items-center gap-1 font-mono font-semibold text-brand-600">
                    <Clock className="w-3 h-3" />
                    24 Hours (Auto-Revoke)
                  </span>
                </div>

                {/* Requested Credentials Checklist */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Requested Credentials:
                  </span>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-navy-900 bg-white p-2 rounded-lg border border-slate-200">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">Permanent Account Number (PAN)</span>
                      <span className="ml-auto text-[10px] font-mono text-slate-400">Masked XXXXX1234X</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-navy-900 bg-white p-2 rounded-lg border border-slate-200">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">OneID Unified Identity Profile</span>
                      <span className="ml-auto text-[10px] font-mono text-slate-400">97.8% Score</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Approve / Reject Simulation */}
            <div className="pt-4 border-t border-slate-200">
              {requestStatus === 'pending' ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRequestStatus('approved')}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-all shadow-sm hover:shadow-glow-sm"
                  >
                    <Check className="w-4 h-4" />
                    Approve Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestStatus('rejected')}
                    className="py-2 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              ) : requestStatus === 'approved' ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Access granted for 24 Hours</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRequestStatus('pending')}
                    className="text-[11px] text-emerald-700 underline font-medium"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-rose-800 font-semibold">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Request rejected</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRequestStatus('pending')}
                    className="text-[11px] text-rose-700 underline font-medium"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right: Dynamic QR Verification Pass (5 cols) */}
          <div className="md:col-span-5 bg-navy-900 text-white rounded-2xl border border-slate-700 p-6 shadow-card flex flex-col justify-between items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-fine-lines-dark opacity-30 pointer-events-none" />

            <div className="relative w-full">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider">
                  DYNAMIC PASS
                </span>
                <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              {/* QR Mockup Box */}
              <div className="my-5 p-4 bg-white rounded-2xl shadow-inner inline-block mx-auto border-2 border-brand-500/40">
                <QrCode className="w-28 h-28 sm:w-32 sm:h-32 text-navy-900" />
              </div>

              <h4 className="text-sm font-bold text-white tracking-tight">
                Scan to verify
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                Receiver scans to load the cryptographic verification portal without holding original credentials.
              </p>
            </div>

            <div className="relative w-full pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="font-mono text-slate-400">Token: 8F92KX</span>
              <Link
                to="/verify/8F92KX"
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <span>Preview Portal</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
