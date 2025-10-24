
import React, { useState, useEffect, useCallback } from 'react';
import type { User, Level, CourseTopic, MCQQuestion } from '../types';
import { COURSE_STRUCTURE } from '../constants';
import { generateLesson, generateMCQ } from '../services/geminiService';
import Spinner from './Spinner';

interface GeneralEnglishViewProps {
  user: User;
}

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

const GeneralEnglishView: React.FC<GeneralEnglishViewProps> = ({ user }) => {
  const [selectedLevel, setSelectedLevel] = useState<Level>(user.level);
  const [selectedTopic, setSelectedTopic] = useState<CourseTopic | null>(null);
  const [activeTab, setActiveTab] = useState<'lesson' | 'mcq'>('lesson');
  const [lessonContent, setLessonContent] = useState<string>('');
  const [mcqQuestions, setMcqQuestions] = useState<MCQQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLesson = useCallback(async () => {
    if (!selectedTopic) return;
    setLoading(true);
    setError(null);
    setLessonContent('');
    try {
      const content = await generateLesson(selectedLevel, selectedTopic);
      setLessonContent(content);
    } catch (err) {
      setError('Failed to load lesson. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedLevel, selectedTopic]);

  const fetchMCQ = useCallback(async () => {
    if (!selectedTopic) return;
    setLoading(true);
    setError(null);
    setMcqQuestions([]);
    setUserAnswers({});
    setShowResults(false);
    try {
      const questions = await generateMCQ(selectedLevel, selectedTopic);
      setMcqQuestions(questions);
    } catch (err) {
      setError('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedLevel, selectedTopic]);

  useEffect(() => {
    if (selectedTopic) {
      if (activeTab === 'lesson') {
        fetchLesson();
      } else {
        fetchMCQ();
      }
    }
  }, [selectedTopic, activeTab, fetchLesson, fetchMCQ]);

  const handleTopicSelect = (topic: CourseTopic) => {
    setSelectedTopic(topic);
    setActiveTab('lesson');
  };
  
  const handleAnswerSelect = (qIndex: number, answer: string) => {
    setUserAnswers(prev => ({...prev, [qIndex]: answer}));
  };
  
  const calculateScore = () => {
      return mcqQuestions.reduce((score, q, index) => {
          return userAnswers[index] === q.correctAnswer ? score + 1 : score;
      }, 0);
  };

  if (!selectedTopic) {
    return (
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-text-primary mb-2">General English</h2>
        <p className="text-text-secondary mb-8">Select your level and choose a topic to begin.</p>
        <div className="mb-8">
            <div className="flex space-x-2 bg-gray-200 p-1 rounded-lg max-w-sm">
                {(['Beginner', 'Intermediate', 'Advanced'] as Level[]).map(level => (
                    <button key={level} onClick={() => setSelectedLevel(level)} className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors ${selectedLevel === level ? 'bg-surface shadow' : 'text-text-secondary hover:bg-gray-300'}`}>
                        {level}
                    </button>
                ))}
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_STRUCTURE[selectedLevel].map((topic, index) => (
            <div key={index} onClick={() => handleTopicSelect(topic)} className="bg-surface rounded-lg shadow p-6 cursor-pointer hover:shadow-xl transition-shadow">
              <h3 className="font-bold text-lg text-primary">{topic.title}</h3>
              <p className="text-text-secondary text-sm mt-2">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <button onClick={() => setSelectedTopic(null)} className="mb-6 text-sm font-semibold text-primary hover:underline">
        ← Back to Topics
      </button>
      <div className="bg-surface rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">{selectedTopic.title}</h2>
        <p className="text-text-secondary mb-6">{selectedTopic.description}</p>
        <div className="flex border-b border-gray-200 mb-6">
          <button onClick={() => setActiveTab('lesson')} className={`py-2 px-4 font-semibold ${activeTab === 'lesson' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}>
            Lesson
          </button>
          <button onClick={() => setActiveTab('mcq')} className={`py-2 px-4 font-semibold ${activeTab === 'mcq' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}>
            Quiz
          </button>
        </div>
        
        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}
        
        {!loading && !error && (
          <div>
            {activeTab === 'lesson' && lessonContent && <MarkdownRenderer content={lessonContent} />}
            {activeTab === 'mcq' && mcqQuestions.length > 0 && (
              <div>
                {!showResults ? (
                  <>
                  {mcqQuestions.map((q, qIndex) => (
                    <div key={qIndex} className="mb-6">
                      <p className="font-semibold text-text-primary mb-3">{qIndex + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, oIndex) => (
                          <label key={oIndex} className="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-blue-50">
                            <input type="radio" name={`q${qIndex}`} value={option} onChange={() => handleAnswerSelect(qIndex, option)} className="form-radio h-4 w-4 text-primary"/>
                            <span className="ml-3 text-text-secondary">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setShowResults(true)} className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors">Submit Answers</button>
                  </>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Quiz Results: {calculateScore()} / {mcqQuestions.length}</h3>
                    {mcqQuestions.map((q, qIndex) => (
                      <div key={qIndex} className="mb-4 p-4 rounded-lg border" style={{
                          borderColor: userAnswers[qIndex] === q.correctAnswer ? '#10B981' : '#EF4444',
                          backgroundColor: userAnswers[qIndex] === q.correctAnswer ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                      }}>
                        <p className="font-semibold text-text-primary">{q.question}</p>
                        <p className="text-sm mt-2">Your answer: <span className="font-medium">{userAnswers[qIndex] || 'Not answered'}</span></p>
                        {userAnswers[qIndex] !== q.correctAnswer && <p className="text-sm text-green-700">Correct answer: <span className="font-medium">{q.correctAnswer}</span></p>}
                      </div>
                    ))}
                     <button onClick={() => {setShowResults(false); setUserAnswers({});}} className="px-6 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-hover transition-colors mt-4">Try Again</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralEnglishView;
