import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Menu, X } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-2.5'
          : 'bg-white/60 backdrop-blur-sm border-b border-slate-200/50 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: OneID Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105 border border-navy-800">
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-center">
            <span className="font-extrabold text-base tracking-tight text-navy-900">
              ONE<span className="text-brand-600">ID</span>
            </span>
            <span className="ml-2 text-[10px] font-semibold text-brand-600 bg-brand-50 border border-brand-200/60 px-1.5 py-0.5 rounded tracking-wide uppercase">
              Identity
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-slate-600">
          <a
            href="#how-it-works"
            className="hover:text-brand-600 transition-colors py-1 hover:border-b hover:border-brand-600"
          >
            How It Works
          </a>
          <a
            href="#identity"
            className="hover:text-brand-600 transition-colors py-1 hover:border-b hover:border-brand-600"
          >
            Identity
          </a>
          <a
            href="#verification"
            className="hover:text-brand-600 transition-colors py-1 hover:border-b hover:border-brand-600"
          >
            Verification
          </a>
          <a
            href="#privacy"
            className="hover:text-brand-600 transition-colors py-1 hover:border-b hover:border-brand-600"
          >
            Privacy
          </a>
        </nav>

        {/* Right: Sign In & Explore Demo */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-700 hover:text-navy-900 px-3 py-2 rounded-lg transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-all shadow-sm hover:shadow-glow-sm"
          >
            <span>Explore Demo</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 border-b border-slate-200 bg-white/95 backdrop-blur-lg">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-700">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-slate-50"
            >
              How It Works
            </a>
            <a
              href="#identity"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-slate-50"
            >
              Identity
            </a>
            <a
              href="#verification"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-slate-50"
            >
              Verification
            </a>
            <a
              href="#privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-slate-50"
            >
              Privacy
            </a>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-xs font-semibold text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-xs font-semibold text-white bg-brand-600 rounded-lg shadow-sm"
              >
                Explore Demo →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

