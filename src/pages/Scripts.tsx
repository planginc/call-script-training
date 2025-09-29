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
import { getCacheBustedUrl } from '../data/audioPlaylist';

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
    <div className="h-screen flex flex-col">
      {/* Level 2: Horizontal Tab Navigation - STICKY */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 flex-shrink-0">
        <div className="flex flex-wrap justify-center gap-0 py-2">
          {scriptContent.map((scriptModule, index) => {
            const isActive = scriptModule.id === currentModuleId;
            const moduleNumber = index + 1;
            const moduleColor = getModuleColor(scriptModule.id);
            
            return (
              <button
                key={scriptModule.id}
                onClick={() => handleModuleChange(scriptModule.id)}
                className={`
                  flex flex-col items-center justify-center px-0 py-1 rounded-lg transition-all duration-200 
                  ${scriptModule.title === 'UNDERSTAND THEIR SITUATION' 
                    ? 'min-w-[150px] sm:min-w-[170px]' 
                    : scriptModule.title === 'PROGRAM EXPLANATION'
                    ? 'min-w-[105px] sm:min-w-[125px]'
                    : scriptModule.title === 'PRE-APPROVAL/BUDGET INSTRUCTIONS'
                    ? 'min-w-[95px] sm:min-w-[115px]'
                    : scriptModule.title === 'DEBT VERIFICATION'
                    ? 'min-w-[85px] sm:min-w-[105px]'
                    : 'min-w-[75px] sm:min-w-[95px]'
                  }
                  ${isActive 
                    ? 'bg-gray-100 shadow-md ring-2 ring-gray-400' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                {/* Large Number with colored background */}
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-xs mb-0.5"
                  style={{ backgroundColor: moduleColor }}
                >
                  {moduleNumber}
                </div>
                
                {/* Title */}
                <div className="text-xs font-medium text-center leading-tight text-gray-700">
                  {scriptModule.title === 'UNDERSTAND THEIR SITUATION' ? (
                    <>
                      <div className="text-xs">UNDERSTAND</div>
                      <div className="text-xs">THEIR SITUATION</div>
                    </>
                  ) : scriptModule.title.split(' ').slice(0, 2).map((word, wordIndex) => (
                    <div key={wordIndex}>{word}</div>
                  ))}
                  {scriptModule.title.split(' ').length > 2 && scriptModule.title !== 'UNDERSTAND THEIR SITUATION' && (
                    <div className="text-xs text-gray-500">...</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout with Left Sub-Navigation */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sub-Navigation Sidebar */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {scriptContent.findIndex(m => m.id === currentModuleId) + 1}. {module.title}
            </h3>
            
            <div className="space-y-2">
              {module.subsections?.map((subsection, index) => {
                if (!subsection || !subsection.id) return null;
                const isSampleCall = subsection.title?.includes('Sample Call');
                const isActive = currentSubsection === index;
                
                return (
                  <button
                    key={subsection.id}
                    onClick={() => handleSubsectionChange(index)}
                    className={`
                      w-full flex items-center p-3 text-left rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                      }
                    `}
                  >
                    <div className="flex-shrink-0 mr-3">
                      {isSampleCall ? (
                        <Phone className="h-4 w-4 text-blue-600" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-400'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {isSampleCall ? '📞 Sample Call' : subsection.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Progress Indicator */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 text-center">
                {scriptContent.findIndex(m => m.id === currentModuleId) + 1} of {scriptContent.length} modules
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto">
          {currentSubsectionData ? (
            <div className="space-y-4">
              {/* Content Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentSubsectionData.title}
                </h2>
              </div>

              {/* Audio Player */}
              {(currentModuleId === 'intro' && currentSubsectionData?.id === 'sample-call') ||
               (currentModuleId === 'understand-situation' && currentSubsectionData?.id === 'sample-understand-situation') ||
               (currentModuleId === 'discovery' && currentSubsectionData?.id === 'sample-discovery') ||
               (currentModuleId === 'debt-verification' && currentSubsectionData?.id === 'sample-debt-verification') ||
               (currentModuleId === 'credit-analysis' && currentSubsectionData?.id === 'credit-analysis-dialogue') ||
               (currentModuleId === 'five-options' && currentSubsectionData?.id === 'complete-options-dialogue') ||
               (currentModuleId === 'program-explanation' && currentSubsectionData?.id === 'sample-program-explanation') ||
               (currentModuleId === 'pre-approval' && currentSubsectionData?.id === 'sample-pre-approval') ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  {currentModuleId === 'intro' && currentSubsectionData?.id === 'sample-call' && (
                    <AudioPlayer 
                      src="/Audio Recordings/1 - Intro.wav"
                      title="Sample Call Audio Recording"
                      className="max-w-2xl"
                    />
                  )}
                  
                  {currentModuleId === 'understand-situation' && currentSubsectionData?.id === 'sample-understand-situation' && (
                    <AudioPlayer 
                      src="/Audio Recordings/2 - Understand their situation.wav"
                      title="Sample Call Audio Recording"
                      className="max-w-2xl"
                    />
                  )}
                  
                  {currentModuleId === 'discovery' && currentSubsectionData?.id === 'sample-discovery' && (
                    <AudioPlayer 
                      src="/Audio Recordings/3 - Discovery.wav"
                      title="Sample Call Audio Recording"
                      className="max-w-2xl"
                    />
                  )}
                  
                  {currentModuleId === 'debt-verification' && currentSubsectionData?.id === 'sample-debt-verification' && (
                    <AudioPlayer 
                      src="/Audio Recordings/4 - Debt Verification.wav"
                      title="Sample Call Audio Recording"
                      className="max-w-2xl"
                    />
                  )}
                  
                  {currentModuleId === 'credit-analysis' && currentSubsectionData?.id === 'credit-analysis-dialogue' && (
                    <AudioPlayer 
                      src="/Audio Recordings/5 - Credit Analysis.wav"
                      title="Sample Call Audio Recording"
                      className="max-w-2xl"
                    />
                  )}
                  
                {currentModuleId === 'five-options' && currentSubsectionData?.id === 'complete-options-dialogue' && (
                  <AudioPlayer 
                    src={getCacheBustedUrl("/Audio Recordings/6 - 5 Options.wav")}
                    title="Sample Call Audio Recording"
                    className="max-w-2xl"
                  />
                )}
                  
                  {currentModuleId === 'program-explanation' && currentSubsectionData?.id === 'sample-program-explanation' && (
                    <AudioPlayer 
                      src="/Audio Recordings/7 - Program Explanation.wav"
                      title="Sample Call Audio Recording"
                      className="max-w-2xl"
                    />
                  )}
                  
                  {currentModuleId === 'pre-approval' && currentSubsectionData?.id === 'sample-pre-approval' && (
                    <AudioPlayer 
                      src="/Audio Recordings/8 - Pre-Approval--Budget Instructions.wav"
                      title="Sample Call Audio Recording"
                      className="max-w-2xl"
                    />
                  )}
                </div>
              ) : null}

              {/* Content */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="space-y-6">
                    {currentSubsectionData?.content.map((block, index) => (
                      <ContentBlock key={index} block={block} highlightTerm={highlightTerm} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
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
            </div>
          ) : (
            // Show instructions when no subsection is selected
            <div className="h-full flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Select a section from the left to view content
                  </h3>
                  <p className="text-gray-600">
                    Choose any of the sections in the left sidebar to see the detailed content for this module.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};