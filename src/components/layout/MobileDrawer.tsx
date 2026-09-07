import React from 'react';
import { NavLink } from 'react-router-dom';
import { useIdentity } from '../../context/IdentityContext';
import {
  LayoutDashboard,
  UserCheck,
  FolderLock,
  CheckCircle2,
  GitFork,
  Share2,
  History,
  Settings,
  ShieldAlert,
  X,
  Shield,
  LogOut,
  HelpCircle,
} from 'lucide-react';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { user, logout, openOnboarding } = useIdentity();

  if (!isOpen) return null;

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Identity', href: '/identity', icon: UserCheck },
    { name: 'Documents', href: '/documents', icon: FolderLock },
    { name: 'Verification', href: '/verification', icon: CheckCircle2 },
    { name: 'Identity Graph', href: '/graph', icon: GitFork },
    { name: 'Secure Sharing', href: '/sharing', icon: Share2 },
    { name: 'Activity Log', href: '/activity', icon: History },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Privacy & Security', href: '/privacy', icon: ShieldAlert },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-200 p-5 flex flex-col justify-between shadow-2xl z-10 animate-fade-in">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">
                ONE<span className="text-brand-400">ID</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-5 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            ))}

            <button
              onClick={() => {
                onClose();
                openOnboarding();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <HelpCircle className="w-5 h-5 shrink-0" />
              <span>Onboarding Guide</span>
            </button>
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-emerald-400">{user.identityStatus}</p>
            </div>
            <button
              onClick={() => {
                onClose();
                logout();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
