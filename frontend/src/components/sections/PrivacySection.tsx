import React from 'react';
import { 
  EyeOff, 
  KeyRound, 
  Clock, 
  History, 
  ShieldCheck,
  Check
} from 'lucide-react';

export const PrivacySection: React.FC = () => {
  const principles = [
    {
      title: 'Minimal Exposure',
      subtitle: 'Only necessary information is shown.',
      description: 'Raw Aadhaar, PAN, and passport numbers are masked with cryptographic hashes. No raw sensitive numbers are ever broadcast.',
      icon: EyeOff,
      badge: 'Zero-Leakage',
    },
    {
      title: 'Consent',
      subtitle: 'You control what gets shared.',
      description: 'Granular field permissions ensure third parties only see the exact attributes you approve for a specific verification instance.',
      icon: KeyRound,
      badge: 'Cryptographic Auth',
    },
    {
      title: 'Time-Limited Access',
      subtitle: 'Shared access can expire automatically.',
      description: 'Verification links and dynamic QR passes expire automatically after 15m, 1h, 24h, or 7d, with instant one-click revocation.',
      icon: Clock,
      badge: 'Auto-Expiry',
    },
    {
      title: 'Auditability',
      subtitle: 'See when and how information is accessed.',
      description: 'A transparent chronological activity ledger records every receiver inspection, IP footprint, and token verification event.',
      icon: History,
      badge: 'Immutable Log',
    },
  ];

  return (
    <section id="privacy" className="relative py-20 bg-surface-muted border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/70 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Privacy by Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Your identity.<br />
            <span className="text-brand-600">Your control.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            OneID replaces the dangerous habit of emailing unredacted photocopies with cryptographic assurance. You preserve complete sovereignty over your sovereign identity credentials.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl bg-white border border-slate-200/90 p-6 shadow-sm transition-all duration-300 hover:border-brand-400 hover:shadow-card-hover hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 border border-brand-200/60 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-navy-900 tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-brand-600 mb-2">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Enforced Client-Side</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
