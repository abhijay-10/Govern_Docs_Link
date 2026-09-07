import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const VerificationSection: React.FC = () => {
  const consistencyMetrics = [
    { label: 'Name Consistency', value: 99, color: 'bg-brand-600' },
    { label: 'Date of Birth', value: 100, color: 'bg-emerald-500' },
    { label: 'Address Consistency', value: 96, color: 'bg-cyan-500' },
    { label: 'Document Consistency', value: 98, color: 'bg-indigo-600' },
  ];

  const pairwiseMatches = [
    {
      pair: 'Aadhaar ↔ PAN',
      score: '99.2%',
      status: 'Strong Match',
      desc: 'Exact phonetic name alignment & verified birth year match.',
    },
    {
      pair: 'Aadhaar ↔ Voter ID',
      score: '96.4%',
      status: 'Strong Match',
      desc: 'High lexical locality match with minor street prefix variance.',
    },
  ];

  return (
    <section id="verification" className="relative py-20 bg-white border-b border-slate-200/80 overflow-hidden">
      {/* Background Radial Tint */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Editorial & Problem Solution */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-600 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Automated Synthesis
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight leading-[1.2]">
              See consistency,<br />
              <span className="text-brand-600">not just documents.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Traditional verification merely checks whether an unverified PDF exists. OneID decomposes attributes across all your records to evaluate phonetics, dates, and formatting correlations.
            </p>

            {/* AI assisted disclaimer pill */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-navy-900">AI-assisted consistency analysis</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Algorithmic cross-referencing for tamper-resistant private assurance. Not an official government verification service.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 group"
              >
                <span>Inspect full consistency methodology</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: High-Fidelity Verification Dashboard Mockup */}
          <div className="lg:col-span-7">
            <div className="relative bg-navy-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-700/80 shadow-card backdrop-blur-sm overflow-hidden">
              
              {/* Subtle grid pattern inside dashboard */}
              <div className="absolute inset-0 bg-fine-lines-dark opacity-30 pointer-events-none" />

              {/* Dashboard Topbar */}
              <div className="relative flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
                    IDENTITY CONSISTENCY MATRIX
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                  SYNTHETIC RECONCILIATION
                </span>
              </div>

              {/* Hero Metric Row */}
              <div className="relative my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-navy-850 border border-slate-700/70">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                    Composite Profile Confidence
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                      97.8%
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                      Strong Match
                    </span>
                  </div>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">
                    Analyzed Document Count
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    3 Connected Sovereign IDs
                  </div>
                  <div className="text-[10px] text-cyan-400 mt-0.5">
                    UIDAI • CBDT • ECI
                  </div>
                </div>
              </div>

              {/* Attribute Consistency Breakdown */}
              <div className="relative space-y-3 mb-6">
                <div className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
                  Attribute Level Breakdown
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {consistencyMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-3 rounded-lg bg-navy-800/80 border border-slate-700/50"
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-300 font-medium">{metric.label}</span>
                        <span className="font-mono text-xs font-bold text-white">
                          {metric.value}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${metric.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cross-Document Pairwise Comparisons */}
              <div className="relative space-y-2.5 pt-4 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-300 tracking-wide uppercase mb-2">
                  Pairwise Document Corroboration
                </div>

                {pairwiseMatches.map((item) => (
                  <div
                    key={item.pair}
                    className="p-3 rounded-xl bg-navy-850/90 border border-slate-700/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white font-mono">
                          {item.pair}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-1.5 py-0.2 rounded">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <div className="font-mono text-base font-bold text-cyan-400 self-end sm:self-center">
                      {item.score}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer status label */}
              <div className="relative mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Deterministic hashing • Client isolation</span>
                <span className="text-emerald-400">Verified</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
