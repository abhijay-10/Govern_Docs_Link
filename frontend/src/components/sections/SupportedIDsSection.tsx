import React from 'react';
import { 
  FileText, 
  CreditCard, 
  Vote, 
  Plane, 
  Car, 
  FileCheck2,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const SupportedIDsSection: React.FC = () => {
  const documents = [
    {
      id: 'aadhaar',
      name: 'Aadhaar Card',
      issuer: 'UIDAI',
      category: 'Government Identity',
      status: 'Associated',
      associated: true,
      confidence: '99.1%',
      icon: FileText,
      accent: 'blue',
    },
    {
      id: 'pan',
      name: 'PAN Card',
      issuer: 'Income Tax Dept',
      category: 'Financial Identity',
      status: 'Associated',
      associated: true,
      confidence: '98.4%',
      icon: CreditCard,
      accent: 'emerald',
    },
    {
      id: 'voter',
      name: 'Voter ID (EPIC)',
      issuer: 'Election Commission',
      category: 'Electoral Identity',
      status: 'Associated',
      associated: true,
      confidence: '96.8%',
      icon: Vote,
      accent: 'indigo',
    },
    {
      id: 'passport',
      name: 'Passport',
      issuer: 'Ministry of External Affairs',
      category: 'Travel Identity',
      status: 'Not Added',
      associated: false,
      confidence: 'Available',
      icon: Plane,
      accent: 'slate',
    },
    {
      id: 'dl',
      name: 'Driving Licence',
      issuer: 'MoRTH Transport',
      category: 'Transport Identity',
      status: 'Not Added',
      associated: false,
      confidence: 'Available',
      icon: Car,
      accent: 'slate',
    },
    {
      id: 'other',
      name: 'State Sovereign IDs',
      issuer: 'Competent Authorities',
      category: 'Regional Identity',
      status: 'Supported',
      associated: false,
      confidence: 'Extensible',
      icon: FileCheck2,
      accent: 'slate',
    },
  ];

  return (
    <section id="identity" className="relative py-20 bg-surface-muted border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-200/70 px-3 py-1 rounded-full">
            MULTI-DOCUMENT REGISTRY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3">
            Your documents.<br />
            <span className="text-brand-600">One organized identity.</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            OneID maps standard sovereign credential formats into a unified topological profile without storing unmasked identifiers.
          </p>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {documents.map((doc) => {
            const Icon = doc.icon;
            return (
              <div
                key={doc.id}
                className="group relative bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-sm transition-all duration-200 hover:border-brand-300 hover:shadow-card-hover hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      doc.associated 
                        ? 'bg-brand-50 text-brand-600 border border-brand-200/70' 
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {doc.associated ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Associated
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {doc.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-navy-900 tracking-tight">
                    {doc.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {doc.category} • <span className="font-mono text-[10px]">{doc.issuer}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">Match Confidence</span>
                  <span className={`font-mono text-xs font-semibold ${
                    doc.associated ? 'text-brand-600' : 'text-slate-400'
                  }`}>
                    {doc.confidence}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
