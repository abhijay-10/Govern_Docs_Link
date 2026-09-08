import React, { useState } from 'react';
import { useIdentity } from '../../context/IdentityContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { 
  UserCheck, 
  FolderPlus, 
  FileCheck2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, closeOnboarding } = useIdentity();
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  if (!isOnboardingOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'Create your identity profile',
      description: 'Your identity profile is the central cryptographically protected anchor that represents your unified identity attributes across all connected credentials.',
      icon: <UserCheck className="w-8 h-8 text-brand-600" />,
      actionText: 'Review Profile',
      actionRoute: '/identity',
      highlight: 'Attribute consistency scoring begins with your primary name and verified date of birth.',
    },
    {
      step: 2,
      title: 'Add your identity documents',
      description: 'Associate government credentials such as Aadhaar, PAN, Voter ID, and Passport. Documents are isolated in encrypted client storage with synthetic masks.',
      icon: <FolderPlus className="w-8 h-8 text-brand-600" />,
      actionText: 'Upload Document',
      actionRoute: '/documents/add',
      highlight: 'Optical character extraction scans and parses structural fields without saving raw numbers.',
    },
    {
      step: 3,
      title: 'Verify document consistency',
      description: 'Our automated matrix cross-compares names, dates of birth, and residency records across pairs of documents to calculate verification confidence.',
      icon: <FileCheck2 className="w-8 h-8 text-brand-600" />,
      actionText: 'Open Verification Center',
      actionRoute: '/verification',
      highlight: 'Pairwise consistency checks highlight matches and phonetic similarities without official linkage claims.',
    },
    {
      step: 4,
      title: 'Control who can access your information',
      description: 'Generate time-gated verification tokens and custom QR passes. Set expiry windows from 15 minutes to 7 days and revoke access anytime with one click.',
      icon: <ShieldCheck className="w-8 h-8 text-brand-600" />,
      actionText: 'Generate Share Link',
      actionRoute: '/sharing',
      highlight: 'Audited third-party verification requests allow employers and banks to check consistency without raw doc copies.',
    },
  ];

  const active = steps[currentStep - 1];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      closeOnboarding();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleJump = (route: string) => {
    closeOnboarding();
    navigate(route);
  };

  return (
    <Modal isOpen={isOnboardingOpen} onClose={closeOnboarding} maxWidth="lg">
      <div className="space-y-6">
        {/* Progress header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100">
              Step {currentStep} of 4
            </span>
            <span className="text-xs font-medium text-slate-500">Guided Walkthrough</span>
          </div>

          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentStep
                    ? 'w-6 bg-brand-600'
                    : i < currentStep
                    ? 'w-3 bg-emerald-500'
                    : 'w-3 bg-slate-200'
                }`}
                aria-label={`Go to step ${i}`}
              />
            ))}
          </div>
        </div>

        {/* Step Graphic & Text */}
        <div className="text-center py-2">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center mx-auto mb-4 shadow-subtle">
            {active.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">{active.title}</h3>
          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {active.description}
          </p>
        </div>

        {/* Informational Callout */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{active.highlight}</span>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={currentStep === 1}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleJump(active.actionRoute)}
            >
              {active.actionText}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleNext}
              icon={currentStep < 4 ? <ArrowRight className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            >
              {currentStep < 4 ? 'Next Step' : 'Finish Tour'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
