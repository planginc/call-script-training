import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CallSection {
  id: string;
  title: string;
  description: string;
  isCorrect: boolean;
}

const correctOrder = [
  'intro-opening',
  'discovery-info',
  'credit-analysis',
  'five-options',
  'program-explanation',
  'closing-final'
];

const callSections: CallSection[] = [
  {
    id: 'intro-opening',
    title: 'Intro/Opening',
    description: 'Initial greeting and rapport building',
    isCorrect: true
  },
  {
    id: 'discovery-info',
    title: 'Discovery & Information Gathering',
    description: 'Understanding client situation and needs',
    isCorrect: true
  },
  {
    id: 'credit-analysis',
    title: 'Credit Analysis',
    description: 'Evaluating client\'s financial position',
    isCorrect: true
  },
  {
    id: 'five-options',
    title: 'The 5 Options',
    description: 'Presenting and disqualifying alternatives',
    isCorrect: true
  },
  {
    id: 'program-explanation',
    title: 'Program Explanation',
    description: 'Detailing the debt settlement program',
    isCorrect: true
  },
  {
    id: 'closing-final',
    title: 'Closing & Final Steps',
    description: 'Securing commitment and next steps',
    isCorrect: true
  }
];

export const CallFlowBuilderSimple: React.FC = () => {
  const [sections, setSections] = useState<CallSection[]>([]);
  const [droppedSections, setDroppedSections] = useState<CallSection[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    // Initialize sections on component mount
    const shuffled = [...callSections].sort(() => Math.random() - 0.5);
    setSections(shuffled);
  }, []); // Only run on mount

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedItem(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    if (targetId === 'call-flow') {
      // Moving from sections to call flow
      const section = sections.find(s => s.id === draggedItem);
      if (section) {
        setSections(prev => prev.filter(s => s.id !== draggedItem));
        setDroppedSections(prev => [...prev, section]);
      }
    } else if (targetId === 'sections') {
      // Moving back to sections
      const section = droppedSections.find(s => s.id === draggedItem);
      if (section) {
        setDroppedSections(prev => prev.filter(s => s.id !== draggedItem));
        setSections(prev => {
          // Check if section already exists to prevent duplicates
          if (prev.find(s => s.id === section.id)) {
            return prev;
          }
          return [...prev, section];
        });
      }
    }
    
    setDraggedItem(null);
  };


  const handleDropOnItem = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent the main drop handler from firing
    
    if (!draggedItem) return;

    // Find current index of dragged item
    const currentIndex = droppedSections.findIndex(s => s.id === draggedItem);
    
    if (currentIndex === -1) {
      // Moving from sections to call flow at specific position
      const section = sections.find(s => s.id === draggedItem);
      if (section) {
        // Remove from sections and add to dropped sections in one operation
        setSections(prev => prev.filter(s => s.id !== draggedItem));
        setDroppedSections(prev => {
          // Ensure no duplicates
          const filteredPrev = prev.filter(s => s.id !== section.id);
          const newSections = [...filteredPrev];
          newSections.splice(targetIndex, 0, section);
          return newSections;
        });
      }
    } else {
      // Reordering within call flow
      setDroppedSections(prev => {
        const newSections = [...prev];
        const [removed] = newSections.splice(currentIndex, 1);
        
        // Calculate the correct target index after removal
        let adjustedTargetIndex = targetIndex;
        if (currentIndex < targetIndex) {
          adjustedTargetIndex = targetIndex - 1;
        }
        
        // Ensure we don't go out of bounds
        adjustedTargetIndex = Math.max(0, Math.min(adjustedTargetIndex, newSections.length));
        
        newSections.splice(adjustedTargetIndex, 0, removed);
        return newSections;
      });
    }
    
    setDraggedItem(null);
  };

  const checkAnswer = () => {
    setAttempts(prev => prev + 1);
    setShowFeedback(true);
    
    const isCorrect = droppedSections.length === correctOrder.length &&
      droppedSections.every((section, index) => section.id === correctOrder[index]);
    
    setIsCompleted(isCorrect);
  };

  const resetExercise = () => {
    // Shuffle the sections so they're in random order
    const shuffled = [...callSections].sort(() => Math.random() - 0.5);
    setSections(shuffled);
    setDroppedSections([]);
    setIsCompleted(false);
    setShowFeedback(false);
    setAttempts(0);
  };

  const getFeedback = () => {
    if (!showFeedback) return null;

    if (isCompleted) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">Perfect! You got it right!</h3>
          </div>
          <p className="text-green-700 mt-2">
            You've correctly arranged the call flow in the proper sequence. This is the logical progression 
            that ensures you gather all necessary information before presenting solutions.
          </p>
        </div>
      );
    } else {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-red-800">Not quite right. Let's try again!</h3>
          </div>
          <p className="text-red-700 mt-2">
            Remember: Start with introduction and rapport building, then gather information, 
            analyze their situation, present the 5 options systematically, explain the program, 
            and finally close with next steps.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link 
            to="/exercises" 
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Exercises
          </Link>
        </div>
        
        <div className="flex items-center mb-4">
          <Target className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Call Flow Builder</h1>
            <p className="text-lg text-gray-600">Arrange the call sections in the correct chronological order</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">Instructions</h2>
        <div className="text-blue-800 space-y-2">
          <p>• Drag the call sections from the left panel into the correct order on the right</p>
          <p>• You can reorder sections by dragging them to different positions in the sequence</p>
          <p>• Use the × button or drag sections back to the left to remove them from the sequence</p>
          <p>• Arrange them in the sequence they should occur during a call</p>
          <p>• Click "Check Answer" when you're ready to verify your arrangement</p>
        </div>
      </div>

      {/* Feedback */}
      {getFeedback()}

      {/* Drag and Drop Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Sections */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Sections</h3>
          <div className="min-h-[400px] p-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
            {sections.map((section) => (
              <div
                key={section.id}
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                className={`
                  mb-3 p-4 bg-white rounded-lg shadow-sm border transition-all cursor-move
                  hover:shadow-md
                  ${section.isCorrect ? 'border-green-200' : 'border-red-200 bg-red-50'}
                `}
              >
                <h4 className="font-semibold text-gray-900 mb-1">{section.title}</h4>
                <p className="text-sm text-gray-600">{section.description}</p>
                {!section.isCorrect && (
                  <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                    Incorrect Option
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call Flow Sequence */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Flow Sequence</h3>
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'call-flow')}
            className="min-h-[400px] p-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
          >
            {droppedSections.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Target className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p>Drag call sections here to build your flow</p>
                </div>
              </div>
            ) : (
              droppedSections.map((section, index) => (
                <div key={section.id}>
                  {/* Insertion indicator */}
                  {dragOverIndex === index && draggedItem && sections.find(s => s.id === draggedItem) && (
                    <div className="mb-2 h-1 bg-blue-400 rounded-full opacity-75"></div>
                  )}
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, section.id)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      setDragOverIndex(index);
                    }}
                    onDragLeave={() => setDragOverIndex(null)}
                    onDrop={(e) => {
                      e.stopPropagation();
                      handleDropOnItem(e, index);
                      setDragOverIndex(null);
                    }}
                    className={`
                      mb-3 p-4 bg-white rounded-lg shadow-sm border transition-all cursor-move hover:shadow-md
                      ${dragOverIndex === index ? 'border-blue-400 bg-blue-50 shadow-lg' : 'border-green-200 hover:border-blue-300'}
                    `}
                  >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{section.title}</h4>
                        <p className="text-sm text-gray-600">{section.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // Remove from dropped sections
                        setDroppedSections(prev => prev.filter(s => s.id !== section.id));
                        // Add back to available sections (with duplicate check)
                        setSections(prev => {
                          if (prev.find(s => s.id === section.id)) {
                            return prev;
                          }
                          return [...prev, section];
                        });
                      }}
                      className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Move back to available sections"
                    >
                      ×
                    </button>
                  </div>
                  </div>
                </div>
              ))
            )}
            
            {/* Drop zone at the end for adding items to the bottom */}
            {droppedSections.length > 0 && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                  setDragOverIndex(droppedSections.length);
                }}
                onDragLeave={() => setDragOverIndex(null)}
                onDrop={(e) => {
                  e.stopPropagation();
                  handleDropOnItem(e, droppedSections.length);
                  setDragOverIndex(null);
                }}
                className={`
                  h-4 transition-all
                  ${dragOverIndex === droppedSections.length ? 'bg-blue-400 rounded-full opacity-75' : ''}
                `}
              />
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={resetExercise}
          className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </button>
        <button
          onClick={checkAnswer}
          disabled={droppedSections.length === 0}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Check Answer
        </button>
      </div>

      {/* Progress */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Attempts: {attempts} | Sections placed: {droppedSections.length}/{correctOrder.length}
      </div>
    </div>
  );
};
