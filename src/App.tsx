import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ModulePage } from './pages/modules/ModulePage';
import { Glossary } from './pages/tools/Glossary';
import { Flashcards } from './pages/tools/Flashcards';
import { SearchPage } from './pages/tools/Search';
import { Exercises } from './pages/tools/Exercises';
import { CallFlowBuilderSimple as CallFlowBuilder } from './pages/tools/exercises/CallFlowBuilderSimple';
import { DecisionTree } from './pages/tools/exercises/DecisionTree';
import { QuestionSorterSimple as QuestionSorter } from './pages/tools/exercises/QuestionSorterSimple';
import { ComplianceCheckpointSimple as ComplianceCheckpoint } from './pages/tools/exercises/ComplianceCheckpointSimple';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState<string>('intro');
  const [currentSubsection, setCurrentSubsection] = useState<number>(0);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleModuleSelect = (moduleId: string) => {
    setCurrentModule(moduleId);
    setCurrentSubsection(0); // Reset to first subsection when selecting a module
    setSidebarOpen(false);
  };

  const handleSubsectionSelect = (moduleId: string, subsectionIndex: number) => {
    setCurrentModule(moduleId);
    setCurrentSubsection(subsectionIndex);
    setSidebarOpen(false);
  };

  const handleSubsectionChange = (subsectionIndex: number) => {
    setCurrentSubsection(subsectionIndex);
  };

  const handleNavigate = (path: string) => {
    setSidebarOpen(false);
    // Navigation is handled by React Router Link components
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onMenuToggle={handleMenuToggle}
          onNavigate={handleNavigate}
        />
        
        <div className="flex">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            currentModule={currentModule}
            currentSubsection={currentSubsection}
            onModuleSelect={handleModuleSelect}
            onSubsectionSelect={handleSubsectionSelect}
            onNavigate={handleNavigate}
          />
          
          <main className="flex-1 lg:ml-80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
              <Routes>
                <Route path="/" element={<Navigate to="/module/intro" replace />} />
                <Route 
                  path="/module/:moduleId" 
                  element={
                    <ModulePage 
                      currentModule={currentModule}
                      currentSubsection={currentSubsection}
                      onSubsectionChange={handleSubsectionChange}
                    />
                  } 
                />
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/exercises/call-flow-builder" element={<CallFlowBuilder />} />
                <Route path="/exercises/decision-tree" element={<DecisionTree />} />
                <Route path="/exercises/question-sorter" element={<QuestionSorter />} />
                <Route path="/exercises/compliance-checkpoint" element={<ComplianceCheckpoint />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;