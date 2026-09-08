import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIdentity } from '../context/IdentityContext';
import { DocumentCard } from '../components/identity/DocumentCard';
import { Tabs } from '../components/common/Tabs';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import { DocumentCategory, IdentityDocument } from '../types';
import { Plus, Search, ShieldCheck, Eye, Trash2, CheckCircle2, Lock } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const { documents, removeDocument } = useIdentity();
  const [activeCategory, setActiveCategory] = useState<DocumentCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<IdentityDocument | null>(null);
  const [docToDelete, setDocToDelete] = useState<IdentityDocument | null>(null);

  const categories = [
    { id: 'all' as DocumentCategory, label: 'All Documents', count: documents.length },
    { id: 'identity' as DocumentCategory, label: 'Identity', count: documents.filter(d => d.category === 'identity').length },
    { id: 'address' as DocumentCategory, label: 'Address', count: 0 },
    { id: 'financial' as DocumentCategory, label: 'Financial', count: documents.filter(d => d.category === 'financial').length },
    { id: 'other' as DocumentCategory, label: 'Other', count: 0 },
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.maskedNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleConfirmDelete = () => {
    if (docToDelete) {
      removeDocument(docToDelete.id);
      setDocToDelete(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Documents
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your government identity credentials and optical consistency status.
          </p>
        </div>

        <Link to="/documents/add">
          <Button variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
            Add Document
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <Tabs<DocumentCategory>
          tabs={categories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
          variant="pills"
        />

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search credentials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-600/30 text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onView={(d) => setSelectedDoc(d)}
            onVerify={(d) => setSelectedDoc(d)}
            onRemove={(d) => setDocToDelete(d)}
          />
        ))}
      </div>

      {/* View Document Details Modal */}
      <Modal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        title={selectedDoc?.title}
        description="Encrypted synthetic record attributes and optical matching indicators."
        maxWidth="md"
      >
        {selectedDoc && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Issuing Body</span>
                <span className="font-semibold text-slate-900">{selectedDoc.issuer}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Masked Identifier</span>
                <span className="font-mono font-bold text-slate-900">{selectedDoc.maskedNumber}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Associated On</span>
                <span className="font-medium text-slate-800">{selectedDoc.addedDate}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Last Consistency Check</span>
                <span className="font-medium text-slate-800">{selectedDoc.lastVerifiedDate}</span>
              </div>
            </div>

            {/* Matched Attributes Checklist */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Optical Verification Checks
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-white text-xs">
                  <span className="text-slate-700">Name Concurrence</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 99.2% Match
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-white text-xs">
                  <span className="text-slate-700">Date of Birth Normalized</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Exact Year (2003)
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-white text-xs">
                  <span className="text-slate-700">Document Layout Specification</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Valid Format
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2.5 text-xs text-blue-800">
              <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Raw document numbers are permanently masked to prevent identity theft.
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedDoc(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation Modal for Document Deletion */}
      <ConfirmationModal
        isOpen={!!docToDelete}
        onClose={() => setDocToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={`Unlink ${docToDelete?.title}?`}
        message="This document will be unlinked from your unified identity profile. Consistency score will be updated."
        confirmLabel="Unlink"
        isDangerous
      />
    </div>
  );
};
