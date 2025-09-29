import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  HelpCircle, 
  AlertTriangle,
  Target,
  FileText
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate 
}) => {

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:fixed lg:inset-y-0 lg:left-0 lg:shadow-none lg:border-r lg:border-gray-200
        max-h-screen overflow-y-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <div className="p-4">
              {/* Scripts Section */}
              <div className="space-y-2 mb-8">
                <Link
                  to="/scripts"
                  onClick={() => onClose()}
                  className="w-full flex items-center px-3 py-3 text-sm font-medium text-white rounded-md hover:bg-blue-600 transition-colors"
                  style={{ backgroundColor: '#3b82f6' }}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  SCRIPTS
                </Link>
              </div>

              {/* Tools Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  TOOLS
                </h3>
                <Link
                  to="/glossary"
                  onClick={() => onClose()}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                >
                  <Search className="h-4 w-4 mr-3" />
                  Compliance Glossary
                </Link>
                <Link
                  to="/flashcards"
                  onClick={() => onClose()}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                >
                  <HelpCircle className="h-4 w-4 mr-3" />
                  Flashcards
                </Link>
                <Link
                  to="/exercises"
                  onClick={() => onClose()}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                >
                  <Target className="h-4 w-4 mr-3" />
                  Interactive Exercises
                </Link>
              </div>

              {/* Compliance Alert */}
              <div className="mt-8 p-3 bg-compliance-yellow border border-compliance-red rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-compliance-red mr-2 mt-0.5" />
                  <div className="text-xs text-compliance-red">
                    <div className="font-semibold mb-1">Compliance Critical</div>
                    <div>All verbatim scripts must be used exactly as written</div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
