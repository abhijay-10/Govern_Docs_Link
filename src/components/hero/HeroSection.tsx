import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroIdentityVisual } from './HeroIdentityVisual';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Background Subtle Radial Glow & Dot Grid */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Eyebrow, Heading, Description, CTAs, Disclaimer */}
        <div className="lg:col-span-6 space-y-5 text-left">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse" />
            <span>PRIVATE • VERIFIED • CONTROLLED</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.12]">
            One Identity.{' '}
            <span className="text-slate-700 block">Every Document.</span>
            <span className="text-brand-600 block">One Secure Profile.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
            Organize, associate and verify your identity documents through a single privacy-first identity layer with client-side isolation and consistency analytics.
          </p>

          {/* Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 transition-all shadow-sm hover:shadow-glow-sm hover:scale-[1.01]"
            >
              <span>Create Identity Profile</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300/80 shadow-subtle transition-all"
            >
              <span>Explore Demo</span>
            </Link>
          </div>

          {/* Small Disclaimer */}
          <p className="pt-1 text-[11px] text-slate-500 max-w-md leading-normal">
            Concept platform — not an official government document-linking service.
          </p>

        </div>

        {/* Right Column: Hero Identity Visualization */}
        <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
          <HeroIdentityVisual />
        </div>

      </div>
    </section>
  );
};
