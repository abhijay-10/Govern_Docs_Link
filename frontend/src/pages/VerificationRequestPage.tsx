import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIdentity } from '../context/IdentityContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DocumentIcon } from '../components/identity/DocumentIcon';
import { 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  ArrowRight, 
  Clock, 
  FileCheck2,
  ShieldAlert,
  ArrowLeft 
} from 'lucide-react';

export const VerificationRequestPage: React.FC = () => {
  const { token } = useParams<{ token?: string }>();
  const { user } = useIdentity();

  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [isLoading, setIsLoading] = useState(false);

  const displayToken = token || '8F92KX';

  const handleApprove = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setStatus('approved');
  };

  const handleReject = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    setStatus('rejected');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
          </div>
          <span className="font-extrabold text-lg text-slate-900">
            ONE<span className="text-brand-600">ID</span>
          </span>
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Identity Verification Request
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Secure Receiver Verification Portal • Token <span className="font-mono font-bold text-slate-700">{displayToken}</span>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          {/* Request Header Banner */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-brand-50 text-brand-700 rounded-xl border border-brand-100">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Requested by</span>
                <h3 className="text-sm font-bold text-slate-900">Demo Organization</h3>
              </div>
            </div>

            <Badge variant="info" size="sm">
              Employment Verification
            </Badge>
          </div>

          {/* Pending State Review */}
          {status === 'pending' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Subject Candidate</span>
                  <span className="font-semibold text-slate-900">{user.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Access Expiry</span>
                  <span className="font-medium text-amber-700">In 23h 41m</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Requested Verification Scope</span>
                  <span className="font-medium text-slate-800">PAN & Aadhaar Consistency</span>
                </div>
              </div>

              {/* Authorized Documents Checklist */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                  Requested Credential Verification
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 bg-white">
                    <div className="flex items-center gap-2.5">
                      <DocumentIcon type="pan" size="sm" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        Permanent Account Number (PAN)
                      </span>
                    </div>
                    <Badge variant="success" size="sm" dot>
                      Ready
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 bg-white">
                    <div className="flex items-center gap-2.5">
                      <DocumentIcon type="aadhaar" size="sm" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        Aadhaar Card
                      </span>
                    </div>
                    <Badge variant="success" size="sm" dot>
                      Ready
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/60 flex items-start gap-2.5 text-xs text-blue-900 leading-relaxed">
                <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Minimal Exposure Guarantee:</strong> Approving this request will verify cryptographic consistency between PAN and Aadhaar without disclosing raw, unmasked document numbers.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleReject}
                  isLoading={isLoading}
                  icon={<XCircle className="w-4 h-4 text-rose-500" />}
                >
                  Reject
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleApprove}
                  isLoading={isLoading}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Approve & Verify
                </Button>
              </div>
            </div>
          )}

          {/* Approved Result State */}
          {status === 'approved' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-3 shadow-subtle">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Verification Complete
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Identity consistency successfully confirmed and signed for Demo Organization.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                  <span className="text-slate-600">Candidate Name Consistency</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 99.2% Matched
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                  <span className="text-slate-600">DOB Consistency</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Matched (2003)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                  <span className="text-slate-600">Document Association</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Valid
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-600">Overall Verification Confidence</span>
                  <span className="font-bold text-slate-900 text-sm">98.4%</span>
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-500 text-center">
                This verification session is cryptographically logged and will expire automatically in 23h 41m.
              </div>

              <div className="flex justify-center pt-2">
                <Link to="/dashboard">
                  <Button variant="secondary" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Rejected State */}
          {status === 'rejected' && (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto shadow-subtle">
                <XCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Verification Request Rejected
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Access to candidate credentials has been withheld. No identity attributes were disclosed to Demo Organization.
              </p>
              <div className="pt-2">
                <Link to="/dashboard">
                  <Button variant="secondary" size="sm">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          OneID is a conceptual identity verification platform. It does not create official government document linkages.
        </p>
      </div>
    </div>
  );
};
