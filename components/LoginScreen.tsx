
import React from 'react';
import { MOCK_USERS } from '../constants';
import type { User } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Welcome to <span className="text-primary">IntelliLearn</span>
        </h1>
        <p className="mt-4 text-lg text-text-secondary">Your AI-powered guide to mastering English.</p>
      </div>
      <div className="bg-surface p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-text-primary mb-8">Who is learning today?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {MOCK_USERS.map((user) => (
            <div
              key={user.id}
              onClick={() => onLogin(user)}
              className="flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-blue-50"
            >
              <img className="w-24 h-24 rounded-full mb-4 border-4 border-transparent group-hover:border-primary" src={user.avatar} alt={user.name} />
              <span className="font-semibold text-text-primary">{user.name}</span>
              <span className="text-sm text-text-secondary">{user.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
