import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { BranchingOption } from '../../data/scriptContent';

interface BranchingLogicProps {
  content: string;
  branchingOptions: BranchingOption[];
  className?: string;
  highlightTerm?: string;
}

export const BranchingLogic: React.FC<BranchingLogicProps> = ({ 
  content, 
  branchingOptions, 
  className = '',
  highlightTerm = ''
}) => {
  const [expandedOption, setExpandedOption] = useState<number | null>(null);

  return (
    <div className={`bg-strategy-green border border-green-300 p-4 rounded-lg ${className}`}>
      <div className="font-semibold text-green-800 mb-3">
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
      <div className="space-y-2">
        {branchingOptions.map((option, index) => (
          <div key={index} className="border border-green-200 rounded">
            <button
              onClick={() => setExpandedOption(expandedOption === index ? null : index)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-green-50 transition-colors"
            >
              <span className="font-medium text-green-700">{option.condition}</span>
              {expandedOption === index ? (
                <ChevronDown className="h-4 w-4 text-green-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-green-600" />
              )}
            </button>
            {expandedOption === index && (
              <div className="px-3 pb-3 border-t border-green-200 bg-green-50">
                <div className="pt-3 text-sm text-green-800">
                  {option.response}
                </div>
                {option.nextSection && (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    → Continue to: {option.nextSection}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
