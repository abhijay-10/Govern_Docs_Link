import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'brand' | 'emerald' | 'amber' | 'slate';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  color = 'brand',
  size = 'sm',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colorStyles = {
    brand: 'bg-brand-600',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-500',
    slate: 'bg-slate-700',
  };

  const sizeStyles = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-3',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {showValue && <span className="font-semibold text-slate-900">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colorStyles[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
