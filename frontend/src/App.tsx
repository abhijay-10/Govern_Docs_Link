import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { IdentityProvider } from './context/IdentityContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { MyIdentityPage } from './pages/MyIdentityPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AddDocumentPage } from './pages/AddDocumentPage';
import { VerificationCenterPage } from './pages/VerificationCenterPage';
import { IdentityGraphPage } from './pages/IdentityGraphPage';
import { SecureSharingPage } from './pages/SecureSharingPage';
import { VerificationRequestPage } from './pages/VerificationRequestPage';
import { ActivityPage } from './pages/ActivityPage';
import { SettingsPage } from './pages/SettingsPage';
import { PrivacySecurityPage } from './pages/PrivacySecurityPage';

export const App: React.FC = () => {
  return (
    <IdentityProvider>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Verification Request / Receiver Portal */}
        <Route path="/verify/:token" element={<VerificationRequestPage />} />
        <Route path="/verify" element={<VerificationRequestPage />} />
        <Route path="/request" element={<VerificationRequestPage />} />

        {/* Authenticated Application Shell */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/identity" element={<MyIdentityPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/documents/add" element={<AddDocumentPage />} />
          <Route path="/verification" element={<VerificationCenterPage />} />
          <Route path="/graph" element={<IdentityGraphPage />} />
          <Route path="/sharing" element={<SecureSharingPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/privacy" element={<PrivacySecurityPage />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </IdentityProvider>
  );
};

export default App;
