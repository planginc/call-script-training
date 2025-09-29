import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Scripts } from './pages/Scripts';
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

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
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
            onNavigate={handleNavigate}
          />
          
          <main className="flex-1 lg:ml-64">
            <div className="max-w-7xl px-6 py-6">
              <Routes>
                <Route path="/" element={<Navigate to="/scripts?module=intro&subsection=0" replace />} />
                <Route path="/scripts" element={<Scripts />} />
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