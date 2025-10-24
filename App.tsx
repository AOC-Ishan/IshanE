
import React, { useState } from 'react';
import type { User, View } from './types';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import GeneralEnglishView from './components/GeneralEnglishView';
import IELTSView from './components/IELTSView';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('LOGIN');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('LOGIN');
  };

  const renderView = () => {
    if (!currentUser) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (view) {
      case 'DASHBOARD':
        return <Dashboard setView={setView} />;
      case 'GENERAL_ENGLISH':
        return <GeneralEnglishView user={currentUser} />;
      case 'IELTS':
        return <IELTSView />;
      default:
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {currentUser && <Header user={currentUser} onLogout={handleLogout} setView={setView} />}
      <main className="p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
