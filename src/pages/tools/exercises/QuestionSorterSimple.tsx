import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: string;
  text: string;
  correctCategory: 'current' | 'past-due';
  explanation: string;
}

const questions: Question[] = [
  {
    id: 'monthly-payment',
    text: 'How much are you paying monthly?',
    correctCategory: 'current',
    explanation: 'This helps assess if they can afford their current payments and reveals if they\'re only paying minimums.'
  },
  {
    id: 'behind-duration',
    text: 'How long have you been behind?',
    correctCategory: 'past-due',
    explanation: 'This is crucial for past-due clients to understand the severity and urgency of their situation.'
  },
  {
    id: 'creditor-calls',
    text: 'Do you receive creditor calls?',
    correctCategory: 'past-due',
    explanation: 'Creditor calls are a key indicator of being past due and the pressure they\'re under.'
  },
  {
    id: 'minimum-payments',
    text: 'Are you only paying minimums?',
    correctCategory: 'current',
    explanation: 'This reveals if they\'re current but struggling, and shows the long-term impact of minimum payments.'
  },
  {
    id: 'extra-money',
    text: 'Do you have extra money each month?',
    correctCategory: 'current',
    explanation: 'This helps determine if they could potentially pay more than minimums to get ahead.'
  },
  {
    id: 'collection-threats',
    text: 'Are you getting collection threats?',
    correctCategory: 'past-due',
    explanation: 'Collection threats indicate serious delinquency and the need for immediate intervention.'
  },
  {
    id: 'payment-history',
    text: 'What\'s your payment history like?',
    correctCategory: 'current',
    explanation: 'This helps assess their overall financial responsibility and ability to maintain payments.'
  },
  {
    id: 'creditor-actions',
    text: 'What actions have creditors taken?',
    correctCategory: 'past-due',
    explanation: 'This reveals the severity of their past-due status and what consequences they\'re facing.'
  },
  {
    id: 'budget-analysis',
    text: 'Can you afford your current payments?',
    correctCategory: 'current',
    explanation: 'This determines if they\'re current but struggling, which affects the approach and solutions offered.'
  },
  {
    id: 'urgency-level',
    text: 'How urgent is your situation?',
    correctCategory: 'past-due',
    explanation: 'This helps gauge the severity and urgency for past-due clients who need immediate help.'
  }
];

export const QuestionSorterSimple: React.FC = () => {
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [pastDueQuestions, setPastDueQuestions] = useState<Question[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    // Initialize questions on component mount
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setAvailableQuestions(shuffled);
    setCurrentQuestions([]);
    setPastDueQuestions([]);
    setIsCompleted(false);
    setShowFeedback(false);
  }, []); // Only run on mount

  const handleDragStart = (e: React.DragEvent, questionId: string) => {
    setDraggedItem(questionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetCategory: 'current' | 'past-due' | 'available') => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const question = [...availableQuestions, ...currentQuestions, ...pastDueQuestions]
      .find(q => q.id === draggedItem);

    if (!question) return;

    // Remove from source and add to destination in one operation to prevent duplicates
    if (targetCategory === 'available') {
      setAvailableQuestions(prev => [...prev.filter(q => q.id !== draggedItem), question]);
      setCurrentQuestions(prev => prev.filter(q => q.id !== draggedItem));
      setPastDueQuestions(prev => prev.filter(q => q.id !== draggedItem));
    } else if (targetCategory === 'current') {
      setCurrentQuestions(prev => [...prev.filter(q => q.id !== draggedItem), question]);
      setAvailableQuestions(prev => prev.filter(q => q.id !== draggedItem));
      setPastDueQuestions(prev => prev.filter(q => q.id !== draggedItem));
    } else if (targetCategory === 'past-due') {
      setPastDueQuestions(prev => [...prev.filter(q => q.id !== draggedItem), question]);
      setAvailableQuestions(prev => prev.filter(q => q.id !== draggedItem));
      setCurrentQuestions(prev => prev.filter(q => q.id !== draggedItem));
    }
    
    setDraggedItem(null);
  };

  const checkAnswer = () => {
    setAttempts(prev => prev + 1);
    setShowFeedback(true);

    const currentCorrect = currentQuestions.every(q => q.correctCategory === 'current');
    const pastDueCorrect = pastDueQuestions.every(q => q.correctCategory === 'past-due');
    const allSorted = availableQuestions.length === 0;

    setIsCompleted(currentCorrect && pastDueCorrect && allSorted);
  };

  const resetExercise = () => {
    // Shuffle questions so they're in random order
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setAvailableQuestions(shuffled);
    setCurrentQuestions([]);
    setPastDueQuestions([]);
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
            <h3 className="text-lg font-semibold text-green-800">Excellent work!</h3>
          </div>
          <p className="text-green-700 mt-2">
            You've correctly sorted all questions into their appropriate categories. This shows you understand 
            which questions are most effective for different client situations.
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
            Remember: Questions about payment amounts, minimums, and budget analysis are for current clients. 
            Questions about being behind, creditor calls, and urgency are for past-due clients.
          </p>
        </div>
      );
    }
  };

  const getQuestionExplanation = (question: Question) => {
    return (
      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">{question.explanation}</p>
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
          <HelpCircle className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discovery Question Sorter</h1>
            <p className="text-lg text-gray-600">Match questions to client situations</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-purple-900 mb-3">Instructions</h2>
        <div className="text-purple-800 space-y-2">
          <p>• Drag questions from the center panel to the appropriate client situation</p>
          <p>• <strong>Current on Payments:</strong> Questions about payment amounts, budget analysis, and financial capacity</p>
          <p>• <strong>Past Due on Payments:</strong> Questions about being behind, creditor pressure, and urgency</p>
          <p>• Click "Check Answer" when you've sorted all questions</p>
        </div>
      </div>

      {/* Feedback */}
      {getFeedback()}

      {/* Drag and Drop Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current on Payments */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Current on Payments
          </h3>
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'current')}
            className="min-h-[400px] p-4 rounded-lg border-2 border-dashed border-green-300 bg-green-50"
          >
            {currentQuestions.map((question) => (
              <div
                key={question.id}
                draggable
                onDragStart={(e) => handleDragStart(e, question.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'available')}
                className="mb-3 p-3 bg-white rounded-lg shadow-sm border border-green-200 transition-all cursor-move hover:shadow-md"
              >
                <p className="font-medium text-gray-900 text-sm">{question.text}</p>
                {getQuestionExplanation(question)}
              </div>
            ))}
            {currentQuestions.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p>Drag questions here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Available Questions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Questions</h3>
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'available')}
            className="min-h-[400px] p-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
          >
            {availableQuestions.map((question) => (
              <div
                key={question.id}
                draggable
                onDragStart={(e) => handleDragStart(e, question.id)}
                className="mb-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200 transition-all cursor-move hover:shadow-md"
              >
                <p className="font-medium text-gray-900 text-sm">{question.text}</p>
              </div>
            ))}
            {availableQuestions.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p>All questions sorted!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Past Due on Payments */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            Past Due on Payments
          </h3>
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'past-due')}
            className="min-h-[400px] p-4 rounded-lg border-2 border-dashed border-red-300 bg-red-50"
          >
            {pastDueQuestions.map((question) => (
              <div
                key={question.id}
                draggable
                onDragStart={(e) => handleDragStart(e, question.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'available')}
                className="mb-3 p-3 bg-white rounded-lg shadow-sm border border-red-200 transition-all cursor-move hover:shadow-md"
              >
                <p className="font-medium text-gray-900 text-sm">{question.text}</p>
                {getQuestionExplanation(question)}
              </div>
            ))}
            {pastDueQuestions.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p>Drag questions here</p>
                </div>
              </div>
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
          disabled={availableQuestions.length > 0}
          className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Check Answer
        </button>
      </div>

      {/* Progress */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Attempts: {attempts} | Questions sorted: {questions.length - availableQuestions.length}/{questions.length}
      </div>
    </div>
  );
};
