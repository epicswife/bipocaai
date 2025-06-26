import { Timestamp } from 'firebase/firestore';

// Re-export all chat types
export * from './chat';

export type UserRole = 'student' | 'teacher' | 'admin' | 'counselor' | 'social_worker' | 'parent';

export interface LiveClass {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  startTime: Timestamp;
  duration: number; // in minutes
  maxParticipants: number;
  currentParticipants: number;
  status: 'scheduled' | 'live' | 'ended';
  meetingUrl?: string;
  recordingUrl?: string;
  materials?: string[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  dueDate: Timestamp;
  points: number;
  status: 'draft' | 'published' | 'archived';
  attachments?: string[];
  requirements?: string[];
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: Timestamp;
  content: string;
  attachments?: string[];
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'returned';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'participation' | 'leadership' | 'special';
  points: number;
  icon: string;
  requirements: {
    type: 'assignment' | 'attendance' | 'participation' | 'custom';
    threshold: number;
    metric: string;
  }[];
}

export interface StudentProgress {
  userId: string;
  achievements: {
    id: string;
    earnedAt: Timestamp;
    progress: number;
  }[];
  stats: {
    totalPoints: number;
    classesAttended: number;
    assignmentsCompleted: number;
    averageGrade: number;
  };
}

export interface Notification {
  id: string;
  userId: string;
  type: 'assignment' | 'class' | 'achievement' | 'system';
  title: string;
  message: string;
  createdAt: Timestamp;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}
