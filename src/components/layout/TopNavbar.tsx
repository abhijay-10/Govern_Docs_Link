import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIdentity } from '../../context/IdentityContext';
import { Button } from '../common/Button';
import { 
  Search, 
  Plus, 
  Bell, 
  ShieldCheck, 
  Menu, 
  ExternalLink,
  CheckCircle2,
  Lock
} from 'lucide-react';

export interface TopNavbarProps {
  onToggleMobileMenu?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onToggleMobileMenu }) => {
  const { user, activityEvents } = useIdentity();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left Search / Mobile Toggle */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents, verification pairs, logs..."
            className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 transition-all text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Security status badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-full text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Client Isolation: Active</span>
        </div>

        {/* Quick Add Button */}
        <Link to="/documents/add">
          <Button
            size="sm"
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            className="hidden sm:inline-flex"
          >
            Add Document
          </Button>
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-modal p-4 z-30 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-800">Security Notifications</span>
                <span className="text-[11px] text-brand-600 font-medium">Mark read</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {activityEvents.slice(0, 3).map((act) => (
                  <div key={act.id} className="py-2.5 first:pt-2 last:pb-0">
                    <p className="text-xs font-medium text-slate-800 leading-snug">{act.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{act.timeAgo} • {act.location}</p>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-slate-100 text-center">
                <Link
                  to="/activity"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-medium text-brand-600 hover:text-brand-800"
                >
                  View full security audit trail →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Pill / Avatar */}
        <Link to="/settings" className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold text-xs border border-slate-800">
            AP
          </div>
        </Link>
      </div>
    </header>
  );
};
