
import React from 'react';
import type { View } from '../types';

interface DashboardProps {
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-text-primary mb-8">Your Learning Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          onClick={() => setView('GENERAL_ENGLISH')}
          className="bg-surface rounded-xl shadow-lg p-8 cursor-pointer transition-transform transform hover:-translate-y-2 flex flex-col items-start"
        >
          <div className="bg-blue-100 text-primary p-3 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-9-5.747h18" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">General English</h3>
          <p className="text-text-secondary mb-4">Build your foundation from beginner to advanced with structured lessons and quizzes.</p>
          <span className="mt-auto font-semibold text-primary hover:text-primary-hover">Start Learning →</span>
        </div>
        <div
          onClick={() => setView('IELTS')}
          className="bg-surface rounded-xl shadow-lg p-8 cursor-pointer transition-transform transform hover:-translate-y-2 flex flex-col items-start"
        >
          <div className="bg-emerald-100 text-secondary p-3 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">IELTS Preparation</h3>
          <p className="text-text-secondary mb-4">Ace the test with expert strategies, practice tasks, and model answers.</p>
          <span className="mt-auto font-semibold text-secondary hover:text-secondary-hover">Prepare for Test →</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
