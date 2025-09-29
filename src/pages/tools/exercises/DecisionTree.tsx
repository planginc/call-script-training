import React, { useState } from 'react';
import { ArrowLeft, GitBranch, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DecisionNode {
  id: string;
  title: string;
  description: string;
  question: string;
  options: {
    text: string;
    response: string;
    nextNode?: string;
    isCorrect?: boolean;
  }[];
  isCompleted: boolean;
  isCorrect: boolean;
}

const decisionTree: DecisionNode[] = [
  {
    id: 'start',
    title: 'Client Situation Assessment',
    description: 'Begin by understanding the client\'s current financial situation',
    question: 'What is the client\'s current payment status?',
    options: [
      {
        text: 'Current on payments',
        response: 'If they\'re current, they likely don\'t need debt settlement. This eliminates them as a prospect.',
        nextNode: 'eliminate-current'
      },
      {
        text: 'Past due on payments',
        response: 'Perfect! Being past due means they\'re struggling and need help. Let\'s explore their options.',
        nextNode: 'explore-options'
      }
    ],
    isCompleted: false,
    isCorrect: false
  },
  {
    id: 'explore-options',
    title: 'The 5 Options Analysis',
    description: 'Systematically eliminate each option to lead to debt settlement',
    question: 'Let\'s explore their options. What would you ask about paying off on their own?',
    options: [
      {
        text: 'How much are you paying monthly?',
        response: 'Correct! This reveals they\'re likely only paying minimums, which means it will take 20+ years to pay off. This eliminates "pay off on their own."',
        nextNode: 'option-2',
        isCorrect: true
      },
      {
        text: 'Do you have extra money each month?',
        response: 'This is good, but we need to quantify their current payments first to show the math doesn\'t work.',
        nextNode: 'option-2',
        isCorrect: false
      }
    ],
    isCompleted: false,
    isCorrect: false
  },
  {
    id: 'option-2',
    title: 'Option 2: Consolidation Loan',
    description: 'Eliminate the consolidation loan option',
    question: 'Now let\'s explore consolidation loans. What question reveals why this won\'t work?',
    options: [
      {
        text: 'What\'s your credit score?',
        response: 'Exactly! Most people behind on payments have damaged credit (below 650), making them ineligible for consolidation loans.',
        nextNode: 'option-3',
        isCorrect: true
      },
      {
        text: 'Do you have collateral?',
        response: 'This is relevant, but credit score is the primary barrier for most people in this situation.',
        nextNode: 'option-3',
        isCorrect: false
      }
    ],
    isCompleted: false,
    isCorrect: false
  },
  {
    id: 'option-3',
    title: 'Option 3: Consumer Credit Counseling',
    description: 'Eliminate the credit counseling option',
    question: 'Now for credit counseling. What\'s the key question that eliminates this option?',
    options: [
      {
        text: 'Are you current on your payments?',
        response: 'Perfect! Credit counseling requires you to be current on payments, but our clients are behind. This eliminates credit counseling.',
        nextNode: 'option-4',
        isCorrect: true
      },
      {
        text: 'Do you have steady income?',
        response: 'Income is important, but the payment status requirement is what eliminates credit counseling for our clients.',
        nextNode: 'option-4',
        isCorrect: false
      }
    ],
    isCompleted: false,
    isCorrect: false
  },
  {
    id: 'option-4',
    title: 'Option 4: Do Nothing',
    description: 'Eliminate the "do nothing" option',
    question: 'What happens if they do nothing? What question reveals the consequences?',
    options: [
      {
        text: 'What happens if you continue making minimum payments?',
        response: 'Exactly! This shows them it will take 20+ years and cost 3x the original debt. The consequences are too severe to do nothing.',
        nextNode: 'debt-settlement',
        isCorrect: true
      },
      {
        text: 'Are you getting collection calls?',
        response: 'This is part of it, but we need to show the long-term financial impact of doing nothing.',
        nextNode: 'debt-settlement',
        isCorrect: false
      }
    ],
    isCompleted: false,
    isCorrect: false
  },
  {
    id: 'debt-settlement',
    title: 'Debt Settlement - The Solution',
    description: 'Present debt settlement as the logical conclusion',
    question: 'Now that we\'ve eliminated the other options, what makes debt settlement the best choice?',
    options: [
      {
        text: 'It\'s the only option that works for people behind on payments',
        response: 'Perfect! Debt settlement is specifically designed for people who are behind on payments and can\'t qualify for other solutions.',
        nextNode: 'complete',
        isCorrect: true
      },
      {
        text: 'It\'s the cheapest option',
        response: 'While it can be cost-effective, the key point is that it\'s the only viable option for their situation.',
        nextNode: 'complete',
        isCorrect: false
      }
    ],
    isCompleted: false,
    isCorrect: false
  },
  {
    id: 'eliminate-current',
    title: 'Not a Qualified Prospect',
    description: 'Client is current on payments',
    question: 'This client is current on payments. What should you do?',
    options: [
      {
        text: 'Continue with the debt settlement presentation',
        response: 'Incorrect. If they\'re current on payments, they likely don\'t need debt settlement services.',
        nextNode: 'complete',
        isCorrect: false
      },
      {
        text: 'Thank them and end the call professionally',
        response: 'Correct! If they\'re current on payments, they\'re not a qualified prospect for debt settlement.',
        nextNode: 'complete',
        isCorrect: true
      }
    ],
    isCompleted: false,
    isCorrect: false
  }
];

export const DecisionTree: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentNode = decisionTree.find(node => node.id === currentNodeId);
  const progress = (completedNodes.size / decisionTree.length) * 100;

  const handleOptionSelect = (option: any) => {
    if (!currentNode) return;

    setShowFeedback(true);
    setCompletedNodes(prev => new Set([...prev, currentNodeId]));
    
    if (option.isCorrect) {
      setScore(prev => prev + 1);
    }

    // Move to next node or complete
    if (option.nextNode === 'complete') {
      setIsCompleted(true);
    } else if (option.nextNode) {
      setCurrentNodeId(option.nextNode);
    }
  };

  const resetExercise = () => {
    setCurrentNodeId('start');
    setCompletedNodes(new Set());
    setScore(0);
    setIsCompleted(false);
    setShowFeedback(false);
  };

  const getFeedback = () => {
    if (!showFeedback || !currentNode) return null;

    const selectedOption = currentNode.options.find(opt => opt.isCorrect);
    if (!selectedOption) return null;

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Explanation</h3>
            <p className="text-blue-700">{selectedOption.response}</p>
          </div>
        </div>
      </div>
    );
  };

  const getCompletionMessage = () => {
    if (!isCompleted) return null;

    const percentage = Math.round((score / decisionTree.length) * 100);
    
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">Exercise Complete!</h3>
          <p className="text-green-700 mb-4">
            You scored {score} out of {decisionTree.length} correct answers ({percentage}%)
          </p>
          <p className="text-green-600">
            You've mastered the systematic approach to disqualifying options and leading clients 
            to the conclusion that debt settlement is their best choice.
          </p>
        </div>
      </div>
    );
  };

  if (!currentNode) return null;

  return (
    <div className="max-w-4xl mx-auto">
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
          <GitBranch className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">5 Options Decision Tree</h1>
            <p className="text-lg text-gray-600">Practice the systematic disqualification logic</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{completedNodes.size} of {decisionTree.length} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Completion Message */}
      {getCompletionMessage()}

      {/* Current Node */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{currentNode.title}</h2>
          <p className="text-gray-600 mb-4">{currentNode.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{currentNode.question}</h3>
          <div className="space-y-3">
            {currentNode.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
              >
                <span className="font-medium text-gray-900">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback */}
      {getFeedback()}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How This Works</h3>
        <div className="text-blue-800 space-y-2">
          <p>• Click through each decision point to see the logical progression</p>
          <p>• Each question is designed to eliminate an option systematically</p>
          <p>• The goal is to lead clients to conclude debt settlement is their best choice</p>
          <p>• Pay attention to the strategic questioning that reveals why other options won't work</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={resetExercise}
          className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Exercise
        </button>
      </div>

      {/* Score Display */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Score: {score} / {decisionTree.length} | Progress: {Math.round(progress)}%
      </div>
    </div>
  );
};
