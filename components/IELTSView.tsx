
import React, { useState } from 'react';
import { IELTS_MODULES } from '../constants';
import type { IELTSModule } from '../types';
import { generateIELTSPrep } from '../services/geminiService';
import Spinner from './Spinner';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className="prose max-w-none text-text-secondary">
            {content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold text-text-primary mt-6 mb-3">{line.substring(3)}</h2>;
                if (line.startsWith('**')) {
                    const bolded = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-text-primary">$1</strong>');
                    return <p key={index} className="my-2" dangerouslySetInnerHTML={{ __html: bolded }} />;
                }
                if (line.startsWith('* ')) return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
                if (line.trim() === '') return <br key={index} />;
                return <p key={index} className="my-2">{line}</p>;
            })}
        </div>
    );
};

const IELTSView: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<IELTSModule | null>(null);
  const [topic, setTopic] = useState('');
  const [prepContent, setPrepContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedModule || !topic) {
      setError('Please select a module and enter a topic.');
      return;
    }
    setLoading(true);
    setError(null);
    setPrepContent('');
    try {
      const content = await generateIELTSPrep(selectedModule, topic);
      setPrepContent(content);
    } catch (err) {
      setError('Failed to generate preparation material. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedModule) {
    return (
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-text-primary mb-2">IELTS Preparation</h2>
        <p className="text-text-secondary mb-8">Choose a module to start preparing.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {IELTS_MODULES.map((module) => (
            <div
              key={module}
              onClick={() => setSelectedModule(module)}
              className="bg-surface rounded-lg shadow p-6 cursor-pointer hover:shadow-xl hover:border-secondary border-2 border-transparent transition-all flex flex-col items-center text-center"
            >
              <h3 className="text-2xl font-bold text-secondary">{module}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <button onClick={() => { setSelectedModule(null); setPrepContent(''); setTopic(''); }} className="mb-6 text-sm font-semibold text-primary hover:underline">
        ← Back to Modules
      </button>
      <div className="bg-surface rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-text-primary mb-4">IELTS {selectedModule} Practice</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Environment, Technology, Education"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-hover transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Material'}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {loading && <Spinner />}
        
        {prepContent && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <MarkdownRenderer content={prepContent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IELTSView;
