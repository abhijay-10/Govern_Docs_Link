import React from 'react';
import { Link } from 'react-router-dom';
import { useIdentity } from '../context/IdentityContext';
import { CircularScore } from '../components/identity/CircularScore';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { DocumentIcon } from '../components/identity/DocumentIcon';
import { 
  UserCheck, 
  Calendar, 
  Mail, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ShieldAlert, 
  Lock, 
  Key 
} from 'lucide-react';

export const MyIdentityPage: React.FC = () => {
  const { user, documents } = useIdentity();

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Identity
          </h1>
          <Badge variant="success" size="sm" dot>
            Unified Anchor
          </Badge>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Consolidated identity profile derived from verified attributes across associated credentials.
        </p>
      </div>

      {/* Main Identity Profile Hero Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-950 text-white flex items-center justify-center font-bold text-xl shadow-md">
              AP
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {user.name}
                </h2>
                <Badge variant="success" size="sm" dot>
                  {user.identityStatus}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Profile ID: <span className="font-mono">{user.id}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/documents/add">
              <Button size="sm" variant="primary">
                Add Credential
              </Button>
            </Link>
            <Link to="/sharing">
              <Button size="sm" variant="secondary">
                Share Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Profile Attribute Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <UserCheck className="w-4 h-4 text-brand-600" />
              Full Name
            </div>
            <span className="text-sm font-semibold text-slate-800 font-mono">
              {user.name}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <Calendar className="w-4 h-4 text-brand-600" />
              Date of Birth
            </div>
            <span className="text-sm font-semibold text-slate-800 font-mono">
              {user.dobMasked}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <Mail className="w-4 h-4 text-brand-600" />
              Email
            </div>
            <span className="text-sm font-semibold text-slate-800 truncate block">
              {user.email}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <Phone className="w-4 h-4 text-brand-600" />
              Mobile Number
            </div>
            <span className="text-sm font-semibold text-slate-800 font-mono">
              {user.mobile}
            </span>
          </div>
        </div>
      </div>

      {/* Consistency Score & Attribute Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Circular Progress Gauge */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            AI Consistency Confidence
          </span>

          <div className="my-4">
            <CircularScore
              score={user.overallConfidence}
              size={190}
              label="Overall Consistency"
              sublabel={user.identityStatus}
            />
          </div>

          <div className="mt-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 leading-relaxed max-w-xs">
            <span className="font-semibold block">Sovereign Attribute Reconciliation</span>
            97.8% phonetic, chronological, and format alignment across 3 associated documents.
          </div>
        </div>

        {/* Attribute Breakdown Bars */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Consistency Breakdown
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Weight-adjusted scores across individual identity vectors.
                </p>
              </div>
              <Badge variant="success" size="sm" dot>
                Normalized
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700">Name Consistency</span>
                  <span className="font-semibold text-slate-900">
                    {user.consistencyBreakdown.name}%
                  </span>
                </div>
                <ProgressBar
                  value={user.consistencyBreakdown.name}
                  color="brand"
                  size="sm"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Identical lexical character stream across Aadhaar, PAN, and Voter ID.
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700">Date of Birth</span>
                  <span className="font-semibold text-slate-900">
                    {user.consistencyBreakdown.dob}%
                  </span>
                </div>
                <ProgressBar
                  value={user.consistencyBreakdown.dob}
                  color="emerald"
                  size="sm"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  100% calendar concordance with year of birth (2003).
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700">Address Consistency</span>
                  <span className="font-semibold text-slate-900">
                    {user.consistencyBreakdown.address}%
                  </span>
                </div>
                <ProgressBar
                  value={user.consistencyBreakdown.address}
                  color="amber"
                  size="sm"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  96% string similarity index between Aadhaar and Voter ID electoral district.
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700">Document Consistency</span>
                  <span className="font-semibold text-slate-900">
                    {user.consistencyBreakdown.document}%
                  </span>
                </div>
                <ProgressBar
                  value={user.consistencyBreakdown.document}
                  color="brand"
                  size="sm"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Issuing format checksums validated against statutory guidelines.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Mathematical Confidence Model v2.4</span>
            <Link to="/verification" className="text-brand-600 font-semibold hover:underline">
              Inspect Verification Matrix →
            </Link>
          </div>
        </div>
      </div>

      {/* Associated Documents Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Associated Documents
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Credentials participating in this profile's unified identity graph.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600">
            {documents.filter((d) => d.status === 'associated').length} Connected
          </span>
        </div>

        <div className="mt-4 divide-y divide-slate-100">
          {documents.map((doc) => {
            const isAssociated = doc.status === 'associated';
            return (
              <div
                key={doc.id}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <DocumentIcon type={doc.type} size="md" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {doc.maskedNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isAssociated ? (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Associated</span>
                    </div>
                  ) : (
                    <Link to={`/documents/add?type=${doc.type}`}>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors">
                        <Circle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Not Added</span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sober Notice */}
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Privacy and Integrity Disclaimer:</strong> OneID maintains synthetic masks for all primary keys. Your documents remain isolated, and cross-consistency scores reflect heuristic verification without performing statutory database synchronization.
        </p>
      </div>
    </div>
  );
};
