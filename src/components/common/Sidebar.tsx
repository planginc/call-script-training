import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  HelpCircle, 
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Target
} from 'lucide-react';
import { scriptContent } from '../../data/scriptContent';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentModule?: string;
  currentSubsection?: number;
  onModuleSelect: (moduleId: string) => void;
  onSubsectionSelect: (moduleId: string, subsectionIndex: number) => void;
  onNavigate: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  currentModule,
  currentSubsection,
  onModuleSelect,
  onSubsectionSelect,
  onNavigate 
}) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const handleModuleClick = (moduleId: string) => {
    onModuleSelect(moduleId);
    // Immediately show the first subsection of the selected module
    const module = scriptContent.find(m => m.id === moduleId);
    if (module && module.subsections && module.subsections.length > 0) {
      onSubsectionSelect(moduleId, 0);
      navigate(`/module/${moduleId}?subsection=0`);
    }
    toggleModule(moduleId);
    onClose();
  };

  const handleSubsectionClick = (moduleId: string, subsectionIndex: number) => {
    // Navigate to the module URL with subsection parameter
    navigate(`/module/${moduleId}?subsection=${subsectionIndex}`);
    onSubsectionSelect(moduleId, subsectionIndex);
    onClose();
  };

  // Removed module status since this is a reference tool, not a completion tracker

  // Removed status functions since this is a reference tool

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
        fixed inset-y-0 left-0 z-50 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
        max-h-screen overflow-y-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Training Modules</h2>
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
              {/* Tools */}
              <div className="space-y-2 mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Tools
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

              {/* Modules */}
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Scripts
                </h3>
                {scriptContent.map((module, index) => {
                  const isActive = currentModule === module.id;
                  const isExpanded = expandedModules.has(module.id);
                  
                  return (
                    <div key={module.id} className="space-y-1">
                      {/* Module Header */}
        <div
          onClick={() => handleModuleClick(module.id)}
          className={`
            w-full flex items-center px-3 py-2 text-sm rounded-md transition-all cursor-pointer
            ${isActive
              ? 'ring-2 ring-white ring-opacity-50 shadow-lg transform scale-105'
              : 'hover:shadow-md'
            }
          `}
          style={{
            backgroundColor: module.color || '#e5e7eb'
          }}
        >
                        <div className="flex items-center flex-1">
                          <span className="ml-3 font-medium text-gray-900">
                            {index + 1}. {module.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {module.subsections && module.subsections.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleModule(module.id);
                              }}
                              className="p-1 rounded hover:bg-gray-200 hover:bg-opacity-50"
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-gray-600" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-600" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Subsections */}
                      {isExpanded && module.subsections && (
                        <div className="ml-6 space-y-1">
                          {module.subsections.map((subsection, subIndex) => {
                            if (!subsection || !subsection.id) return null;
                            const isSubsectionActive = isActive && currentSubsection === subIndex;
                            
                            return (
                              <button
                                key={subsection.id}
                                onClick={() => handleSubsectionClick(module.id, subIndex)}
                                className={`
                                  w-full text-left px-3 py-2 text-sm rounded-md transition-colors
                                  ${isSubsectionActive
                                    ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-400'
                                    : 'text-gray-600 hover:bg-gray-50'
                                  }
                                `}
                              >
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-gray-400 mr-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {subsection.title || `Section ${subIndex + 1}`}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Compliance Alert */}
              <div className="mt-6 p-3 bg-compliance-yellow border border-compliance-red rounded-lg">
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
