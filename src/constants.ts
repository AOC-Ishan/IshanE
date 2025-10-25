
import { User, CourseStructure, IELTSModule } from './types';

export const MOCK_USERS: User[] = [
  { id: 1, name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=alex', level: 'Intermediate' },
  { id: 2, name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?u=maria', level: 'Beginner' },
  { id: 3, name: 'Kenji Tanaka', avatar: 'https://i.pravatar.cc/150?u=kenji', level: 'Advanced' },
  { id: 4, name: 'Fatima Ahmed', avatar: 'https://i.pravatar.cc/150?u=fatima', level: 'Intermediate' },
];

export const COURSE_STRUCTURE: CourseStructure = {
  Beginner: [
    { title: 'Greetings and Introductions', description: 'Learn basic ways to greet people and introduce yourself.' },
    { title: 'Present Simple Tense', description: 'Understand and use the present simple for routines and facts.' },
    { title: 'Basic Vocabulary: Family', description: 'Learn common words to describe your family members.' },
    { title: 'Asking Questions', description: 'Form simple questions using "do", "be", and question words.' },
  ],
  Intermediate: [
    { title: 'Present Perfect vs. Past Simple', description: 'Differentiate between actions completed in the past.' },
    { title: 'Conditionals (First and Second)', description: 'Talk about real and hypothetical situations.' },
    { title: 'Vocabulary: Travel & Tourism', description: 'Expand your vocabulary for discussing travel.' },
    { title: 'Modal Verbs of Obligation', description: 'Use must, have to, and should correctly.' },
  ],
  Advanced: [
    { title: 'Third and Mixed Conditionals', description: 'Master complex hypothetical situations in the past.' },
    { title: 'Passive Voice in Various Tenses', description: 'Understand and use the passive voice for formal writing.' },
    { title: 'Vocabulary: Business & Finance', description: 'Learn professional vocabulary for the workplace.' },
    { title: 'Reported Speech', description: 'Accurately report what other people have said.' },
  ],
};

export const IELTS_MODULES: IELTSModule[] = ['Listening', 'Reading', 'Writing', 'Speaking'];