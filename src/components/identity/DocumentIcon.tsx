import React from 'react';
import { DocumentType } from '../../types';
import { 
  CreditCard, 
  FileCheck2, 
  Vote, 
  FileText, 
  Car, 
  ShieldCheck 
} from 'lucide-react';

export interface DocumentIconProps {
  type: DocumentType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DocumentIcon: React.FC<DocumentIconProps> = ({
  type,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const containerSizes = {
    sm: 'p-1.5 rounded-md',
    md: 'p-2.5 rounded-xl',
    lg: 'p-3 rounded-xl',
  };

  const colorStyles: Record<DocumentType, { container: string; icon: string }> = {
    aadhaar: {
      container: 'bg-blue-50 border border-blue-200/60',
      icon: 'text-blue-600',
    },
    pan: {
      container: 'bg-emerald-50 border border-emerald-200/60',
      icon: 'text-emerald-700',
    },
    voter_id: {
      container: 'bg-indigo-50 border border-indigo-200/60',
      icon: 'text-indigo-600',
    },
    passport: {
      container: 'bg-amber-50 border border-amber-200/60',
      icon: 'text-amber-700',
    },
    driving_licence: {
      container: 'bg-cyan-50 border border-cyan-200/60',
      icon: 'text-cyan-700',
    },
    other: {
      container: 'bg-slate-100 border border-slate-200',
      icon: 'text-slate-600',
    },
  };

  const renderIcon = () => {
    const s = sizeClasses[size];
    switch (type) {
      case 'aadhaar':
        return <ShieldCheck className={s} />;
      case 'pan':
        return <CreditCard className={s} />;
      case 'voter_id':
        return <Vote className={s} />;
      case 'passport':
        return <FileText className={s} />;
      case 'driving_licence':
        return <Car className={s} />;
      default:
        return <FileCheck2 className={s} />;
    }
  };

  const style = colorStyles[type] || colorStyles.other;

  return (
    <div className={`inline-flex items-center justify-center shrink-0 ${containerSizes[size]} ${style.container} ${style.icon} ${className}`}>
      {renderIcon()}
    </div>
  );
};
