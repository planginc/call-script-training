import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ComplianceAlertProps {
  content: string;
  warning?: string;
  className?: string;
  highlightTerm?: string;
}

export const ComplianceAlert: React.FC<ComplianceAlertProps> = ({ 
  content, 
  warning, 
  className = '',
  highlightTerm = ''
}) => {
  return (
    <div className={`bg-compliance-yellow border-2 border-compliance-red p-4 rounded-lg ${className}`}>
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-compliance-red mr-3 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <div className="font-bold text-compliance-red text-sm mb-2">
            COMPLIANCE REQUIREMENT
          </div>
          <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap mb-2">
            {highlightTerm ? (
              (() => {
                const regex = new RegExp(`(${highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                const parts = content.split(regex);
                return parts.map((part, index) => 
                  regex.test(part) ? (
                    <mark key={index} className="bg-yellow-200 px-1 rounded font-semibold">
                      {part}
                    </mark>
                  ) : part
                );
              })()
            ) : content}
          </div>
          {warning && (
            <div className="bg-red-100 border border-red-300 rounded p-2 mt-2">
              <div className="text-red-800 text-sm font-semibold">
                ⚠️ {warning}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
