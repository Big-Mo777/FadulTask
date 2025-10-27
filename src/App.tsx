import React, { useState } from 'react';
import { Home, ListTodo, Timer, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { TaskProvider } from './contexts/TaskContext';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';
import Statistics from './components/Statistics';
import Settings from './components/Settings';

type Tab = 'home' | 'tasks' | 'focus' | 'stats' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const tabs = [
    { id: 'home' as Tab, icon: Home, label: 'Accueil' },
    { id: 'tasks' as Tab, icon: ListTodo, label: 'Tâches' },
    { id: 'focus' as Tab, icon: Timer, label: 'Focus' },
    { id: 'stats' as Tab, icon: BarChart3, label: 'Stats' },
    { id: 'settings' as Tab, icon: SettingsIcon, label: 'Plus' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'tasks':
        return <TaskList />;
      case 'focus':
        return <PomodoroTimer />;
      case 'stats':
        return <Statistics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <TaskProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors">
          <div className="max-w-2xl mx-auto">
            <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    FadulTask
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activeTab === 'home' && 'Tableau de bord'}
                    {activeTab === 'tasks' && 'Mes tâches'}
                    {activeTab === 'focus' && 'Mode Focus'}
                    {activeTab === 'stats' && 'Statistiques'}
                    {activeTab === 'settings' && 'Paramètres'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  F
                </div>
              </div>
            </header>

            <main className="px-6 py-6">
              {renderContent()}
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3 safe-area-inset-bottom backdrop-blur-lg bg-opacity-95 dark:bg-opacity-95">
              <div className="max-w-2xl mx-auto flex items-center justify-around">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                        <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                        {isActive && (
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
                        )}
                      </div>
                      <span className={`text-xs font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
          </div>
        </TaskProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
