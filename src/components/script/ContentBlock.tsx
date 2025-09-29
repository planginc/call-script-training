import React from 'react';
import { VerbatimScript } from './VerbatimScript';
import { ComplianceAlert } from './ComplianceAlert';
import { AnalysisBox } from './AnalysisBox';
import { BranchingLogic } from './BranchingLogic';
import { ContentBlock as ContentBlockType } from '../../data/scriptContent';

interface ContentBlockProps {
  block: ContentBlockType;
  className?: string;
  highlightTerm?: string;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ block, className = '', highlightTerm = '' }) => {
  const highlightText = (text: string, term: string) => {
    if (!term.trim()) return text;
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded font-semibold">
          {part}
        </mark>
      ) : part
    );
  };

  const formatContent = (text: string) => {
    // First highlight search terms
    const highlightedText = highlightText(text, highlightTerm);
    
    // Convert **text** to bold and highlight mandatory phrases
    const boldRegex = /\*\*(.*?)\*\*/g;
    const mandatoryPhrases = [
      'calling on a recorded line',
      'You can opt out at any time',
      'All calls are recorded and monitored'
    ];
    
    const processText = (input: string | React.ReactNode): React.ReactNode => {
      if (typeof input === 'string') {
        // First handle bold formatting
        const boldParts = input.split(boldRegex);
        const boldFormatted = boldParts.map((part, index) => {
          if (index % 2 === 1) {
            return <strong key={`bold-${index}`} className="font-bold">{part}</strong>;
          }
          return part;
        });
        
        // Then handle mandatory phrase highlighting
        return boldFormatted.map((part, index) => {
          if (typeof part === 'string') {
            let result = part;
            mandatoryPhrases.forEach(phrase => {
              const regex = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
              result = result.replace(regex, '<span class="bg-red-100 text-red-800 px-1 rounded font-semibold border border-red-200">$1</span>');
            });
            return <span key={`mandatory-${index}`} dangerouslySetInnerHTML={{ __html: result }} />;
          }
          return part;
        });
      }
      return input;
    };
    
    // Process the highlighted text
    if (Array.isArray(highlightedText)) {
      return highlightedText.map((part, index) => processText(part));
    } else {
      return processText(highlightedText);
    }
  };

  const renderContent = () => {
    switch (block.type) {
      case 'verbatim':
        return (
          <VerbatimScript 
            content={block.content} 
            className={className}
            highlightTerm={highlightTerm}
          />
        );
      
      case 'compliance':
        return (
          <ComplianceAlert 
            content={block.content}
            warning={block.warning}
            className={className}
            highlightTerm={highlightTerm}
          />
        );
      
      case 'analysis':
        return (
          <AnalysisBox 
            content={block.content}
            className={className}
            highlightTerm={highlightTerm}
          />
        );
      
      case 'branching':
        return (
          <BranchingLogic 
            content={block.content}
            branchingOptions={block.branchingOptions || []}
            className={className}
            highlightTerm={highlightTerm}
          />
        );
      
      case 'transition':
        return (
          <div className={`bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg ${className}`}>
            <div className="text-sm text-blue-700 font-medium mb-2">TRANSITION PHRASE</div>
            <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {highlightText(block.content, highlightTerm)}
            </div>
          </div>
        );
      
      case 'regular':
      default:
        return (
          <div className={`prose prose-sm max-w-none ${className}`}>
            <div className="whitespace-pre-wrap leading-relaxed">
              {formatContent(block.content)}
            </div>
          </div>
        );
    }
  };

  return renderContent();
};
