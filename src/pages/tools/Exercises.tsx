import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Target, 
  GitBranch, 
  HelpCircle, 
  Shield,
  CheckCircle,
  Clock
} from 'lucide-react';

const exercises = [
  {
    id: 'call-flow-builder',
    title: 'Call Flow Builder',
    description: 'Test your understanding of the overall call sequence by arranging the major call sections in the correct chronological order.',
    icon: Target,
    difficulty: 'Beginner',
    estimatedTime: '5-10 min',
    path: '/exercises/call-flow-builder',
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    iconColor: 'text-blue-600'
  },
  {
    id: 'decision-tree',
    title: '5 Options Decision Tree',
    description: 'Practice the systematic disqualification logic that leads clients to conclude Debt Settlement is their best option.',
    icon: GitBranch,
    difficulty: 'Intermediate',
    estimatedTime: '10-15 min',
    path: '/exercises/decision-tree',
    color: 'bg-green-50 border-green-200 text-green-800',
    iconColor: 'text-green-600'
  },
  {
    id: 'question-sorter',
    title: 'Discovery Question Sorter',
    description: 'Match appropriate discovery questions to different client situations (current vs. past due on payments).',
    icon: HelpCircle,
    difficulty: 'Intermediate',
    estimatedTime: '8-12 min',
    path: '/exercises/question-sorter',
    color: 'bg-purple-50 border-purple-200 text-purple-800',
    iconColor: 'text-purple-600'
  },
  {
    id: 'compliance-checkpoint',
    title: 'Compliance Checkpoint',
    description: 'Identify where specific compliance statements belong in the call flow to ensure legal requirements are met.',
    icon: Shield,
    difficulty: 'Advanced',
    estimatedTime: '10-15 min',
    path: '/exercises/compliance-checkpoint',
    color: 'bg-red-50 border-red-200 text-red-800',
    iconColor: 'text-red-600'
  }
];

export const Exercises: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Sample Feature Disclaimer */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 rounded-r-lg">
        <div className="flex items-start">
          <div className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0">⚠️</div>
          <div>
            <h3 className="text-sm font-semibold text-amber-800 mb-1">
              Sample Features - Incomplete Demos
            </h3>
            <p className="text-sm text-amber-700">
              These are samples of additional possibilities that can be built into a comprehensive training platform. 
              These interactive exercises demonstrate how AI can create engaging, adaptive learning experiences that go far beyond static training materials.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Interactive Exercises
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Practice and reinforce your understanding of the call script structure, decision-making logic, 
          and compliance requirements through hands-on interactive exercises.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
          <div className="flex items-center text-sm text-gray-500">
            <CheckCircle className="h-4 w-4 mr-1" />
            0 of 4 exercises completed
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((exercise) => {
          const IconComponent = exercise.icon;
          return (
            <Link
              key={exercise.id}
              to={exercise.path}
              className="group block"
            >
              <div className={`
                relative bg-white rounded-lg shadow-sm border-2 transition-all duration-200 
                hover:shadow-md hover:border-gray-300 group-hover:scale-[1.02]
                ${exercise.color}
              `}>
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`
                        p-3 rounded-lg bg-white shadow-sm mr-4
                        ${exercise.iconColor}
                      `}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {exercise.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {exercise.estimatedTime}
                          </div>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                            {exercise.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {exercise.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Start Exercise
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Not started</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          How to Use These Exercises
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Getting Started</h4>
            <ul className="space-y-1">
              <li>• Complete exercises in any order</li>
              <li>• Take your time to understand each concept</li>
              <li>• Use the reset button to try again</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Learning Tips</h4>
            <ul className="space-y-1">
              <li>• Read feedback carefully after each attempt</li>
              <li>• Review the script sections if you get stuck</li>
              <li>• Practice until you feel confident</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
