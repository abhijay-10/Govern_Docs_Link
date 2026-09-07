import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CtaSection: React.FC = () => {
  return (
    <section className="relative py-20 bg-navy-950 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-dot-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Glow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-900/80 border border-brand-500/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-glow-sm">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Privacy-Centric Architecture</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
          Your identity shouldn't be scattered.
        </h2>

        {/* Subheading */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Bring your identity records together in one secure profile. Evaluate attribute consistency without risking raw data exposure.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-glow transition-all hover:scale-[1.02]"
          >
            <span>Explore OneID Demo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-navy-900 hover:bg-navy-850 border border-slate-700 transition-all hover:border-slate-500"
          >
            Create Identity Profile
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-slate-500 max-w-md mx-auto">
          Concept platform for identity association and verification. Does not perform statutory government database linkages.
        </p>

      </div>
    </section>
  );
};
