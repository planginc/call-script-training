import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, ArrowRight } from 'lucide-react';
import { scriptContent } from '../../data/scriptContent';

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results: Array<{
      moduleId: string;
      moduleTitle: string;
      moduleColor?: string;
      subsectionId: string;
      subsectionTitle: string;
      content: string;
      sectionIndex: number;
    }> = [];

    scriptContent.forEach(module => {
      module.subsections.forEach(subsection => {
        subsection.content.forEach((contentItem, sectionIndex) => {
          if (contentItem.type === 'verbatim' || contentItem.type === 'compliance' || contentItem.type === 'regular') {
            const text = contentItem.content.toLowerCase();
            if (text.includes(query)) {
              results.push({
                moduleId: module.id,
                moduleTitle: module.title,
                moduleColor: module.color,
                subsectionId: subsection.id,
                subsectionTitle: subsection.title,
                content: contentItem.content,
                sectionIndex
              });
            }
          }
        });
      });
    });

    return results;
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Search Scripts
        </h1>
        <p className="text-gray-600">
          Find specific content across all call scripts and compliance requirements.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for scripts, compliance requirements, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Search Results ({searchResults.length})
            </h2>
            
            {searchResults.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-400 mt-2">
                  Try different keywords or check spelling
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <Link
                    key={`${result.moduleId}-${result.subsectionId}-${index}`}
                    to={`/scripts?module=${result.moduleId}&subsection=${result.sectionIndex}&highlight=${encodeURIComponent(searchQuery)}`}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                    style={{
                      backgroundColor: result.moduleColor ? `${result.moduleColor}05` : undefined,
                      borderLeftColor: result.moduleColor || undefined,
                      borderLeftWidth: '4px'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span 
                            className="inline-block w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: result.moduleColor || '#6b7280' }}
                          />
                          <span className="text-sm font-medium text-gray-600">
                            {result.moduleTitle} → {result.subsectionTitle}
                          </span>
                        </div>
                        <p className="text-gray-900 text-sm leading-relaxed">
                          {result.content.length > 200 
                            ? `${result.content.substring(0, 200)}...` 
                            : result.content
                          }
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 ml-4 flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Access */}
      {!searchQuery && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scriptContent.map((script, index) => (
              <Link
                key={script.id}
                to={`/scripts?module=${script.id}&subsection=0`}
                className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                style={{
                  backgroundColor: script.color ? `${script.color}10` : undefined,
                  borderLeftColor: script.color || undefined,
                  borderLeftWidth: '4px'
                }}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {index + 1}. {script.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {script.subsections.length} sections
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
