
export interface User {
  id: number;
  name: string;
  avatar: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CourseTopic {
  title: string;
  description: string;
}

export interface CourseStructure {
  [key: string]: CourseTopic[];
}

export type IELTSModule = 'Listening' | 'Reading' | 'Writing' | 'Speaking';

export interface MCQQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export type View = 'LOGIN' | 'DASHBOARD' | 'GENERAL_ENGLISH' | 'IELTS';
