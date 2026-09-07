import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIdentity } from '../context/IdentityContext';
import { Button } from '../components/common/Button';
import { Shield, ArrowRight, Lock, Mail, Sparkles, ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('abhijay.parashar@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const { login, loginDemo } = useIdentity();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(identifier, password);
    setLoading(false);
    navigate('/dashboard');
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    await loginDemo();
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm">
            <Shield className="w-5 h-5 text-brand-400" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            ONE<span className="text-brand-600">ID</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Sign in to your identity profile
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
          Enter your registered email or mobile to access your verified credentials.
        </p>
      </div>

      {/* Navigation to Main Dashboard / Front Landing UI */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-200/60"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go to Main Dashboard</span>
        </Link>
        <span className="text-[11px] font-medium text-slate-400">Front Landing UI</span>
      </div>

      {/* Card Form */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-card space-y-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email / Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@domain.com or +91 98765 43210"
                  className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 transition-all text-slate-800"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo notice: You can proceed using the demo or click Sign In directly.')}
                  className="text-xs text-brand-600 hover:text-brand-700 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 transition-all text-slate-800"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              isLoading={loading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider absolute">
              or
            </span>
          </div>

          {/* Quick Demo Access Button */}
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="w-full justify-center text-slate-800 border-slate-300"
            onClick={handleDemoSignIn}
            isLoading={loading}
            icon={<Sparkles className="w-4 h-4 text-brand-600" />}
          >
            Continue with Demo (Abhijay Parashar)
          </Button>

          <div className="text-center pt-2 text-xs text-slate-500">
            Don't have an identity profile?{' '}
            <Link to="/signup" className="text-brand-600 font-semibold hover:underline">
              Create Identity
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          OneID is a conceptual identity verification platform. No official government linkage is performed.
        </p>
      </div>
    </div>
  );
};
