import React from 'react';
import { ShieldCheck, UserCheck, CheckCircle2 } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'Privacy First',
      description: 'Client-side isolation & zero-knowledge document masking.',
      icon: ShieldCheck,
    },
    {
      num: '02',
      title: 'User Controlled',
      description: 'Cryptographic authorization tokens & automatic time expiration.',
      icon: UserCheck,
    },
    {
      num: '03',
      title: 'Verifiable',
      description: 'AI-assisted cross-document consistency and phonetic analysis.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="relative border-y border-slate-200/80 bg-white/70 backdrop-blur-sm py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            BUILT AROUND THREE PRINCIPLES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="group flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-slate-50/80 border border-transparent hover:border-slate-200/60"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 border border-brand-100/80 text-brand-600 font-mono text-xs font-bold transition-transform group-hover:scale-105">
                  {item.num}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-brand-600" />
                    <h3 className="text-sm font-bold text-navy-900 tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
