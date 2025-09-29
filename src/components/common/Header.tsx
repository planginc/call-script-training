import React, { useState } from 'react';
import { Search, Menu, BookOpen, X } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import { SearchResults } from './SearchResults';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onMenuToggle: () => void;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onMenuToggle, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { searchResults } = useSearch(searchQuery);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
    setShowSearchResults(query.length > 0);
  };

  const handleResultClick = (result: any) => {
    if (result.type === 'script' && result.moduleId) {
      window.location.href = `/module/${result.moduleId}?subsection=${result.subsectionId}&highlight=${encodeURIComponent(searchQuery)}`;
    } else if (result.type === 'compliance') {
      window.location.href = '/glossary';
    }
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
    onSearch?.('');
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center ml-2 lg:ml-0">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">
                  ClearOne Advantage
                </h1>
                <p className="text-sm text-gray-500">Call Script Training</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-4 relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search scripts, compliance terms, or strategies..."
                value={searchQuery}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setShowSearchResults(searchQuery.length > 0)}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 z-50">
                <SearchResults
                  results={searchResults}
                  onResultClick={handleResultClick}
                  searchQuery={searchQuery}
                />
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <div className="text-sm text-gray-500">
                Training Progress
              </div>
              <div className="text-xs text-gray-400">
                3 of 7 modules completed
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
