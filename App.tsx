
import React, { useState } from 'react';
import BudgetDashboard from './components/BudgetDashboard';
import Chatbot from './components/Chatbot';
import ImageGenerator from './components/ImageGenerator';
import { ChartIcon, ChatIcon, ImageIcon, WalletIcon } from './components/Icons';

type Tab = 'budget' | 'chat' | 'image';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('budget');

  const renderContent = () => {
    switch (activeTab) {
      case 'budget':
        return <BudgetDashboard />;
      case 'chat':
        return <Chatbot />;
      case 'image':
        return <ImageGenerator />;
      default:
        return <BudgetDashboard />;
    }
  };
  
  const NavButton = ({ tabName, label, icon }: { tabName: Tab; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex-1 sm:flex-none sm:w-auto flex items-center justify-center sm:justify-start gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        activeTab === tabName
          ? 'bg-emerald-500 text-white shadow-lg'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <WalletIcon className="h-8 w-8 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Gemini Budget Buddy
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 mb-6">
          <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <NavButton tabName="budget" label="Dashboard" icon={<ChartIcon className="h-5 w-5" />} />
            <NavButton tabName="chat" label="AI Assistant" icon={<ChatIcon className="h-5 w-5" />} />
            <NavButton tabName="image" label="Goal Visualizer" icon={<ImageIcon className="h-5 w-5" />} />
          </nav>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6">
          {renderContent()}
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini</p>
      </footer>
    </div>
  );
};

export default App;
