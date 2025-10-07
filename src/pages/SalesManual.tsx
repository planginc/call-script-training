import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { salesManualSections, getSalesManualSection } from '../data/salesManualContent';

export const SalesManual: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Get current section from URL parameters
  const currentSectionId = searchParams.get('section') || 'company-and-industry';
  const currentSection = getSalesManualSection(currentSectionId);

  // Load markdown content when section changes
  useEffect(() => {
    if (currentSection) {
      loadMarkdownContent(currentSection.fileName);
    }
  }, [currentSectionId, currentSection]);

  const loadMarkdownContent = async (fileName: string) => {
    setLoading(true);
    try {
      // For now, show placeholder content
      // In production, this would load the actual markdown files
      const placeholderContent = `# ${currentSection?.title || 'Section'}

## Overview
This section contains comprehensive training materials for account executives.

## Content Status
The markdown content for this section is being processed and will be available soon.

## Section Details
- **Section Number**: ${currentSection?.section || 'N/A'}
- **Description**: ${currentSection?.description || 'No description available'}

## Coming Soon
- Detailed training content
- Interactive examples
- Compliance guidelines
- Best practices

> **Note**: This is a placeholder while the markdown content is being integrated into the system.`;
      
      setMarkdownContent(placeholderContent);
    } catch (error) {
      console.error('Error loading markdown content:', error);
      setMarkdownContent('# Content Not Available\n\nThis section is currently being updated.');
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (sectionId: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('section', sectionId);
    setSearchParams(newSearchParams);
  };

  const getCurrentSectionIndex = () => {
    return salesManualSections.findIndex(section => section.id === currentSectionId);
  };

  const goToPreviousSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      handleSectionChange(salesManualSections[currentIndex - 1].id);
    }
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < salesManualSections.length - 1) {
      handleSectionChange(salesManualSections[currentIndex + 1].id);
    }
  };

  const currentIndex = getCurrentSectionIndex();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Training
          </button>
        </div>
        
        <div className="flex items-center mb-2">
          <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Manual</h1>
            <p className="text-gray-600">Comprehensive training materials for account executives</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sections</h3>
            <nav className="space-y-2">
              {salesManualSections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentSectionId === section.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2 w-6">
                      {section.section}
                    </span>
                    <span className="flex-1">{section.title}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Section Header */}
            {currentSection && (
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {currentSection.section} - {currentSection.title}
                    </h2>
                    <p className="text-gray-600 mt-1">{currentSection.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Section {currentIndex + 1} of {salesManualSections.length}
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading content...</span>
                </div>
              ) : (
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // Custom styling for blockquotes (compliance notes)
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-yellow-400 bg-yellow-50 p-4 my-4 italic text-gray-700">
                          {children}
                        </blockquote>
                      ),
                      // Custom styling for headers
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-5">
                          {children}
                        </h3>
                      ),
                      // Custom styling for lists
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-1">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-1">
                          {children}
                        </ol>
                      ),
                      // Custom styling for paragraphs
                      p: ({ children }) => (
                        <p className="mb-4 text-gray-700 leading-relaxed">
                          {children}
                        </p>
                      ),
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={goToPreviousSection}
                  disabled={currentIndex === 0}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentIndex === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>

                <div className="text-sm text-gray-500">
                  {currentIndex + 1} of {salesManualSections.length}
                </div>

                <button
                  onClick={goToNextSection}
                  disabled={currentIndex === salesManualSections.length - 1}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentIndex === salesManualSections.length - 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
