import React from 'react';
import { 
  FolderPlus, 
  FileSearch, 
  GitCompare, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Add Documents',
      subtitle: 'Bring your identity records into one profile.',
      icon: FolderPlus,
      tag: 'Ingestion & Masking',
    },
    {
      num: '02',
      title: 'Extract Information',
      subtitle: 'Document information is structured for consistency analysis.',
      icon: FileSearch,
      tag: 'OCR Parsing',
    },
    {
      num: '03',
      title: 'Check Consistency',
      subtitle: 'Compare identity attributes across documents.',
      icon: GitCompare,
      tag: 'Pairwise Matching',
    },
    {
      num: '04',
      title: 'Control Access',
      subtitle: 'Share only what is required, when it is required.',
      icon: ShieldCheck,
      tag: 'Time-Gated Sharing',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 bg-navy-900 text-white overflow-hidden">
      {/* Background radial and texture */}
      <div className="absolute inset-0 bg-dot-grid-dark opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-fine-lines-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-900/60 border border-brand-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3 shadow-glow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Verification Pipeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            From documents to one identity.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            A privacy-first pipeline that ingests, sanitizes, and evaluates document consistency without relying on persistent statutory databases.
          </p>
        </div>

        {/* Process Visualization */}
        <div className="relative">
          {/* Glowing horizontal connecting line behind steps (visible on desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-brand-600/30 via-cyan-400 to-brand-600/30 z-0">
            {/* Glowing moving dot */}
            <div className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#4EA7FF] animate-pulse" style={{ left: '45%' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="group relative rounded-2xl bg-navy-850/80 border border-slate-700/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-500/60 hover:shadow-glow hover:-translate-y-1"
                >
                  {/* Top Row: Step Indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-navy-900 border border-brand-500/30 flex items-center justify-center text-cyan-400 shadow-sm group-hover:border-cyan-400 group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  {/* Micro tag */}
                  <div className="inline-block text-[10px] font-semibold text-brand-300 uppercase tracking-wider mb-2">
                    {step.tag}
                  </div>

                  {/* Step Title & Subtitle */}
                  <h3 className="text-base font-bold text-white tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.subtitle}
                  </p>

                  {/* Bottom subtle accent line */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Phase {idx + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
