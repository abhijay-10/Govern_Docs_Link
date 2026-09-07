import React from 'react';

export interface CircularScoreProps {
  score: number; // e.g. 97.8
  size?: number; // width/height in px
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export const CircularScore: React.FC<CircularScoreProps> = ({
  score = 97.8,
  size = 180,
  strokeWidth = 14,
  label = 'Consistency Score',
  sublabel = 'Strong Match',
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />

        {/* Active Animated Score Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center Text Indicator */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          {score.toFixed(1)}%
        </span>
        {sublabel && (
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mt-0.5">
            {sublabel}
          </span>
        )}
        {label && (
          <span className="text-[11px] text-slate-400 mt-1 max-w-[110px]">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
