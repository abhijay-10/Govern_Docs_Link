import React from 'react';
import { IdentityGraph } from '../components/graph/IdentityGraph';
import { useIdentity } from '../context/IdentityContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { 
  GitFork, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  ArrowRight,
  ShieldAlert 
} from 'lucide-react';

export const IdentityGraphPage: React.FC = () => {
  const { user, documents } = useIdentity();
  const associatedDocs = documents.filter((d) => d.status === 'associated');

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Identity Graph
            </h1>
            <Badge variant="info" size="sm" dot>
              Interactive Topology
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Visual map of cryptographically associated documents connecting to your central identity profile.
          </p>
        </div>

        <Link to="/documents/add">
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
            Connect More Documents
          </Button>
        </Link>
      </div>

      {/* Main Interactive Graph Component */}
      <IdentityGraph />

      {/* Graph Metrics and Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Topology Health
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {associatedDocs.length} of {documents.length}
            </span>
            <span className="text-xs text-emerald-600 font-semibold">Nodes Linked</span>
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            All 3 linked documents achieve &gt;96% consistency confidence with zero attribute contradictions.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Central Anchor
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900">{user.name}</span>
            <span className="text-xs text-brand-600 font-semibold font-mono">2003</span>
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Acts as the primary cryptographic root node for cross-document consistency checks and third-party verification shares.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Sovereign Disconnection
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">Isolated</span>
            <span className="text-xs text-slate-400 font-semibold">No Gov DB Sync</span>
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Nodes exist only in your local profile graph. No external government registry connections are formed.
          </p>
        </div>
      </div>
    </div>
  );
};
