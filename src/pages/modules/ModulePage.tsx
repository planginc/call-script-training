import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { ContentBlock } from '../../components/script/ContentBlock';
import { AudioPlayer } from '../../components/common/AudioPlayer';
import { scriptContent } from '../../data/scriptContent';

interface ModulePageProps {
  currentModule: string;
  currentSubsection: number;
  onSubsectionChange: (subsectionIndex: number) => void;
}

export const ModulePage: React.FC<ModulePageProps> = ({
  currentModule,
  currentSubsection,
  onSubsectionChange
}) => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [highlightTerm, setHighlightTerm] = useState<string>('');
  const navigate = useNavigate();

  const module = scriptContent.find(m => m.id === (moduleId || currentModule));

  // Get current subsection from URL parameters or default to 0
  const urlSubsection = searchParams.get('subsection');
  const currentSubsectionFromUrl = urlSubsection ? parseInt(urlSubsection, 10) : 0;
  const actualCurrentSubsection = !isNaN(currentSubsectionFromUrl) ? currentSubsectionFromUrl : 0;
  
  console.log('Content rendering debug:', {
    urlSubsection,
    currentSubsectionFromUrl,
    actualCurrentSubsection,
    currentSubsection,
    moduleId: module?.id,
    totalSubsections: module?.subsections.length
  });

  // Sync with parent component when URL changes
  useEffect(() => {
    if (actualCurrentSubsection !== currentSubsection) {
      onSubsectionChange(actualCurrentSubsection);
    }
  }, [actualCurrentSubsection, currentSubsection, onSubsectionChange]);

  // Read highlight term from URL parameters
  useEffect(() => {
    const highlight = searchParams.get('highlight');
    if (highlight) {
      setHighlightTerm(highlight);
      // Clear highlight after 5 seconds
      const timer = setTimeout(() => setHighlightTerm(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Reset currentSubsection if it's out of bounds
  useEffect(() => {
    if (module && actualCurrentSubsection >= module.subsections.length) {
      onSubsectionChange(0);
    }
  }, [module, actualCurrentSubsection, onSubsectionChange]);
  
  if (!module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h2>
        <p className="text-gray-600">The requested training module could not be found.</p>
      </div>
    );
  }

  const currentSubsectionData = module.subsections[actualCurrentSubsection];
  const canNavigateNext = actualCurrentSubsection < module.subsections.length - 1;
  const canNavigatePrev = actualCurrentSubsection > 0;
  
  console.log('Subsection data debug:', {
    actualCurrentSubsection,
    currentSubsectionData: currentSubsectionData?.title,
    canNavigateNext,
    canNavigatePrev
  });
  
  

  // Safety check for currentSubsectionData
  if (!currentSubsectionData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Module Error</h2>
        <p className="text-gray-600">There was an error loading the module content.</p>
      </div>
    );
  }

  const handleNext = () => {
    console.log('Next button clicked!', {
      canNavigateNext,
      actualCurrentSubsection,
      totalSubsections: module.subsections.length,
      moduleId: module.id
    });
    
    if (canNavigateNext) {
      const newSubsection = actualCurrentSubsection + 1;
      console.log('Navigating to subsection:', newSubsection);
      onSubsectionChange(newSubsection);
      // Update URL using React Router
      setSearchParams({ subsection: newSubsection.toString() });
      console.log('URL updated using setSearchParams');
    } else {
      console.log('Cannot navigate next - at end of module');
    }
  };

  const handlePrev = () => {
    if (canNavigatePrev) {
      const newSubsection = actualCurrentSubsection - 1;
      onSubsectionChange(newSubsection);
      // Update URL using React Router
      setSearchParams({ subsection: newSubsection.toString() });
    }
  };


  return (
    <div className="max-w-6xl mx-auto">
      {/* Module Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
        <p className="text-gray-600 mt-1">
          Subsection {actualCurrentSubsection + 1} of {module.subsections.length}
        </p>
      </div>

      {/* Main Content */}
      <div 
        className="bg-white rounded-lg shadow-sm border-2 p-6 mb-6"
        style={{
          borderColor: module.color || '#e5e7eb'
        }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentSubsectionData.title}
        </h2>
        
        <div className="space-y-6">
          {/* Audio Player for Sample Call sections */}
          {module.id === 'intro' && currentSubsectionData.id === 'sample-call' && (
            <div className="mb-6">
              <AudioPlayer 
                src="/Audio Recordings/1 - Intro.wav"
                title="Sample Call Audio Recording"
                className="max-w-2xl"
              />
            </div>
          )}
          
          {module.id === 'understand-situation' && currentSubsectionData.id === 'sample-understand-situation' && (
            <div className="mb-6">
              <AudioPlayer 
                src="/Audio Recordings/2 - Understand their situation.wav"
                title="Sample Call Audio Recording"
                className="max-w-2xl"
              />
            </div>
          )}
          
        {module.id === 'discovery' && currentSubsectionData.id === 'sample-discovery' && (
          <div className="mb-6">
            <AudioPlayer 
              src="/Audio Recordings/3 - Discovery.wav"
              title="Sample Call Audio Recording"
              className="max-w-2xl"
            />
          </div>
        )}
        
        {module.id === 'debt-verification' && currentSubsectionData.id === 'sample-debt-verification' && (
          <div className="mb-6">
            <AudioPlayer 
              src="/Audio Recordings/4 - Debt Verification.wav"
              title="Sample Call Audio Recording"
              className="max-w-2xl"
            />
          </div>
        )}
        
        {module.id === 'credit-analysis' && currentSubsectionData.id === 'credit-analysis-dialogue' && (
          <div className="mb-6">
            <AudioPlayer 
              src="/Audio Recordings/5 - Credit Analysis.wav"
              title="Sample Call Audio Recording"
              className="max-w-2xl"
            />
          </div>
        )}
        
        {module.id === 'five-options' && currentSubsectionData.id === 'complete-options-dialogue' && (
          <div className="mb-6">
            <AudioPlayer 
              src="/Audio Recordings/6 - 5 Options.wav"
              title="Sample Call Audio Recording"
              className="max-w-2xl"
            />
          </div>
        )}
        
        {module.id === 'program-explanation' && currentSubsectionData.id === 'sample-program-explanation' && (
          <div className="mb-6">
            <AudioPlayer 
              src="/Audio Recordings/7 - Program Explanation.wav"
              title="Sample Call Audio Recording"
              className="max-w-2xl"
            />
          </div>
        )}
        
        {module.id === 'pre-approval' && currentSubsectionData.id === 'sample-pre-approval' && (
          <div className="mb-6">
            <AudioPlayer 
              src="/Audio Recordings/8 - Pre-Approval--Budget Instructions.wav"
              title="Sample Call Audio Recording"
              className="max-w-2xl"
            />
          </div>
        )}
          
          {currentSubsectionData.content.map((block, index) => (
            <ContentBlock key={index} block={block} highlightTerm={highlightTerm} />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={!canNavigatePrev}
          className={`flex items-center px-4 py-2 rounded-lg border ${
            canNavigatePrev
              ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </button>

        {canNavigateNext ? (
          <button
            onClick={handleNext}
            className="flex items-center px-4 py-2 rounded-lg border bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        ) : (
          <div className="text-gray-500 text-sm">
            DEBUG: No Next button - canNavigateNext: {canNavigateNext.toString()}, 
            actualCurrentSubsection: {actualCurrentSubsection}, 
            totalSubsections: {module.subsections.length}
          </div>
        )}
      </div>
    </div>
  );
};
