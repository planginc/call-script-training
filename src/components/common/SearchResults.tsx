import React from 'react';
import { Search, FileText, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  type: 'script' | 'compliance';
  module?: string;
  subsection?: string;
  content?: string;
  blockType?: string;
  moduleId?: string;
  subsectionId?: string;
  blockIndex?: number;
  phrase?: string;
  context?: string;
  legal?: string;
  id?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: (result: SearchResult) => void;
  searchQuery?: string;
  className?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  onResultClick, 
  searchQuery = '',
  className = '' 
}) => {
  const navigate = useNavigate();
  if (results.length === 0) {
    return null;
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'script':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'compliance':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Search className="h-4 w-4 text-gray-600" />;
    }
  };

  const getResultTypeColor = (type: string) => {
    switch (type) {
      case 'script':
        return 'border-blue-200 bg-blue-50';
      case 'compliance':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const highlightSearchTerm = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'script' && result.moduleId && typeof result.subsectionId === 'number') {
      // Navigate to the scripts page with the specific module and subsection
      navigate(`/scripts?module=${result.moduleId}&subsection=${result.subsectionId}&highlight=${encodeURIComponent(searchQuery)}`);
    } else if (result.type === 'compliance') {
      navigate('/glossary');
    }
    onResultClick(result);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">
          Search Results ({results.length})
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {results.map((result, index) => (
          <button
            key={index}
            onClick={() => handleResultClick(result)}
            className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${getResultTypeColor(result.type)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getResultIcon(result.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                {result.type === 'script' ? (
                  <>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {result.module}
                      </span>
                      <ArrowRight className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {result.subsection}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {result.blockType?.toUpperCase()} CONTENT
                    </div>
                    <p className="text-sm text-gray-700">
                      {highlightSearchTerm(truncateContent(result.content || ''), searchQuery)}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {result.phrase}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      COMPLIANCE REQUIREMENT
                    </div>
                    <p className="text-sm text-gray-700">
                      {highlightSearchTerm(truncateContent(result.legal || ''), searchQuery)}
                    </p>
                  </>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
