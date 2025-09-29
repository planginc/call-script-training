import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, CheckCircle, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComplianceStatement {
  id: string;
  text: string;
  correctMoment: string;
  explanation: string;
  legalRequirement: string;
}

interface CallMoment {
  id: string;
  title: string;
  description: string;
  correctStatements: string[];
}

const complianceStatements: ComplianceStatement[] = [
  {
    id: 'recorded-line',
    text: 'This call is being recorded for quality and training purposes',
    correctMoment: 'opening',
    explanation: 'Must be stated at the very beginning of the call before any substantive conversation.',
    legalRequirement: 'State and federal recording laws require disclosure before recording begins.'
  },
  {
    id: 'fcra-authorization',
    text: 'I need your authorization to pull your credit report under the Fair Credit Reporting Act',
    correctMoment: 'credit-analysis',
    explanation: 'Required before accessing any credit information during the analysis phase.',
    legalRequirement: 'FCRA requires written or recorded authorization before credit report access.'
  },
  {
    id: 'opt-out-right',
    text: 'You can opt out of this program at any time',
    correctMoment: 'program-explanation',
    explanation: 'Must be clearly stated when explaining the program terms and conditions.',
    legalRequirement: 'Consumer protection laws require clear opt-out disclosure.'
  },
  {
    id: 'no-guarantee',
    text: 'We cannot guarantee specific results or settlement amounts',
    correctMoment: 'program-explanation',
    explanation: 'Required when discussing potential outcomes to avoid misleading claims.',
    legalRequirement: 'FTC regulations prohibit guarantees of specific debt settlement results.'
  },
  {
    id: 'fees-disclosure',
    text: 'Our fees are based on the amount of debt enrolled, not the amount saved',
    correctMoment: 'program-explanation',
    explanation: 'Must be clearly explained when discussing program costs and fee structure.',
    legalRequirement: 'Truth in Lending Act requires clear fee disclosure.'
  },
  {
    id: 'creditor-contact',
    text: 'You should not make payments directly to creditors while enrolled',
    correctMoment: 'program-explanation',
    explanation: 'Critical instruction that must be given when explaining the program process.',
    legalRequirement: 'Required to prevent conflicts with debt settlement process.'
  },
  {
    id: 'timeframe-disclosure',
    text: 'The program typically takes 24-48 months to complete',
    correctMoment: 'program-explanation',
    explanation: 'Must provide realistic timeframe expectations during program explanation.',
    legalRequirement: 'Consumer protection requires realistic timeframe disclosure.'
  },
  {
    id: 'credit-impact',
    text: 'This program may negatively impact your credit score',
    correctMoment: 'program-explanation',
    explanation: 'Required disclosure about potential credit consequences.',
    legalRequirement: 'FTC requires disclosure of potential negative credit impacts.'
  }
];

const callMoments: CallMoment[] = [
  {
    id: 'opening',
    title: 'Call Opening',
    description: 'Initial greeting and call setup',
    correctStatements: ['recorded-line']
  },
  {
    id: 'discovery',
    title: 'Discovery Phase',
    description: 'Gathering client information and situation details',
    correctStatements: []
  },
  {
    id: 'credit-analysis',
    title: 'Credit Analysis',
    description: 'Reviewing client\'s financial position and credit status',
    correctStatements: ['fcra-authorization']
  },
  {
    id: 'five-options',
    title: '5 Options Presentation',
    description: 'Presenting and disqualifying alternative solutions',
    correctStatements: []
  },
  {
    id: 'program-explanation',
    title: 'Program Explanation',
    description: 'Detailing the debt settlement program terms and process',
    correctStatements: ['opt-out-right', 'no-guarantee', 'fees-disclosure', 'creditor-contact', 'timeframe-disclosure', 'credit-impact']
  },
  {
    id: 'closing',
    title: 'Closing & Next Steps',
    description: 'Securing commitment and outlining next steps',
    correctStatements: []
  }
];

export const ComplianceCheckpointSimple: React.FC = () => {
  const [availableStatements, setAvailableStatements] = useState<ComplianceStatement[]>([]);
  const [placedStatements, setPlacedStatements] = useState<{[key: string]: ComplianceStatement[]}>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with all statements available on component mount
    setAvailableStatements([...complianceStatements]);
    setPlacedStatements({});
    setIsCompleted(false);
    setShowFeedback(false);
    setScore(0);
  }, []); // Only run on mount

  const handleDragStart = (e: React.DragEvent, statementId: string) => {
    setDraggedItem(statementId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetMoment: string) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const statement = [...availableStatements, ...Object.values(placedStatements).flat()]
      .find(s => s.id === draggedItem);

    if (!statement) return;

    // Remove from source and add to destination in one operation to prevent duplicates
    if (targetMoment === 'available') {
      setAvailableStatements(prev => [...prev.filter(s => s.id !== draggedItem), statement]);
      // Remove from all placed statements
      setPlacedStatements(prev => {
        const newPlacedStatements = { ...prev };
        Object.keys(newPlacedStatements).forEach(momentId => {
          newPlacedStatements[momentId] = newPlacedStatements[momentId].filter(s => s.id !== draggedItem);
        });
        return newPlacedStatements;
      });
    } else {
      // Remove from available statements
      setAvailableStatements(prev => prev.filter(s => s.id !== draggedItem));
      // Remove from all other placed statements and add to target
      setPlacedStatements(prev => {
        const newPlacedStatements = { ...prev };
        Object.keys(newPlacedStatements).forEach(momentId => {
          newPlacedStatements[momentId] = newPlacedStatements[momentId].filter(s => s.id !== draggedItem);
        });
        newPlacedStatements[targetMoment] = [...(newPlacedStatements[targetMoment] || []), statement];
        return newPlacedStatements;
      });
    }
    
    setDraggedItem(null);
  };

  const checkAnswer = () => {
    setAttempts(prev => prev + 1);
    setShowFeedback(true);

    let correct = 0;
    let total = 0;

    callMoments.forEach(moment => {
      const placed = placedStatements[moment.id] || [];
      const correctForMoment = moment.correctStatements;
      
      // Check if all correct statements are placed
      const allCorrectPlaced = correctForMoment.every(statementId => 
        placed.some(s => s.id === statementId)
      );
      
      // Check if no incorrect statements are placed
      const noIncorrectPlaced = placed.every(statement => 
        correctForMoment.includes(statement.id)
      );

      if (allCorrectPlaced && noIncorrectPlaced) {
        correct += correctForMoment.length;
      }
      total += correctForMoment.length;
    });

    setScore(correct);
    setIsCompleted(correct === total && availableStatements.length === 0);
  };

  const resetExercise = () => {
    // Reset all statements to available
    setAvailableStatements([...complianceStatements]);
    setPlacedStatements({});
    setIsCompleted(false);
    setShowFeedback(false);
    setScore(0);
    setAttempts(0);
  };

  const getFeedback = () => {
    if (!showFeedback) return null;

    const percentage = Math.round((score / complianceStatements.length) * 100);

    if (isCompleted) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">Perfect compliance placement!</h3>
          </div>
          <p className="text-green-700 mt-2">
            You've correctly placed all compliance statements in their appropriate moments. 
            This ensures legal requirements are met throughout the call process.
          </p>
        </div>
      );
    } else {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-red-800">Some placements need adjustment</h3>
          </div>
          <p className="text-red-700 mt-2">
            You scored {score} out of {complianceStatements.length} correct ({percentage}%). 
            Review the legal requirements and timing for each compliance statement.
          </p>
        </div>
      );
    }
  };

  const getStatementExplanation = (statement: ComplianceStatement) => {
    return (
      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">{statement.explanation}</p>
        <div className="flex items-start">
          <AlertTriangle className="h-4 w-4 text-orange-500 mr-1 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-orange-700">{statement.legalRequirement}</p>
        </div>
      </div>
    );
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
          <Shield className="h-8 w-8 text-red-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Compliance Checkpoint</h1>
            <p className="text-lg text-gray-600">Place compliance statements in the correct call moments</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-red-900 mb-3">Instructions</h2>
        <div className="text-red-800 space-y-2">
          <p>• Drag compliance statements to the appropriate moments in the call flow</p>
          <p>• Each statement has specific legal requirements and timing</p>
          <p>• Pay attention to the explanations and legal requirements for each statement</p>
          <p>• Click "Check Answer" when you've placed all statements</p>
        </div>
      </div>

      {/* Feedback */}
      {getFeedback()}

      {/* Drag and Drop Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Statements */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Statements</h3>
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'available')}
            className="min-h-[400px] p-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
          >
            {availableStatements.map((statement) => (
              <div
                key={statement.id}
                draggable
                onDragStart={(e) => handleDragStart(e, statement.id)}
                className="mb-3 p-4 bg-white rounded-lg shadow-sm border border-red-200 transition-all cursor-move hover:shadow-md"
              >
                <p className="font-medium text-gray-900 text-sm mb-2">{statement.text}</p>
                {getStatementExplanation(statement)}
              </div>
            ))}
            {availableStatements.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p>All statements placed!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call Flow Moments */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Flow Moments</h3>
          <div className="space-y-4">
            {callMoments.map((moment) => (
              <div key={moment.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900">{moment.title}</h4>
                  <p className="text-sm text-gray-600">{moment.description}</p>
                </div>
                
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, moment.id)}
                  className="min-h-[80px] p-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
                >
                  {(placedStatements[moment.id] || []).map((statement) => (
                    <div
                      key={statement.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, statement.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'available')}
                      className={`
                        mb-2 p-2 bg-white rounded border transition-all cursor-move hover:shadow-md
                        ${moment.correctStatements.includes(statement.id) 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-red-200 bg-red-50'
                        }
                      `}
                    >
                      <p className="text-xs font-medium text-gray-900">{statement.text}</p>
                    </div>
                  ))}
                  {(placedStatements[moment.id] || []).length === 0 && (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      Drop statements here
                    </div>
                  )}
                </div>
              </div>
            ))}
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
          disabled={availableStatements.length > 0}
          className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Check Answer
        </button>
      </div>

      {/* Progress */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Attempts: {attempts} | Score: {score}/{complianceStatements.length} | 
        Statements placed: {complianceStatements.length - availableStatements.length}/{complianceStatements.length}
      </div>
    </div>
  );
};
