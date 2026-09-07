import React from 'react';
import { PublicNavbar } from '../components/layout/PublicNavbar';
import { HeroSection } from '../components/hero/HeroSection';
import { TrustStrip } from '../components/sections/TrustStrip';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { SupportedIDsSection } from '../components/sections/SupportedIDsSection';
import { VerificationSection } from '../components/sections/VerificationSection';
import { IdentityGraphSection } from '../components/sections/IdentityGraphSection';
import { PrivacySection } from '../components/sections/PrivacySection';
import { SecureSharingSection } from '../components/sections/SecureSharingSection';
import { CtaSection } from '../components/sections/CtaSection';
import { PublicFooter } from '../components/layout/PublicFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FB] text-navy-900 flex flex-col selection:bg-brand-100 selection:text-brand-900">
      {/* 1. Semi-transparent Sticky Navbar */}
      <PublicNavbar />

      {/* 2. Hero Section (Compact Two-Column with Interactive Topology Visual) */}
      <HeroSection />

      {/* 3. Trust Strip (01 Privacy First, 02 User Controlled, 03 Verifiable) */}
      <TrustStrip />

      {/* 4. How It Works (Dark Navy Horizontal Pipeline) */}
      <HowItWorksSection />

      {/* 5. Supported Documents Grid */}
      <SupportedIDsSection />

      {/* 6. Identity Verification & Consistency Dashboard */}
      <VerificationSection />

      {/* 7. Interactive Identity Graph (Dark Navy Section) */}
      <IdentityGraphSection />

      {/* 8. Privacy Principles Section */}
      <PrivacySection />

      {/* 9. Secure Sharing & Dynamic QR Mockup */}
      <SecureSharingSection />

      {/* 10. Final Call To Action */}
      <CtaSection />

      {/* 11. Public Footer */}
      <PublicFooter />
    </div>
  );
};
