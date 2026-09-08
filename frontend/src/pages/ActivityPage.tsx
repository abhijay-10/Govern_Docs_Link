import React, { useState } from 'react';
import { useIdentity } from '../context/IdentityContext';
import { ActivityCategory, ActivityEvent } from '../types';
import { Tabs } from '../components/common/Tabs';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { 
  History, 
  ShieldCheck, 
  FolderLock, 
  Share2, 
  CheckCircle2, 
  MapPin, 
  Laptop, 
  Download,
  Filter,
  Lock 
} from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const { activityEvents, addToast } = useIdentity();
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>('all');

  const filterTabs = [
    { id: 'all' as ActivityCategory, label: 'All Activities', count: activityEvents.length },
    { id: 'security' as ActivityCategory, label: 'Security', count: activityEvents.filter(a => a.category === 'security').length },
    { id: 'documents' as ActivityCategory, label: 'Documents', count: activityEvents.filter(a => a.category === 'documents').length },
    { id: 'sharing' as ActivityCategory, label: 'Sharing', count: activityEvents.filter(a => a.category === 'sharing').length },
    { id: 'verification' as ActivityCategory, label: 'Verification', count: activityEvents.filter(a => a.category === 'verification').length },
  ];

  const filteredEvents = activityEvents.filter((ev) => {
    if (activeCategory === 'all') return true;
    return ev.category === activeCategory;
  });

  const getEventIcon = (category: ActivityEvent['category']) => {
    switch (category) {
      case 'security':
        return <Lock className="w-4 h-4 text-indigo-600" />;
      case 'documents':
        return <FolderLock className="w-4 h-4 text-blue-600" />;
      case 'sharing':
        return <Share2 className="w-4 h-4 text-emerald-600" />;
      case 'verification':
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    }
  };

  const handleExportLog = () => {
    addToast('Audit Log Exported', 'CSV security log generated and downloaded.', 'success');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Activity & Audit Trail
            </h1>
            <Badge variant="success" size="sm" dot>
              Tamper Evident
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Immutable log of all document updates, verification checks, and external token accesses.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleExportLog}
          icon={<Download className="w-4 h-4" />}
        >
          Export Audit Trail
        </Button>
      </div>

      {/* Filter Tabs */}
      <div>
        <Tabs<ActivityCategory>
          tabs={filterTabs}
          activeTab={activeCategory}
          onChange={setActiveCategory}
          variant="pills"
        />
      </div>

      {/* Timeline List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card divide-y divide-slate-100 overflow-hidden">
        {filteredEvents.map((event) => (
          <div key={event.id} className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200/60 shrink-0 mt-0.5">
                {getEventIcon(event.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-slate-900">{event.title}</h3>
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
                    {event.timeAgo} • {event.timestamp}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {event.description}
                </p>

                {/* Metadata tags */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Laptop className="w-3.5 h-3.5 text-slate-400" />
                    {event.device}
                  </span>

                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {event.location}
                  </span>

                  <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    IP: {event.ipMasked}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
