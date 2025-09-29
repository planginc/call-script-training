import React from 'react';
import { CheckCircle2, Clock, Circle } from 'lucide-react';

interface ProgressTrackerProps {
  currentModule: string;
  completedModules: string[];
  className?: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  currentModule, 
  completedModules, 
  className = '' 
}) => {
  const modules = [
    { id: 'intro-opening', title: 'Opening', short: '1' },
    { id: 'discovery', title: 'Discovery', short: '2' },
    { id: 'authorization', title: 'Auth', short: '3' },
    { id: 'debt-verification', title: 'Verify', short: '4' },
    { id: 'five-options', title: 'Options', short: '5' },
    { id: 'program-explanation', title: 'Program', short: '6' },
    { id: 'closing', title: 'Closing', short: '7' }
  ];

  const getModuleStatus = (moduleId: string) => {
    if (completedModules.includes(moduleId)) return 'completed';
    if (moduleId === currentModule) return 'current';
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Circle className="h-5 w-5 text-gray-300" />;
      default:
        return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const completedCount = completedModules.length;
  const totalCount = modules.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Training Progress</h3>
        <div className="text-sm text-gray-500">
          {completedCount} of {totalCount} modules
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Module Steps */}
      <div className="overflow-x-auto">
        <div className="flex items-center justify-between min-w-max px-2">
          {modules.map((module, index) => {
            const status = getModuleStatus(module.id);
            const isLast = index === modules.length - 1;
            
            return (
              <div key={module.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold
                    ${getStatusColor(status)}
                  `}>
                    {getStatusIcon(status)}
                  </div>
                  <div className="mt-1 text-xs text-gray-600 text-center w-12 truncate">
                    {module.title}
                  </div>
                </div>
                {!isLast && (
                  <div className={`
                    w-6 h-0.5 mx-1
                    ${status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Module Info */}
      {currentModule && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium text-blue-900">
            Currently studying: {modules.find(m => m.id === currentModule)?.title}
          </div>
          <div className="text-xs text-blue-700 mt-1">
            Complete this module to continue your training
          </div>
        </div>
      )}
    </div>
  );
};
