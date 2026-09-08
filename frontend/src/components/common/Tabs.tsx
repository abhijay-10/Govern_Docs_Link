import React from 'react';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  variant?: 'underline' | 'pills';
  className?: string;
}

export function Tabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
  className = '',
}: TabsProps<T>) {
  if (variant === 'underline') {
    return (
      <div className={`flex border-b border-slate-200 gap-6 overflow-x-auto no-scrollbar ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 ${
                isActive ? 'text-brand-950 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-slate-100 text-slate-800' : 'bg-slate-50 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-950 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`inline-flex p-1 bg-slate-100/90 rounded-xl gap-1 overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
              isActive
                ? 'bg-white text-slate-900 shadow-subtle'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-slate-100 text-slate-700' : 'bg-slate-200/60 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
