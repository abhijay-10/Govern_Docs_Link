import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useIdentity } from '../context/IdentityContext';
import { Button } from '../components/common/Button';
import { 
  Shield, 
  ArrowRight, 
  Mail, 
  Sparkles, 
  ArrowLeft, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  RotateCw,
  Lock,
  UserX,
  UserCheck
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialEmail = queryParams.get('email') || 'parasharabhijay@gmail.com';

  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState(initialEmail);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [unregisteredError, setUnregisteredError] = useState<string | null>(null);
  const [identifiedUser, setIdentifiedUser] = useState<{ name: string; id: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { sendOtp, verifyOtp, loginDemo } = useIdentity();
  const navigate = useNavigate();

  // Timer countdown for active OTP
  useEffect(() => {
    if (step !== 'otp' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Step 1: Request Real-Time OTP for Registered Email
  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg(null);
    setUnregisteredError(null);
    setLoading(true);

    try {
      const res = await sendOtp(email, 'login');
      setLoading(false);
      setStep('otp');
      setTimeLeft(res.expires_in_seconds || 300);
      setOtpValues(['', '', '', '', '', '']);
      
      // Auto-identify registered profile details
      if (res.user_name || res.user_id) {
        setIdentifiedUser({
          name: res.user_name || 'Verified Citizen',
          id: res.user_id || 'usr_oneid_8921',
        });
      } else {
        setIdentifiedUser({
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
          id: 'usr_oneid_8921',
        });
      }

      // Focus first OTP input on next tick
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (err: any) {
      setLoading(false);
      if (err.notFound || (err.message && err.message.toLowerCase().includes('sign up'))) {
        setUnregisteredError(
          `No OneID profile is registered with "${email}". Because OneID manages sensitive sovereign identity records, you must create an identity profile first.`
        );
      } else {
        setErrorMsg(err.message || 'Failed to dispatch verification code. Please check that FastAPI backend is running.');
      }
    }
  };

  // Handle OTP digit input changes
  const handleOtpChange = (index: number, value: string) => {
    const cleanVal = value.replace(/\D/g, '');
    
    if (cleanVal.length > 1) {
      handleOtpPaste(cleanVal);
      return;
    }

    const newValues = [...otpValues];
    newValues[index] = cleanVal;
    setOtpValues(newValues);
    setErrorMsg(null);

    // Auto-advance to next input
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 digits are entered
    const fullOtp = newValues.join('');
    if (fullOtp.length === 6) {
      triggerVerify(fullOtp);
    }
  };

  // Handle keydown for backspace navigation
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste full OTP
  const handleOtpPaste = (pastedText: string) => {
    const digits = pastedText.replace(/\D/g, '').slice(0, 6).split('');
    if (digits.length === 0) return;

    const newValues = [...otpValues];
    digits.forEach((digit, i) => {
      if (i < 6) newValues[i] = digit;
    });
    setOtpValues(newValues);
    setErrorMsg(null);

    const focusIdx = Math.min(digits.length, 5);
    inputRefs.current[focusIdx]?.focus();

    if (digits.length === 6) {
      triggerVerify(digits.join(''));
    }
  };

  // Step 2: Verify OTP
  const triggerVerify = async (codeToVerify?: string) => {
    const otpCode = codeToVerify || otpValues.join('');
    if (otpCode.length < 6) {
      setErrorMsg('Please enter all 6 digits of the verification code sent to your email.');
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    try {
      await verifyOtp(email, otpCode, { mode: 'login' });
      setLoading(false);
      setSuccessMsg('MATCH ✓ — Identity Verified Successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 600);
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Incorrect verification code. Please check your inbox and try again.');
      setOtpValues(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    await loginDemo();
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-navy-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-brand-100 selection:text-brand-900">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105 border border-navy-800">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-navy-900">
            ONE<span className="text-brand-600">ID</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-navy-900 tracking-tight">
          {step === 'email' ? 'Sign in to OneID' : 'Identity Verification'}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          {step === 'email'
            ? 'Enter your registered email to access your sovereign identity profile.'
            : `A 6-digit verification code has been dispatched to your email.`}
        </p>
      </div>

      {/* Navigation Return Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 mt-4 mb-2 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing Page</span>
        </Link>
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
          <Lock className="w-3 h-3" />
          Zero-Knowledge Protection
        </span>
      </div>

      {/* Main Authentication Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-card space-y-6">
          
          {/* Unregistered User Notice Card */}
          {unregisteredError && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 space-y-3 animate-fade-in">
              <div className="flex items-start gap-2.5">
                <UserX className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-amber-900">Account Not Found</div>
                  <p className="mt-1 text-amber-800 leading-relaxed">{unregisteredError}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                <Link
                  to={`/signup?email=${encodeURIComponent(email)}`}
                  className="inline-flex items-center gap-1.5 font-bold text-xs text-white bg-brand-600 hover:bg-brand-700 px-3.5 py-1.5 rounded-lg shadow-sm transition-all"
                >
                  <span>Create Identity Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setUnregisteredError(null)}
                  className="text-xs text-amber-800 underline font-medium hover:text-amber-900"
                >
                  Try Another Email
                </button>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Verification Error:</span> {errorMsg}
              </div>
            </div>
          )}

          {/* Success Alert */}
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs font-bold text-emerald-800 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* STEP 1: EMAIL ENTRY */}
          {step === 'email' ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 transition-all text-navy-900"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center shadow-sm hover:shadow-glow-sm"
                isLoading={loading}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Continue with OneID
              </Button>

              <div className="pt-2 text-[11px] text-slate-400 text-center leading-relaxed">
                If registered, a real-time 6-digit OTP will be dispatched to your email.
              </div>
            </form>
          ) : (
            /* STEP 2: 6-DIGIT OTP ENTRY FOR RECOGNIZED REGISTERED PROFILE */
            <div className="space-y-5 animate-fade-in">
              
              {/* Recognized Identity Profile Card */}
              {identifiedUser && (
                <div className="p-3.5 bg-gradient-to-r from-blue-50/80 to-slate-50 border border-brand-200/70 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-navy-900 text-cyan-400 flex items-center justify-center font-bold shadow-sm">
                      <UserCheck className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
                        <span>{identifiedUser.name}</span>
                        <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-1.5 py-0.2 rounded">
                          Verified Profile
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                        ID: {identifiedUser.id} • {email}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setErrorMsg(null);
                      setIdentifiedUser(null);
                    }}
                    className="text-brand-600 hover:text-brand-700 font-bold text-[11px] underline"
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Sensitive Information Security Reminder */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Sensitive Credential Protection:</strong> Because your profile contains sovereign documents (Aadhaar, PAN, Passport), verification via OTP is mandatory for every sign-in.
                </span>
              </div>

              {/* 6 Individual Digit Inputs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 text-center">
                  Enter 6-Digit Email OTP
                </label>
                <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                  {otpValues.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={(e) => {
                        e.preventDefault();
                        handleOtpPaste(e.clipboardData.getData('text'));
                      }}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold font-mono text-navy-900 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30 focus:outline-none transition-all shadow-subtle bg-slate-50/50"
                    />
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <Button
                type="button"
                variant="primary"
                size="md"
                className="w-full justify-center shadow-sm hover:shadow-glow-sm"
                onClick={() => triggerVerify()}
                isLoading={loading}
                icon={<KeyRound className="w-4 h-4" />}
              >
                Verify & Access Profile
              </Button>

              {/* Timer and Resend Controls */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className={timeLeft < 60 ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                    Expires in {formatTimer(timeLeft)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRequestOtp()}
                  disabled={loading}
                  className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold transition-colors disabled:opacity-50"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Resend Code</span>
                </button>
              </div>

            </div>
          )}

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
            className="w-full justify-center text-navy-900 border-slate-300 hover:bg-slate-50"
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

        {/* Security Concept Disclaimer */}
        <p className="mt-6 text-center text-xs text-slate-400 max-w-sm mx-auto">
          OneID OTP verification hashes codes before storage. Raw OTPs are never stored in databases.
        </p>
      </div>
    </div>
  );
};
