import React from 'react';
import { Lightbulb } from 'lucide-react';

interface AnalysisBoxProps {
  content: string;
  className?: string;
  highlightTerm?: string;
}

export const AnalysisBox: React.FC<AnalysisBoxProps> = ({ content, className = '', highlightTerm = '' }) => {
  return (
    <div className={`bg-strategy-green border-l-4 border-green-500 p-4 rounded-r-lg ${className}`}>
      <div className="flex items-start mb-2">
        <Lightbulb className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
        <div className="text-sm text-green-700 font-semibold">
          STRATEGY ANALYSIS
        </div>
      </div>
      <div className="text-sm leading-relaxed whitespace-pre-wrap">
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
