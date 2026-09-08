import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useIdentity } from '../context/IdentityContext';
import { Button } from '../components/common/Button';
import { 
  Shield, 
  ArrowRight, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ArrowLeft,
  KeyRound,
  AlertCircle,
  Clock,
  RotateCw,
  Lock,
  UserCheck
} from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialEmail = queryParams.get('email') || '';

  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [mobile, setMobile] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [alreadyRegisteredError, setAlreadyRegisteredError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { sendOtp, verifyOtp } = useIdentity();
  const navigate = useNavigate();

  // Timer countdown for active OTP
  useEffect(() => {
    if (step !== 'verify' || timeLeft <= 0) return;
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

  // Step 1: Request OTP to verify email existence
  const handleInitiateSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMsg('Please agree to the Terms of Service and Privacy Policy to proceed.');
      return;
    }
    if (!name.trim()) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg(null);
    setAlreadyRegisteredError(null);
    setLoading(true);

    try {
      const res = await sendOtp(email.trim(), 'signup');
      setLoading(false);
      setStep('verify');
      setTimeLeft(res.expires_in_seconds || 300);
      setOtpValues(['', '', '', '', '', '']);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (err: any) {
      setLoading(false);
      if (err.registered || (err.message && err.message.toLowerCase().includes('already registered'))) {
        setAlreadyRegisteredError(
          `The email "${email}" is already associated with an existing OneID profile. Please sign in instead.`
        );
      } else {
        setErrorMsg(err.message || 'Failed to dispatch verification code. Please check that the backend is running.');
      }
    }
  };

  // Handle OTP digit changes
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

    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullOtp = newValues.join('');
    if (fullOtp.length === 6) {
      triggerVerifySignup(fullOtp);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
      triggerVerifySignup(digits.join(''));
    }
  };

  // Step 2: Confirm OTP & Create Account
  const triggerVerifySignup = async (codeToVerify?: string) => {
    const otpCode = codeToVerify || otpValues.join('');
    if (otpCode.length < 6) {
      setErrorMsg('Please enter all 6 digits of the verification code sent to your email.');
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    try {
      await verifyOtp(email.trim(), otpCode, {
        name: name.trim(),
        mobile: mobile.trim() || '+91 ••••• •••••',
        mode: 'signup',
      });
      setLoading(false);
      navigate('/dashboard');
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Incorrect verification code. Please check your inbox and try again.');
      setOtpValues(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
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
          {step === 'form' ? 'Create your identity profile' : 'Confirm Your Email'}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          {step === 'form'
            ? 'Establish a verified identity anchor with email confirmation.'
            : `We dispatched an OTP to verify that ${email} actually exists.`}
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
          Email Verified Anchor
        </span>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-card space-y-5">
          
          {/* Already Registered Alert */}
          {alreadyRegisteredError && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-3 animate-fade-in">
              <div className="flex items-start gap-2.5">
                <UserCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-brand-900">Profile Already Registered</div>
                  <p className="mt-1 text-slate-700 leading-relaxed">{alreadyRegisteredError}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-200/70 flex items-center justify-between">
                <Link
                  to={`/login?email=${encodeURIComponent(email)}`}
                  className="inline-flex items-center gap-1.5 font-bold text-xs text-white bg-brand-600 hover:bg-brand-700 px-3.5 py-1.5 rounded-lg shadow-sm transition-all"
                >
                  <span>Sign In with OTP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setAlreadyRegisteredError(null)}
                  className="text-xs text-slate-600 underline font-medium hover:text-slate-800"
                >
                  Change Email
                </button>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Registration Notice:</span> {errorMsg}
              </div>
            </div>
          )}

          {/* STEP 1: REGISTRATION INPUTS */}
          {step === 'form' ? (
            <form onSubmit={handleInitiateSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Legal Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Abhijay Parashar"
                    className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 transition-all text-navy-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address (Verification Code Destination)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 transition-all text-navy-900"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  An OTP will be dispatched to confirm this email actually exists.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 transition-all text-navy-900"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-brand-600 border-slate-300 focus:ring-brand-500"
                />
                <label htmlFor="terms" className="text-xs text-slate-600 leading-normal">
                  I agree to the Terms of Service and Privacy Policy. I understand OneID performs client-side verification and does not create official government linkages.
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center mt-2 shadow-sm hover:shadow-glow-sm"
                isLoading={loading}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Verify Email & Register
              </Button>
            </form>
          ) : (
            /* STEP 2: VERIFY EMAIL OTP */
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div>
                  <div className="font-bold text-navy-900">{name}</div>
                  <div className="text-slate-500 font-mono text-[11px] truncate max-w-[200px]">{email}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep('form');
                    setErrorMsg(null);
                  }}
                  className="text-brand-600 hover:text-brand-700 font-bold text-[11px] underline"
                >
                  Edit Details
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-[11px] text-blue-900 leading-relaxed flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                <span>
                  A 6-digit confirmation code was dispatched to <strong>{email}</strong> to verify this email actually belongs to you.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 text-center">
                  Enter 6-Digit Email Verification Code
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

              <Button
                type="button"
                variant="primary"
                size="md"
                className="w-full justify-center shadow-sm hover:shadow-glow-sm"
                onClick={() => triggerVerifySignup()}
                isLoading={loading}
                icon={<KeyRound className="w-4 h-4" />}
              >
                Confirm Email & Complete Setup
              </Button>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className={timeLeft < 60 ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                    Expires in {formatTimer(timeLeft)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleInitiateSignup({ preventDefault: () => {} } as any)}
                  disabled={loading}
                  className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold transition-colors disabled:opacity-50"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Resend Code</span>
                </button>
              </div>
            </div>
          )}

          <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-500">
            Already have an identity profile?{' '}
            <Link to="/login" className="text-brand-600 font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
