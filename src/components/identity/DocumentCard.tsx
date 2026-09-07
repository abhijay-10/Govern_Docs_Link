import React from 'react';
import { IdentityDocument } from '../../types';
import { DocumentIcon } from './DocumentIcon';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { CheckCircle2, AlertCircle, Plus, Eye, Trash2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface DocumentCardProps {
  document: IdentityDocument;
  onView?: (doc: IdentityDocument) => void;
  onVerify?: (doc: IdentityDocument) => void;
  onRemove?: (doc: IdentityDocument) => void;
  compact?: boolean;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onView,
  onVerify,
  onRemove,
  compact = false,
}) => {
  const isAssociated = document.status === 'associated';

  if (compact) {
    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/80 shadow-subtle hover:border-slate-300 transition-all">
        <div className="flex items-center gap-3.5 min-w-0">
          <DocumentIcon type={document.type} size="md" />
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-slate-900 truncate">
              {document.title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-slate-500 font-mono">
                {document.maskedNumber}
              </span>
              {isAssociated && (
                <span className="text-[11px] text-slate-400">
                  • Verified {document.lastVerifiedDate}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          {isAssociated ? (
            <Badge variant="success" size="sm" dot>
              Associated
            </Badge>
          ) : (
            <Link to={`/documents/add?type=${document.type}`}>
              <Button size="sm" variant="secondary" icon={<Plus className="w-3.5 h-3.5" />}>
                Add
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <DocumentIcon type={document.type} size="lg" />
            <div>
              <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                {document.title}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[200px]">
                {document.issuer}
              </p>
            </div>
          </div>

          <Badge
            variant={isAssociated ? 'success' : 'neutral'}
            size="sm"
            dot={isAssociated}
          >
            {isAssociated ? 'Associated' : 'Not Added'}
          </Badge>
        </div>

        <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Document Identifier</span>
          <span className="text-xs font-mono font-semibold text-slate-800 tracking-wider">
            {document.maskedNumber}
          </span>
        </div>

        {isAssociated && (
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3">
            <div>
              <span className="text-slate-400 block text-[11px]">Last Verified</span>
              <span className="text-slate-700 font-medium">{document.lastVerifiedDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Match Score</span>
              <span className="text-emerald-700 font-semibold">{document.confidenceScore}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {isAssociated ? (
          <>
            <div className="flex items-center gap-1.5">
              {onView && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(document)}
                  icon={<Eye className="w-3.5 h-3.5" />}
                >
                  View
                </Button>
              )}
              {onVerify && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onVerify(document)}
                  icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                >
                  Verify
                </Button>
              )}
            </div>
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                onClick={() => onRemove(document)}
                icon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Remove
              </Button>
            )}
          </>
        ) : (
          <Link to={`/documents/add?type=${document.type}`} className="w-full">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-center"
              icon={<Plus className="w-4 h-4" />}
            >
              Add Document
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
