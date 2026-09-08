import React from 'react';
import { Shield, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center font-bold border border-navy-800 shadow-sm">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                ONE<span className="text-brand-500">ID</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              One identity. Multiple documents. One secure profile.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2.5 py-1 rounded-full font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Frontend Client Isolation Active
              </span>
            </div>
          </div>

          {/* Product Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/identity" className="hover:text-white transition-colors">
                  Identity
                </Link>
              </li>
              <li>
                <Link to="/documents" className="hover:text-white transition-colors">
                  Documents
                </Link>
              </li>
              <li>
                <Link to="/verification" className="hover:text-white transition-colors">
                  Verification
                </Link>
              </li>
              <li>
                <Link to="/sharing" className="hover:text-white transition-colors">
                  Secure Sharing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <Link to="/settings" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px] flex items-center gap-1.5 text-center sm:text-left max-w-2xl">
            <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 inline" />
            OneID is a conceptual identity verification platform and does not create official government document linkages.
          </p>

          <p className="text-slate-500 text-[11px] font-mono">
            © {new Date().getFullYear()} OneID Platform. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
