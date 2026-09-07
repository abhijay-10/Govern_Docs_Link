import React, { useState } from 'react';
import { useIdentity } from '../context/IdentityContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  User, 
  Shield, 
  Lock, 
  Bell, 
  Smartphone, 
  Key, 
  Eye, 
  Trash2, 
  Save, 
  CheckCircle2, 
  Laptop, 
  Clock 
} from 'lucide-react';

type SettingsTab = 'profile' | 'security' | 'privacy' | 'preferences';

export const SettingsPage: React.FC = () => {
  const { user, preferences, updatePreferences, addToast } = useIdentity();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  // Form states
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);

  const [twoFactor, setTwoFactor] = useState(preferences.twoFactorAuth);
  const [loginAlerts, setLoginAlerts] = useState(preferences.loginAlerts);
  const [consent, setConsent] = useState(preferences.consentManagement);
  const [visibility, setVisibility] = useState(preferences.documentVisibility);
  const [notifications, setNotifications] = useState(preferences.emailNotifications);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Profile Updated', 'Your identity anchor name and contacts were saved.', 'success');
  };

  const handleSaveSecurity = () => {
    updatePreferences({ twoFactorAuth: twoFactor, loginAlerts });
  };

  const handleSavePrivacy = () => {
    updatePreferences({ consentManagement: consent, documentVisibility: visibility });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure identity parameters, multi-factor security, and privacy access policies.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-6 overflow-x-auto">
        {[
          { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
          { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
          { id: 'privacy', label: 'Privacy & Retention', icon: <Lock className="w-4 h-4" /> },
          { id: 'preferences', label: 'Preferences', icon: <Bell className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`pb-3.5 text-xs sm:text-sm font-semibold transition-colors relative flex items-center gap-2 whitespace-nowrap ${
                isActive ? 'text-brand-950 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.icon}
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-950 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">Personal Information</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Primary profile attributes used for document optical matching.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Legal Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Mobile Number
              </label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 text-slate-800 font-mono"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="sm" icon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Security */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900">Authentication & Access</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-factor mechanisms protecting your profile and verification shares.
              </p>
            </div>

            <div className="space-y-5 divide-y divide-slate-100">
              {/* 2FA */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Two-Factor Authentication</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Require cryptographic authenticator passkey on every profile access.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="w-5 h-5 rounded text-brand-600 border-slate-300 focus:ring-brand-500 cursor-pointer"
                />
              </div>

              {/* Login Alerts */}
              <div className="flex items-center justify-between pt-5">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Unrecognized Device Alerts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Receive instant security notices when new browser fingerprints appear.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={loginAlerts}
                  onChange={(e) => setLoginAlerts(e.target.checked)}
                  className="w-5 h-5 rounded text-brand-600 border-slate-300 focus:ring-brand-500 cursor-pointer"
                />
              </div>

              {/* Password */}
              <div className="pt-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Master Password</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Last updated 42 days ago • High entropy salt
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => addToast('Password Dialog', 'Password reset email triggered.', 'info')}
                >
                  Change Password
                </Button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveSecurity}
                icon={<Save className="w-4 h-4" />}
              >
                Save Security Settings
              </Button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Active Authenticated Sessions</h3>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-slate-600" />
                <div>
                  <span className="text-xs font-semibold text-slate-900">Chrome 124 (macOS Sonoma)</span>
                  <p className="text-[11px] text-slate-400">Mumbai, India • Current Active Session</p>
                </div>
              </div>
              <Badge variant="success" size="sm" dot>Current</Badge>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Privacy */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">Privacy & Consent Management</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Control third-party access rights and automated data expiration.
            </p>
          </div>

          <div className="space-y-5 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Strict Consent Enforcement</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Require manual click authorization for all incoming receiver verification requests.
                </p>
              </div>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-5 h-5 rounded text-brand-600 border-slate-300 focus:ring-brand-500 cursor-pointer"
              />
            </div>

            <div className="pt-5">
              <h4 className="text-sm font-semibold text-slate-900 mb-1">Document Visibility Mode</h4>
              <p className="text-xs text-slate-500 mb-3">
                Dictates how much metadata is visible when a verified receiver inspects your link.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'strict', label: 'Strict Masking', desc: 'Exposes only pass/fail consistency metrics' },
                  { id: 'selective', label: 'Selective Reveal', desc: 'Exposes name, year, and issuer title' },
                  { id: 'open', label: 'Full Heuristic', desc: 'Includes cross-character distance stats' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setVisibility(mode.id as any)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      visibility === mode.id
                        ? 'border-brand-600 bg-brand-50/50 text-slate-900 font-semibold'
                        : 'border-slate-200 text-slate-600 bg-white'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">{mode.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-5 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Audit Log Retention Policy</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Purge expired share tokens and inspection footprints after 90 days.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-lg text-slate-700">
                90 Days
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleSavePrivacy}
              icon={<Save className="w-4 h-4" />}
            >
              Update Privacy Preferences
            </Button>
          </div>
        </div>
      )}

      {/* TAB 4: Preferences */}
      {activeTab === 'preferences' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">Notification Preferences</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage delivery channels for security notices and token expiration alerts.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Email Notifications</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Receive email when a verification link is accessed or expires.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 rounded text-brand-600 border-slate-300 focus:ring-brand-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                updatePreferences({ emailNotifications: notifications });
              }}
              icon={<Save className="w-4 h-4" />}
            >
              Save Preferences
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
