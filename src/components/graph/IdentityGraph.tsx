import React, { useState } from 'react';
import { useIdentity } from '../../context/IdentityContext';
import { IdentityDocument, DocumentType } from '../../types';
import { DocumentIcon } from '../identity/DocumentIcon';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Plus, 
  Sparkles, 
  Info, 
  Layers,
  X 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const IdentityGraph: React.FC = () => {
  const { user, documents } = useIdentity();
  const [selectedNode, setSelectedNode] = useState<{
    type: 'center' | DocumentType;
    document?: IdentityDocument;
  } | null>({ type: 'center' });

  // Node positions in standard 800x480 coordinate space
  const centerX = 400;
  const centerY = 240;

  const nodeCoordinates: Record<DocumentType, { x: number; y: number; label: string }> = {
    aadhaar: { x: 400, y: 80, label: 'Aadhaar' },
    pan: { x: 620, y: 160, label: 'PAN' },
    driving_licence: { x: 560, y: 380, label: 'Driving Licence' },
    passport: { x: 240, y: 380, label: 'Passport' },
    voter_id: { x: 180, y: 160, label: 'Voter ID' },
    other: { x: 400, y: 420, label: 'Other' },
  };

  const getNodeData = (type: DocumentType) => {
    return documents.find((d) => d.type === type);
  };

  const handleNodeClick = (type: DocumentType) => {
    const doc = getNodeData(type);
    setSelectedNode({ type, document: doc });
  };

  const handleCenterClick = () => {
    setSelectedNode({ type: 'center' });
  };

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
      {/* Visual Canvas Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">
              Identity Association Topology
            </h3>
            <span className="text-[11px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium border border-brand-100">
              Cryptographic Cross-Links
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive multi-document graph showing consistency paths to the primary profile.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Associated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span>Not Added</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[460px] bg-gradient-to-b from-slate-50/30 to-white flex items-center justify-center p-4">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(#94A3B8 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <svg
          viewBox="0 0 800 480"
          className="w-full h-full max-w-3xl select-none"
        >
          {/* Connection Lines */}
          {Object.entries(nodeCoordinates).map(([type, coord]) => {
            const doc = getNodeData(type as DocumentType);
            const isAssociated = doc?.status === 'associated';

            return (
              <g key={`line_${type}`}>
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={coord.x}
                  y2={coord.y}
                  stroke={isAssociated ? '#2563EB' : '#CBD5E1'}
                  strokeWidth={isAssociated ? 2.5 : 1.5}
                  strokeDasharray={isAssociated ? 'none' : '4 4'}
                  strokeOpacity={isAssociated ? 0.75 : 0.6}
                />

                {/* Animated pulse packet traveling along active lines */}
                {isAssociated && (
                  <circle
                    r={3.5}
                    fill="#10B981"
                    className="animate-subtle-pulse"
                  >
                    <animateMotion
                      path={`M ${centerX} ${centerY} L ${coord.x} ${coord.y}`}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Central Root Node (Abhijay Parashar) */}
          <g
            onClick={handleCenterClick}
            className="cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            {/* Outer halo */}
            <circle
              cx={centerX}
              cy={centerY}
              r={46}
              fill="#1E293B"
              className="drop-shadow-md"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={49}
              fill="none"
              stroke="#3B82F6"
              strokeWidth={selectedNode?.type === 'center' ? 3 : 1}
              strokeDasharray={selectedNode?.type === 'center' ? 'none' : '3 3'}
            />
            {/* Center icon / initials */}
            <text
              x={centerX}
              y={centerY - 5}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="700"
              fontFamily="sans-serif"
            >
              OneID
            </text>
            <text
              x={centerX}
              y={centerY + 12}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="10"
              fontWeight="500"
              fontFamily="sans-serif"
            >
              Primary Root
            </text>
          </g>

          {/* Satellite Document Nodes */}
          {Object.entries(nodeCoordinates).map(([typeKey, coord]) => {
            const type = typeKey as DocumentType;
            const doc = getNodeData(type);
            const isAssociated = doc?.status === 'associated';
            const isSelected = selectedNode?.type === type;

            return (
              <g
                key={`node_${type}`}
                onClick={() => handleNodeClick(type)}
                className="cursor-pointer transition-transform duration-200 hover:scale-105"
              >
                {/* Node circle */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={32}
                  fill={isAssociated ? '#FFFFFF' : '#F8FAFC'}
                  stroke={isSelected ? '#2563EB' : isAssociated ? '#10B981' : '#CBD5E1'}
                  strokeWidth={isSelected ? 3 : isAssociated ? 2 : 1.5}
                  className="drop-shadow-sm"
                />

                {/* Status Dot */}
                <circle
                  cx={coord.x + 22}
                  cy={coord.y - 20}
                  r={5}
                  fill={isAssociated ? '#10B981' : '#94A3B8'}
                />

                {/* Node Label */}
                <text
                  x={coord.x}
                  y={coord.y + 4}
                  textAnchor="middle"
                  fill={isAssociated ? '#0F172A' : '#64748B'}
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {coord.label}
                </text>

                {/* Subtitle / score */}
                <text
                  x={coord.x}
                  y={coord.y + 45}
                  textAnchor="middle"
                  fill={isAssociated ? '#059669' : '#94A3B8'}
                  fontSize="10"
                  fontWeight="500"
                  fontFamily="sans-serif"
                >
                  {isAssociated ? `${doc?.confidenceScore}% match` : 'Not linked'}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Node Details Drawer / Floater */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 p-4 shadow-xl z-20 animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {selectedNode.type === 'center' ? 'Central Identity Node' : 'Associated Credential'}
                </span>
                <h4 className="text-sm font-semibold text-slate-900 mt-0.5">
                  {selectedNode.type === 'center'
                    ? user.name
                    : selectedNode.document?.title || 'Unlinked Document'}
                </h4>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedNode.type === 'center' ? (
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Identity Status</span>
                  <span className="font-semibold text-emerald-600">{user.identityStatus}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Confidence Score</span>
                  <span className="font-semibold text-slate-900">{user.overallConfidence}%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Linked Documents</span>
                  <span className="font-semibold text-slate-900">
                    {documents.filter((d) => d.status === 'associated').length} of {documents.length}
                  </span>
                </div>
                <Link to="/identity" className="block pt-2">
                  <Button size="sm" variant="secondary" className="w-full text-xs">
                    View Full Identity Breakdown
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-3 space-y-2 text-xs">
                {selectedNode.document?.status === 'associated' ? (
                  <>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Document Number</span>
                      <span className="font-mono font-medium text-slate-900">
                        {selectedNode.document.maskedNumber}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Consistency Score</span>
                      <span className="font-semibold text-emerald-600">
                        {selectedNode.document.confidenceScore}%
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Last Verified</span>
                      <span className="text-slate-700">{selectedNode.document.lastVerifiedDate}</span>
                    </div>
                    <Link to="/verification" className="block pt-2">
                      <Button size="sm" variant="primary" className="w-full text-xs">
                        View Pairwise Cross-Checks
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="py-2">
                    <p className="text-xs text-slate-500 mb-3">
                      This document has not been associated with your identity profile yet.
                    </p>
                    <Link to={`/documents/add?type=${selectedNode.type}`}>
                      <Button
                        size="sm"
                        variant="primary"
                        className="w-full text-xs"
                        icon={<Plus className="w-3.5 h-3.5" />}
                      >
                        Add & Cross-Verify
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
