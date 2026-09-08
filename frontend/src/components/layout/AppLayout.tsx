import React, { useState } from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { MobileDrawer } from './MobileDrawer';
import { ToastContainer } from '../common/Toast';
import { OnboardingModal } from './OnboardingModal';
import { 
  LayoutDashboard, 
  FolderLock, 
  CheckCircle2, 
  Share2, 
  Menu,
  ShieldAlert
} from 'lucide-react';

export const AppLayout: React.FC = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const location = useLocation();

  const mobileBottomNav = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Documents', href: '/documents', icon: FolderLock },
    { name: 'Verify', href: '/verification', icon: CheckCircle2 },
    { name: 'Share', href: '/sharing', icon: Share2 },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Top Navbar */}
        <TopNavbar onToggleMobileMenu={() => setMobileDrawerOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Sober Legal / Security Disclaimer Footer */}
        <footer className="border-t border-slate-200/70 py-4 px-6 text-center bg-white text-xs text-slate-400">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 justify-center">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              OneID is a conceptual identity verification platform. It does not create official government document linkages.
            </p>
            <p className="text-[11px] text-slate-400">
              Frontend Client Isolation • Masked Synthetic Data
            </p>
          </div>
        </footer>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-slate-200 flex items-center justify-around px-2 z-40">
        {mobileBottomNav.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-brand-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`
            }
          >
            <item.icon className="w-4 h-4 mb-0.5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-900"
        >
          <Menu className="w-4 h-4 mb-0.5" />
          <span>More</span>
        </button>
      </nav>

      {/* Global Interactive Overlays */}
      <ToastContainer />
      <OnboardingModal />
    </div>
  );
};
