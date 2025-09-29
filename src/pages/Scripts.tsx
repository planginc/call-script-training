import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  Phone
} from 'lucide-react';
import { ContentBlock } from '../components/script/ContentBlock';
import { AudioPlayer } from '../components/common/AudioPlayer';
import { scriptContent } from '../data/scriptContent';

export const Scripts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [highlightTerm, setHighlightTerm] = useState<string>('');
  const navigate = useNavigate();

  // Get current module and subsection from URL parameters
  const currentModuleId = searchParams.get('module') || 'intro';
  const currentSubsectionParam = searchParams.get('subsection');
  const currentSubsection = currentSubsectionParam ? parseInt(currentSubsectionParam, 10) : 0;

  const module = scriptContent.find(m => m.id === currentModuleId);
  const currentSubsectionData = module?.subsections?.[currentSubsection];

  // Read highlight term from URL parameters
  useEffect(() => {
    const term = searchParams.get('highlight');
    if (term) {
      setHighlightTerm(term);
    }
  }, [searchParams]);

  const handleModuleChange = (moduleId: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('module', moduleId);
    // Don't auto-select subsection - show sub-component list instead
    newSearchParams.delete('subsection');
    setSearchParams(newSearchParams);
  };

  const handleSubsectionChange = (subsectionIndex: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('subsection', subsectionIndex.toString());
    setSearchParams(newSearchParams);
  };

  const goToPrevious = () => {
    if (currentSubsection > 0) {
      handleSubsectionChange(currentSubsection - 1);
    } else {
      // Go to previous module
      const currentIndex = scriptContent.findIndex(m => m.id === currentModuleId);
      if (currentIndex > 0) {
        const prevModule = scriptContent[currentIndex - 1];
        navigate(`/scripts?module=${prevModule.id}&subsection=${(prevModule.subsections?.length || 1) - 1}`);
      }
    }
  };

  const goToNext = () => {
    if (module?.subsections && currentSubsection < module.subsections.length - 1) {
      handleSubsectionChange(currentSubsection + 1);
    } else {
      // Go to next module
      const currentIndex = scriptContent.findIndex(m => m.id === currentModuleId);
      if (currentIndex < scriptContent.length - 1) {
        const nextModule = scriptContent[currentIndex + 1];
        navigate(`/scripts?module=${nextModule.id}&subsection=0`);
      }
    }
  };

  // Module color mapping
  const getModuleColor = (moduleId: string) => {
    switch (moduleId) {
      case 'intro': return '#FF9800'; // Orange
      case 'understand-situation': return '#2196F3'; // Blue
      case 'discovery': return '#4CAF50'; // Green
      case 'debt-verification': return '#FF9800'; // Orange
      case 'credit-analysis': return '#9C27B0'; // Purple
      case 'five-options': return '#FFEB3B'; // Yellow
      case 'program-explanation': return '#F44336'; // Red
      case 'pre-approval': return '#9E9E9E'; // Gray
      default: return '#374151';
    }
  };

  if (!module) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Module not found</p>
      </div>
    );
  }

  const canGoPrevious = currentSubsection > 0 || scriptContent.findIndex(m => m.id === currentModuleId) > 0;
  const canGoNext = currentSubsection < (module.subsections?.length || 1) - 1 || 
                   scriptContent.findIndex(m => m.id === currentModuleId) < scriptContent.length - 1;

  return (
    <div className="space-y-4">
      {/* Level 2: Horizontal Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 py-4">
          {scriptContent.map((scriptModule, index) => {
            const isActive = scriptModule.id === currentModuleId;
            const moduleNumber = index + 1;
            const moduleColor = getModuleColor(scriptModule.id);
            
            return (
              <button
                key={scriptModule.id}
                onClick={() => handleModuleChange(scriptModule.id)}
                className={`
                  flex flex-col items-center justify-center px-2 py-3 rounded-lg transition-all duration-200 min-w-[80px] sm:min-w-[100px]
                  ${isActive 
                    ? 'bg-gray-100 shadow-md ring-2 ring-gray-400' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                {/* Large Number with colored background */}
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg mb-1"
                  style={{ backgroundColor: moduleColor }}
                >
                  {moduleNumber}
                </div>
                
                {/* Title */}
                <div className="text-xs font-medium text-center leading-tight text-gray-700">
                  {scriptModule.title.split(' ').slice(0, 2).map((word, wordIndex) => (
                    <div key={wordIndex}>{word}</div>
                  ))}
                  {scriptModule.title.split(' ').length > 2 && (
                    <div className="text-xs text-gray-500">...</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {scriptContent.findIndex(m => m.id === currentModuleId) + 1}. {module.title}
            </h1>
            {currentSubsectionData && (
              <p className="text-gray-600 mt-1">{currentSubsectionData.title}</p>
            )}
          </div>
          
          {/* Progress Indicator */}
          <div className="text-sm text-gray-500">
            {scriptContent.findIndex(m => m.id === currentModuleId) + 1} of {scriptContent.length} modules
          </div>
        </div>
      </div>

      {/* Level 3: Sub-Component List OR Content */}
      {!currentSubsectionParam ? (
        // Show sub-component list when no subsection is selected
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Click a section below to view content:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {module.subsections?.map((subsection, index) => {
              if (!subsection || !subsection.id) return null;
              const isSampleCall = subsection.title?.includes('Sample Call');
              
              return (
                <button
                  key={subsection.id}
                  onClick={() => handleSubsectionChange(index)}
                  className="flex items-center p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <div className="flex-shrink-0 mr-3">
                    {isSampleCall ? (
                      <Phone className="h-5 w-5 text-blue-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {isSampleCall ? '📞 Sample Call' : subsection.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        // Show content when subsection is selected
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {/* Audio Player for Sample Call sections */}
            {currentModuleId === 'intro' && currentSubsectionData?.id === 'sample-call' && (
              <div className="mb-6">
                <AudioPlayer 
                  src="/Audio Recordings/1 - Intro.wav"
                  title="Sample Call Audio Recording"
                  className="max-w-2xl"
                />
              </div>
            )}
            
            {currentModuleId === 'understand-situation' && currentSubsectionData?.id === 'sample-understand-situation' && (
              <div className="mb-6">
                <AudioPlayer 
                  src="/Audio Recordings/2 - Understand their situation.wav"
                  title="Sample Call Audio Recording"
                  className="max-w-2xl"
                />
              </div>
            )}
            
            {currentModuleId === 'discovery' && currentSubsectionData?.id === 'sample-discovery' && (
              <div className="mb-6">
                <AudioPlayer 
                  src="/Audio Recordings/3 - Discovery.wav"
                  title="Sample Call Audio Recording"
                  className="max-w-2xl"
                />
              </div>
            )}
            
            {currentModuleId === 'debt-verification' && currentSubsectionData?.id === 'sample-debt-verification' && (
              <div className="mb-6">
                <AudioPlayer 
                  src="/Audio Recordings/4 - Debt Verification.wav"
                  title="Sample Call Audio Recording"
                  className="max-w-2xl"
                />
              </div>
            )}
            
            {currentModuleId === 'credit-analysis' && currentSubsectionData?.id === 'credit-analysis-dialogue' && (
              <div className="mb-6">
                <AudioPlayer 
                  src="/Audio Recordings/5 - Credit Analysis.wav"
                  title="Sample Call Audio Recording"
                  className="max-w-2xl"
                />
              </div>
            )}
            
            <div className="space-y-6">
              {currentSubsectionData?.content.map((block, index) => (
                <ContentBlock key={index} block={block} highlightTerm={highlightTerm} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation - Only show when content is displayed */}
      {currentSubsectionParam && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <button
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className={`
              flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${canGoPrevious 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>

          <div className="flex space-x-2">
            {module.subsections?.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSubsectionChange(index)}
                className={`
                  w-3 h-3 rounded-full transition-colors
                  ${index === currentSubsection ? 'bg-blue-600' : 'bg-gray-300'}
                `}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className={`
              flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${canGoNext 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};