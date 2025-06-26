import { Timestamp } from "firebase/firestore";

// Type definitions for mental health assessment
export interface MentalHealthAssessment {
  userId: string;
  userName?: string | null;
  userEmail?: string | null;
  anonymous: boolean;
  answers: Record<string, number | string | string[]>;
  score: {
    anxiety: number;
    depression: number;
    stress: number;
    wellbeing: number;
  };
  recommendedResources: string[];
  timestamp: Timestamp;
  createdAt: Timestamp;
}

// Type definitions for mental health appointments
export interface MentalHealthAppointment {
  userId: string;
  counselorId: string;
  counselorName: string;
  date: Timestamp;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  topic?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Define specific types for different question answers
export type ScaleAnswer = number;
export type TextAnswer = string;
export type MultiSelectAnswer = string[];

// Union type for all possible answer values
export type AnswerValue = ScaleAnswer | TextAnswer | MultiSelectAnswer;

// Type guard functions
export const isScaleAnswer = (answer: AnswerValue | undefined): answer is ScaleAnswer => 
  typeof answer === 'number';

export const isMultiSelectAnswer = (answer: AnswerValue | undefined): answer is MultiSelectAnswer => 
  Array.isArray(answer);

export const isTextAnswer = (answer: AnswerValue | undefined): answer is TextAnswer => 
  typeof answer === 'string';
