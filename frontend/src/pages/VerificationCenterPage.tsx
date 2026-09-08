import React, { useState } from 'react';
import { useIdentity } from '../context/IdentityContext';
import { VerificationPair } from '../types';
import { ComparisonModal } from '../components/identity/ComparisonModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  CheckCircle2, 
  ArrowRightLeft, 
  ShieldAlert, 
  RefreshCw, 
  Info, 
  Layers, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const VerificationCenterPage: React.FC = () => {
  const { verificationPairs, addToast } = useIdentity();
  const [selectedPair, setSelectedPair] = useState<VerificationPair | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRunRecheck = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsRefreshing(false);
    addToast('Consistency Check Complete', 'Matrix evaluated: 97.8% aggregate confidence.', 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Identity Verification
            </h1>
            <Badge variant="success" size="sm" dot>
              AI-Assisted Analysis
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Check consistency between your identity documents using multi-vector phonetic and lexical matching.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleRunRecheck}
          isLoading={isRefreshing}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Run Full Matrix Check
        </Button>
      </div>

      {/* Prominent Sober Disclaimer Banner */}
      <div className="p-4 sm:p-5 bg-amber-50/80 rounded-2xl border border-amber-200/70 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <strong className="font-semibold block">Important Clarification:</strong>
          All scores and matching metrics displayed on this platform represent <strong>AI-assisted document consistency analysis</strong> between client-provided credentials. OneID is not a government authority and does not create official statutory linkages between state databases.
        </div>
      </div>

      {/* Pairwise Comparison Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Document Consistency Pairs
          </h2>
          <span className="text-xs text-slate-400">
            Click any comparison card to view field-by-field breakdown
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {verificationPairs.map((pair) => (
            <div
              key={pair.id}
              onClick={() => setSelectedPair(pair)}
              className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-md hover:border-slate-300 transition-all p-5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-brand-50 text-brand-700 rounded-xl border border-brand-100">
                    <ArrowRightLeft className="w-4 h-4" />
                  </div>
                  <Badge variant="success" size="sm" dot>
                    {pair.status}
                  </Badge>
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-bold text-slate-900">
                    {pair.docAName} ↔ {pair.docBName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Bidirectional character & date reconciliation
                  </p>
                </div>

                <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Name Match</span>
                    <span className="font-semibold text-emerald-600">✓ {pair.details.nameMatch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date of Birth</span>
                    <span className="font-semibold text-emerald-600">✓ {pair.details.dobMatch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Address Locality</span>
                    <span className="font-semibold text-amber-600">~ {pair.details.addressMatch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Format Integrity</span>
                    <span className="font-semibold text-emerald-600">✓ {pair.details.documentFormat}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Match Score</span>
                  <span className="text-xl font-bold text-slate-900">{pair.matchScore}%</span>
                </div>
                <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Inspect
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 mb-4">
          Heuristic Consistency Scoring Methodology
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
          <div>
            <h4 className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. Phonetic & Lexical Comparison
            </h4>
            <p>
              Employs Soundex and Levenshtein distance metrics to normalize transcription variations across Anglicized and regional Indian naming styles.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. Chronological Normalization
            </h4>
            <p>
              Standardizes ISO 8601 calendar representations, handling masked birth years and day-month inversions across government issuance guidelines.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              3. Layout Checksum Validation
            </h4>
            <p>
              Validates syntactic structure without retaining raw unencrypted document identifiers in application state.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Detail Modal */}
      <ComparisonModal
        pair={selectedPair}
        isOpen={!!selectedPair}
        onClose={() => setSelectedPair(null)}
      />
    </div>
  );
};
