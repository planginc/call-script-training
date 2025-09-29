import React from 'react';

interface VerbatimScriptProps {
  content: string;
  className?: string;
  highlightTerm?: string;
}

export const VerbatimScript: React.FC<VerbatimScriptProps> = ({ content, className = '', highlightTerm = '' }) => {
  return (
    <div className={`bg-script-blue border-l-4 border-blue-500 p-4 rounded-r-lg ${className}`}>
      <div className="flex items-start mb-2">
        <div className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded mr-3">
          VERBATIM
        </div>
        <div className="text-sm text-gray-600 font-medium">
          Exact language required
        </div>
      </div>
      <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
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
    </div>
  );
};
