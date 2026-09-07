import React, { useState } from 'react';
import { 
  Shield, 
  CreditCard, 
  FileText, 
  Vote, 
  Plane, 
  Car, 
  Sparkles,
  Info,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface GraphNode {
  id: string;
  name: string;
  type: string;
  status: 'Associated' | 'Not Added';
  lastChecked: string;
  confidence: string;
  details: string;
  x: number;
  y: number;
  icon: React.ComponentType<{ className?: string }>;
}

export const IdentityGraphSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const centerX = 380;
  const centerY = 240;

  const nodes: GraphNode[] = [
    {
      id: 'aadhaar',
      name: 'Aadhaar Card',
      type: 'UIDAI Sovereign Identity',
      status: 'Associated',
      lastChecked: 'Today, 10:14 AM',
      confidence: '99.1%',
      details: 'Biometric residence entry verified. Phonetic name concordance 99.8%.',
      x: 380,
      y: 70,
      icon: FileText,
    },
    {
      id: 'pan',
      name: 'PAN Card',
      type: 'Financial Identity (CBDT)',
      status: 'Associated',
      lastChecked: '2 days ago',
      confidence: '98.4%',
      details: 'Tax identification records coincide with electoral and resident profiles.',
      x: 610,
      y: 160,
      icon: CreditCard,
    },
    {
      id: 'voter',
      name: 'Voter ID',
      type: 'Electoral Identity (ECI)',
      status: 'Associated',
      lastChecked: 'Yesterday, 04:30 PM',
      confidence: '96.8%',
      details: 'Electoral register entry corroborates residential street coordinates.',
      x: 150,
      y: 160,
      icon: Vote,
    },
    {
      id: 'passport',
      name: 'Passport',
      type: 'Travel Document (MEA)',
      status: 'Not Added',
      lastChecked: 'Pending submission',
      confidence: '—',
      details: 'Travel document slot ready for zero-knowledge optical ingestion.',
      x: 210,
      y: 380,
      icon: Plane,
    },
    {
      id: 'dl',
      name: 'Driving Licence',
      type: 'Transport ID (MoRTH)',
      status: 'Not Added',
      lastChecked: 'Pending submission',
      confidence: '—',
      details: 'Transport authority license slot available for pairing.',
      x: 550,
      y: 380,
      icon: Car,
    },
  ];

  // Default to PAN if none hovered
  const activeNode = selectedNode || nodes[1];

  return (
    <section className="relative py-24 bg-navy-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-dot-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950 border border-brand-500/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Identity Graph
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            One profile.<br />
            <span className="text-cyan-400">Connected identity records.</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Hover over any document node to inspect cryptographic linkage state, confidence metrics, and freshness timestamps.
          </p>
        </div>

        {/* Graph Container */}
        <div className="relative bg-navy-900/90 rounded-3xl border border-slate-700/80 p-4 sm:p-8 backdrop-blur-md shadow-2xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* SVG Graph Canvas (8 cols on lg) */}
            <div className="lg:col-span-8 relative h-[380px] sm:h-[460px] flex items-center justify-center">
              <svg
                viewBox="0 0 760 480"
                className="w-full h-full select-none overflow-visible"
              >
                <defs>
                  <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#315EF6" />
                    <stop offset="100%" stopColor="#4EA7FF" />
                  </linearGradient>
                  <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Connection lines */}
                {nodes.map((node) => {
                  const isAssoc = node.status === 'Associated';
                  const isHovered = activeNode.id === node.id;

                  return (
                    <g key={`edge_${node.id}`}>
                      {/* Glow halo on hover or active */}
                      {isAssoc && (
                        <line
                          x1={centerX}
                          y1={centerY}
                          x2={node.x}
                          y2={node.y}
                          stroke="#315EF6"
                          strokeWidth={isHovered ? 6 : 3}
                          strokeOpacity={isHovered ? 0.6 : 0.25}
                        />
                      )}

                      {/* Main connection line */}
                      <line
                        x1={centerX}
                        y1={centerY}
                        x2={node.x}
                        y2={node.y}
                        stroke={isAssoc ? 'url(#activeGrad)' : '#334155'}
                        strokeWidth={isHovered ? 3 : isAssoc ? 2 : 1.2}
                        strokeDasharray={isAssoc ? 'none' : '5 5'}
                        strokeOpacity={isAssoc ? 0.9 : 0.4}
                      />

                      {/* Traveling animated particle */}
                      {isAssoc && (
                        <circle r={3.5} fill="#4EA7FF" filter="url(#nodeGlow)">
                          <animateMotion
                            path={`M ${centerX} ${centerY} L ${node.x} ${node.y}`}
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Central Identity Root Node (Abhijay Parashar) */}
                <g transform={`translate(${centerX}, ${centerY})`} className="cursor-pointer">
                  {/* Subtle pulsing outer ring */}
                  <circle r={58} fill="#315EF6" fillOpacity="0.12" className="animate-pulse" />
                  <circle r={50} fill="#0B1220" stroke="#315EF6" strokeWidth="2.5" />
                  
                  <foreignObject x="-20" y="-34" width="40" height="26">
                    <div className="w-full h-full flex items-center justify-center text-cyan-400">
                      <Shield className="w-5 h-5 drop-shadow-[0_0_8px_rgba(78,167,255,0.8)]" />
                    </div>
                  </foreignObject>

                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="800"
                  >
                    Abhijay Parashar
                  </text>
                  <text
                    x="0"
                    y="13"
                    textAnchor="middle"
                    fill="#94A3B8"
                    fontSize="8.5"
                    fontWeight="500"
                  >
                    Identity Profile
                  </text>
                  <text
                    x="0"
                    y="26"
                    textAnchor="middle"
                    fill="#4ADE80"
                    fontSize="8.5"
                    fontWeight="700"
                  >
                    97.8% Composite
                  </text>
                </g>

                {/* Peripheral Nodes */}
                {nodes.map((node) => {
                  const isAssoc = node.status === 'Associated';
                  const isHovered = activeNode.id === node.id;
                  const Icon = node.icon;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onMouseEnter={() => setSelectedNode(node)}
                      className="cursor-pointer transition-transform duration-200 hover:scale-110"
                    >
                      {/* Node circle */}
                      <circle
                        r={28}
                        fill={isAssoc ? '#101827' : '#0B1220'}
                        stroke={isHovered ? '#4EA7FF' : isAssoc ? '#315EF6' : '#334155'}
                        strokeWidth={isHovered ? 3 : isAssoc ? 2 : 1.2}
                        filter={isHovered ? 'url(#nodeGlow)' : undefined}
                      />

                      {/* Icon */}
                      <foreignObject x="-12" y="-12" width="24" height="24">
                        <div className={`w-full h-full flex items-center justify-center ${
                          isAssoc ? 'text-cyan-400' : 'text-slate-500'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </foreignObject>

                      {/* Status indicator */}
                      <circle
                        cx={18}
                        cy={-18}
                        r={5}
                        fill={isAssoc ? '#10B981' : '#64748B'}
                        stroke="#0B1220"
                        strokeWidth={1.5}
                      />

                      {/* Node Label */}
                      <text
                        x="0"
                        y={40}
                        textAnchor="middle"
                        fill={isAssoc ? '#FFFFFF' : '#94A3B8'}
                        fontSize="10"
                        fontWeight="700"
                      >
                        {node.name}
                      </text>

                      {/* Sub-label */}
                      <text
                        x="0"
                        y={51}
                        textAnchor="middle"
                        fill={isAssoc ? '#34D399' : '#64748B'}
                        fontSize="8.5"
                        fontWeight="600"
                      >
                        {isAssoc ? node.confidence : 'Not Linked'}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right Information Inspector Card (4 cols on lg) */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-navy-850 border border-slate-700/80 p-6 shadow-xl relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                    NODE INSPECTOR
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeNode.status === 'Associated'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {activeNode.status}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {activeNode.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {activeNode.type}
                  </p>
                </div>

                <div className="mt-5 space-y-3.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-navy-900 border border-slate-800">
                    <span className="text-slate-400">Confidence Score</span>
                    <span className="font-mono font-bold text-cyan-400">
                      {activeNode.confidence}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-navy-900 border border-slate-800">
                    <span className="text-slate-400">Last Verified</span>
                    <span className="font-mono text-slate-300">
                      {activeNode.lastChecked}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-navy-900/80 border border-slate-800 text-slate-300 text-xs leading-relaxed">
                    <div className="text-[10px] uppercase font-mono text-slate-400 mb-1">
                      Correlation Analysis
                    </div>
                    {activeNode.details}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Synthetic Node ID: {activeNode.id}</span>
                  <Link
                    to="/graph"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-400 hover:text-cyan-300"
                  >
                    <span>Full Graph</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
