import { Timestamp } from "firebase/firestore";

// Type definitions for homeschool students
export interface HomeschoolStudent {
  id: string;
  name: string;
  gradeLevel: string;
  age?: string;
  parentId: string;
  parentName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  progress?: {
    [subjectId: string]: number;
  };
}

// Type guard for HomeschoolStudent
export const isHomeschoolStudent = (item: unknown): item is HomeschoolStudent => {
  return item !== null && 
    typeof item === 'object' &&
    'name' in item &&
    'gradeLevel' in item &&
    'parentId' in item &&
    typeof (item as HomeschoolStudent).name === 'string' && 
    typeof (item as HomeschoolStudent).gradeLevel === 'string' && 
    typeof (item as HomeschoolStudent).parentId === 'string';
};

// Type definitions for homeschool courses
export interface Course {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  description: string;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lessons: Lesson[];
}

// Type definitions for lessons
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  duration: number; // in minutes
  objectives: string[];
  materials: string[];
  activities: Activity[];
  assessment: string;
  standards: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Type definitions for activities within lessons
export interface Activity {
  type: string;
  description: string;
  duration: number; // in minutes
}

// Type definitions for quizzes
export interface Quiz {
  id: string;
  courseId: string;
  lessonId?: string;
  title: string;
  description: string;
  questions: Question[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Type definitions for quiz questions
export interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  points: number;
}

// Type definitions for student progress
export interface StudentProgress {
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  lastAccessed: Timestamp;
  timeSpent: number; // in minutes
}

// Type definitions for schedules
export interface ScheduleEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startTime: Timestamp;
  endTime: Timestamp;
  courseId?: string;
  lessonId?: string;
  recurring?: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  createdAt: Timestamp;
}

// Type guard functions
export const isCourse = (item: unknown): item is Course => {
  return item !== null && 
    typeof item === 'object' &&
    'title' in item &&
    'subject' in item &&
    'lessons' in item &&
    typeof (item as Course).title === 'string' && 
    typeof (item as Course).subject === 'string' && 
    Array.isArray((item as Course).lessons);
};

export const isLesson = (item: unknown): item is Lesson => {
  return item !== null && 
    typeof item === 'object' &&
    'title' in item &&
    'content' in item &&
    'activities' in item &&
    typeof (item as Lesson).title === 'string' && 
    typeof (item as Lesson).content === 'string' && 
    Array.isArray((item as Lesson).activities);
};

export const isQuiz = (item: unknown): item is Quiz => {
  return item !== null && 
    typeof item === 'object' &&
    'title' in item &&
    'questions' in item &&
    typeof (item as Quiz).title === 'string' && 
    Array.isArray((item as Quiz).questions);
};
