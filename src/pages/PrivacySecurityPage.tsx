import React from 'react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Clock,
  FileCheck2,
  Cpu,
  CheckCircle2,
  Shield,
  ArrowRight,
  Fingerprint,
  KeyRound,
  ShieldAlert
} from 'lucide-react';

export const PrivacySecurityPage: React.FC = () => {
  const securityChecklist = [
    { title: 'Two-factor authentication', desc: 'Hardware and TOTP cryptographic authenticator active', status: true },
    { title: 'Secure session management', desc: 'Short-lived token lifetimes with remote invalidation', status: true },
    { title: 'Document encryption in transit & rest', desc: 'AES-256 client memory isolation with synthetic masks', status: true },
    { title: 'Immutable access logging', desc: 'Tamper-evident chronological audit trail', status: true },
    { title: 'Explicit user consent controls', desc: 'Third-party requests require candidate approval', status: true },
    { title: 'Time-gated secure sharing', desc: 'Granular token TTL expiration from 15m to 7 days', status: true },
  ];

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zero-Compromise Security Architecture
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Your Identity. Your Control.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            OneID is engineered from the ground up to prevent identity credential abuse, data leakage, and unencrypted document proliferation.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span className="text-xs text-slate-300">Security Posture:</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Excellent
              </span>
            </div>

            <Link to="/settings">
              <Button variant="secondary" size="sm" className="bg-white text-slate-900 border-none">
                Configure Controls
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Security Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Active Security Guardrails
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-tiered safeguards protecting identity profiles and document consistency proofs.
            </p>
          </div>
          <Badge variant="success" size="sm" dot>
            6 of 6 Verified
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityChecklist.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-start gap-3.5"
            >
              <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy by Design - 4 UI Cards */}
      <div>
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Guiding Philosophy
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Privacy by Design
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Our technical pillars ensure you never compromise personal data sovereignty when verifying identity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1: Minimal Data */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-600 border border-brand-100 flex items-center justify-center mb-4">
                <EyeOff className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Minimal Data</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                "Only necessary information should be exposed." Rather than handing over complete unmasked document photocopies with sensitive numbers, OneID confirms attribute concordance and returns cryptographically signed match indicators.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-brand-600">
              Zero Raw Number Exposure
            </div>
          </div>

          {/* Card 2: User Consent */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">User Consent</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                "Users control when and why their information is shared." No organization can scrape or access your verification matrix without a direct authorization action or a custom time-gated verification token you generate.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-700">
              Explicit Authorization Gate
            </div>
          </div>

          {/* Card 3: Time-Limited Access */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Time-Limited Access</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                "Shared information can automatically expire." Verification passes are bounded by strict time-to-live intervals (15m to 7 days). Once the time elapses, receiver links immediately become invalid, preventing permanent archival.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-amber-700">
              Automated TTL Expiration
            </div>
          </div>

          {/* Card 4: Auditability */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center mb-4">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Auditability</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                "Users can see who accessed their information." Every single document upload, pairwise matrix evaluation, and third-party link access is permanently stamped in an immutable security audit trail with IP and device signatures.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-indigo-700">
              Transparent Access Log
            </div>
          </div>
        </div>
      </div>

      {/* Sober Disclaimers */}
      <div className="p-5 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Important Architectural Notice:</strong> OneID operates exclusively on client-isolated heuristic matching models. The system does not interface with central Aadhaar UIDAI databases, NSDL/UTIITSL PAN databases, Election Commission systems, or any external statutory identity repositories.
        </p>
      </div>
    </div>
  );
};
