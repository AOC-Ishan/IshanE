
import React from 'react';
import type { User, View } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, setView }) => {
  return (
    <header className="bg-surface shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <span className="text-2xl">📚</span>
            <h1 
              className="text-xl font-bold text-primary cursor-pointer" 
              onClick={() => setView('DASHBOARD')}
            >
              IntelliLearn
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.name} />
              <span className="text-text-secondary font-medium hidden sm:inline">{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
