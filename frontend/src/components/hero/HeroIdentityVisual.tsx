import React, { useState } from 'react';
import { 
  Shield, 
  Check, 
  FileText, 
  CreditCard, 
  Vote, 
  Plane, 
  Car, 
  Lock
} from 'lucide-react';

interface NodeData {
  id: string;
  name: string;
  status: 'associated' | 'not_added';
  statusLabel: string;
  category: string;
  x: number;
  y: number;
  icon: React.ComponentType<{ className?: string }>;
  confidence?: string;
}

export const HeroIdentityVisual: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Layout coordinates in a 520x420 coordinate space
  const centerX = 260;
  const centerY = 210;

  const nodes: NodeData[] = [
    {
      id: 'aadhaar',
      name: 'Aadhaar',
      status: 'associated',
      statusLabel: 'Associated',
      category: 'Sovereign ID',
      x: 260,
      y: 50,
      icon: FileText,
      confidence: '99.1%',
    },
    {
      id: 'pan',
      name: 'PAN Card',
      status: 'associated',
      statusLabel: 'Associated',
      category: 'Financial',
      x: 420,
      y: 140,
      icon: CreditCard,
      confidence: '98.4%',
    },
    {
      id: 'voter',
      name: 'Voter ID',
      status: 'associated',
      statusLabel: 'Associated',
      category: 'Electoral',
      x: 100,
      y: 140,
      icon: Vote,
      confidence: '96.8%',
    },
    {
      id: 'passport',
      name: 'Passport',
      status: 'not_added',
      statusLabel: 'Not Added',
      category: 'Travel Document',
      x: 120,
      y: 335,
      icon: Plane,
    },
    {
      id: 'dl',
      name: 'Driving Licence',
      status: 'not_added',
      statusLabel: 'Not Added',
      category: 'Transport ID',
      x: 400,
      y: 335,
      icon: Car,
    },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto select-none">
      {/* Outer Glow Container */}
      <div className="relative rounded-2xl bg-gradient-to-b from-white/95 via-slate-50/90 to-blue-50/40 p-4 sm:p-6 border border-slate-200/90 shadow-card backdrop-blur-sm overflow-hidden">
        
        {/* Subtle background mesh grid */}
        <div 
          className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" 
        />
        
        {/* Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-44 h-44 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Strip */}
        <div className="relative flex items-center justify-between pb-3 border-b border-slate-200/70 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-navy-900 tracking-wide">
              IDENTITY TOPOLOGY
            </span>
            <span className="text-[10px] text-brand-600 bg-brand-50 border border-brand-200 px-1.5 py-0.5 rounded font-medium">
              Live Linkage
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Zero-Knowledge Masking</span>
          </div>
        </div>

        {/* SVG Visualization Canvas */}
        <div className="relative w-full h-[360px] sm:h-[400px] mt-1 flex items-center justify-center">
          <svg
            viewBox="0 0 520 420"
            className="w-full h-full overflow-visible"
          >
            <defs>
              {/* Radial gradient for glowing lines */}
              <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#315EF6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#4EA7FF" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="lineGradHover" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#315EF6" stopOpacity="1" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
              </linearGradient>
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connecting Lines */}
            {nodes.map((node) => {
              const isAssociated = node.status === 'associated';
              const isHovered = hoveredNode === node.id;

              return (
                <g key={`conn_${node.id}`}>
                  {/* Subtle wider glow path for associated nodes */}
                  {isAssociated && (
                    <line
                      x1={centerX}
                      y1={centerY}
                      x2={node.x}
                      y2={node.y}
                      stroke="#4EA7FF"
                      strokeWidth={isHovered ? 6 : 3.5}
                      strokeOpacity={isHovered ? 0.35 : 0.15}
                      strokeLinecap="round"
                    />
                  )}

                  {/* Primary Connection Line */}
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={node.x}
                    y2={node.y}
                    stroke={
                      isHovered
                        ? 'url(#lineGradHover)'
                        : isAssociated
                        ? 'url(#lineGradActive)'
                        : '#CBD5E1'
                    }
                    strokeWidth={isHovered ? 2.5 : isAssociated ? 2 : 1.2}
                    strokeDasharray={isAssociated ? 'none' : '4 4'}
                    strokeOpacity={isAssociated ? 0.85 : 0.55}
                    strokeLinecap="round"
                  />

                  {/* Animated Traveling Packet Dots */}
                  {isAssociated && (
                    <circle r={3.5} fill="#315EF6" filter="url(#glowEffect)">
                      <animateMotion
                        path={`M ${node.x} ${node.y} L ${centerX} ${centerY}`}
                        dur={`${node.id === 'pan' ? '2.4s' : node.id === 'voter' ? '2.8s' : '2s'}`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Central ONEID Node (The Anchor Shield) */}
            <g
              transform={`translate(${centerX}, ${centerY})`}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              {/* Outer Pulsing Aura */}
              <circle
                r={56}
                fill="#315EF6"
                fillOpacity="0.08"
                className="animate-pulse"
              />
              <circle
                r={50}
                fill="#FFFFFF"
                stroke="#315EF6"
                strokeWidth="2.5"
                className="shadow-lg"
              />
              <circle
                r={44}
                fill="#0B1220"
              />

              {/* Shield Icon in Center */}
              <foreignObject x="-24" y="-36" width="48" height="28">
                <div className="flex items-center justify-center w-full h-full text-cyan-400">
                  <Shield className="w-5 h-5 drop-shadow-[0_0_8px_rgba(78,167,255,0.6)]" />
                </div>
              </foreignObject>

              {/* Central Text Labels */}
              <text
                x="0"
                y="-2"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="800"
                letterSpacing="0.08em"
              >
                ONEID
              </text>
              <text
                x="0"
                y="11"
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="8"
                fontWeight="500"
              >
                Identity Profile
              </text>
              <text
                x="0"
                y="24"
                textAnchor="middle"
                fill="#4ADE80"
                fontSize="8.5"
                fontWeight="700"
              >
                Strong Match • 97.8%
              </text>
            </g>

            {/* Satellite Document Nodes */}
            {nodes.map((node) => {
              const isAssociated = node.status === 'associated';
              const isHovered = hoveredNode === node.id;
              const Icon = node.icon;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer transition-transform duration-200"
                >
                  {/* Subtle Node Backdrop */}
                  <circle
                    r={26}
                    fill={isAssociated ? '#FFFFFF' : '#F8FAFC'}
                    stroke={
                      isHovered
                        ? '#315EF6'
                        : isAssociated
                        ? '#2563EB'
                        : '#CBD5E1'
                    }
                    strokeWidth={isHovered ? 2.5 : isAssociated ? 2 : 1.2}
                    className="drop-shadow-sm transition-all"
                  />

                  {/* Icon */}
                  <foreignObject x="-12" y="-12" width="24" height="24">
                    <div className={`flex items-center justify-center w-full h-full ${
                      isAssociated ? 'text-brand-600' : 'text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </foreignObject>

                  {/* Status Indicator Pip */}
                  <circle
                    cx={18}
                    cy={-16}
                    r={5.5}
                    fill={isAssociated ? '#10B981' : '#94A3B8'}
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                  />

                  {/* Node Label Text */}
                  <text
                    x="0"
                    y={36}
                    textAnchor="middle"
                    fill={isAssociated ? '#0B1220' : '#64748B'}
                    fontSize="10"
                    fontWeight="700"
                  >
                    {node.name}
                  </text>

                  {/* Status Badge Text */}
                  <text
                    x="0"
                    y={47}
                    textAnchor="middle"
                    fill={isAssociated ? '#059669' : '#94A3B8'}
                    fontSize="8"
                    fontWeight="600"
                  >
                    {isAssociated ? '✓ Associated' : 'Not Added'}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Bottom Micro-Badge Matrix */}
        <div className="relative pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1 text-emerald-700 font-medium">
            <Check className="w-3.5 h-3.5" />
            <span>3 Active Sovereign Credentials</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            Profile: usr_oneid_8921
          </div>
        </div>

      </div>
    </div>
  );
};
