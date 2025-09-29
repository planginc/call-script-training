import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search,
  HelpCircle,
  FileText,
  Phone
} from 'lucide-react';
import { scriptContent } from '../../data/scriptContent';

export const Dashboard: React.FC = () => {
  const totalScripts = scriptContent.length;

  const quickActions = [
    {
      title: 'Scripts Reference',
      description: 'Access all call scripts and compliance requirements',
      icon: FileText,
      link: '/module/intro',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Compliance Glossary',
      description: 'Quick lookup for legal terms and requirements',
      icon: HelpCircle,
      link: '/glossary',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Flashcards',
      description: 'Key scripts, questions, and state-specific info',
      icon: BookOpen,
      link: '/flashcards',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Search Scripts',
      description: 'Find specific content quickly',
      icon: Search,
      link: '/search',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ClearOne Advantage Scripts
        </h1>
        <p className="text-gray-600">
          Quick access to call scripts, compliance requirements, and reference materials for phone calls.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="flex items-center p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-white shadow-sm"
          >
            <div className={`p-3 rounded-lg ${action.color} text-white`}>
              <action.icon className="h-6 w-6" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Script Overview */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Scripts ({totalScripts})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scriptContent.map((script, index) => (
            <Link
              key={script.id}
              to={`/module/${script.id}`}
              className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              style={{
                backgroundColor: script.color ? `${script.color}10` : undefined,
                borderLeftColor: script.color || undefined,
                borderLeftWidth: '4px'
              }}
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {index + 1}. {script.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {script.subsections.length} sections
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Phone Call Tips */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center">
          <Phone className="h-8 w-8 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Phone Call Ready</h2>
            <p className="text-green-100">
              All scripts are optimized for phone use with clear compliance requirements and easy navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};