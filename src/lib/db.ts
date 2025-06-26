import * as admin from 'firebase-admin';
import type { Timestamp, DocumentReference, CollectionReference } from 'firebase-admin/firestore';

// Initialize Firebase Admin if not already initialized
try {
  admin.app();
} catch {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

// Get Firestore instance
export const db = admin.firestore();

// Type-safe collection references
export const collections = {
  mentalHealthRequests: db.collection('mentalHealthRequests') as CollectionReference<MentalHealthRequest>,
  counselors: db.collection('counselors') as CollectionReference<CounselorData>,
  chatRooms: db.collection('chatRooms') as CollectionReference<ChatRoom>,
  notifications: db.collection('notifications') as CollectionReference<Notification>,
  mentalHealthAssessments: db.collection('mentalHealthAssessments') as CollectionReference<MentalHealthAssessment>,
  appointments: db.collection('appointments') as CollectionReference<MentalHealthAppointment>,
} as const;

// Type definitions
export interface MentalHealthRequest {
  id: string;
  studentId: string;
  studentName: string;
  requestType: string;
  description: string;
  priority: RequestPriority;
  tags: string[];
  confidential: boolean;
  status: RequestStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  counselorId?: string;
  counselorName?: string;
}

export interface CounselorData {
  id: string;
  userId: string;
  name: string;
  status: CounselorStatus;
  specialties: string[];
  currentLoad: number;
  maxLoad: number;
  lastActive: Timestamp;
}

export interface ChatRoom {
  participants: string[];
  type: 'mental_health';
  requestId: string;
  createdAt: Timestamp;
  lastMessage: string | null;
  lastMessageAt: Timestamp | null;
  metadata: ChatRoomMetadata;
}

export interface Notification {
  userId: string;
  type: 'mental_health_assignment';
  title: string;
  message: string;
  metadata: {
    requestId: string;
    chatRoomId: string;
  };
  read: boolean;
  createdAt: Timestamp;
}

// Type definitions for mental health assessment and appointments
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

import { RequestStatus, RequestPriority, CounselorStatus } from '@/constants';
import type { ChatRoomMetadata } from '@/types';

// Utility functions
export const createRef = <T>(collection: string, id: string): DocumentReference<T> => {
  return db.collection(collection).doc(id) as DocumentReference<T>;
};

export const serverTimestamp = (): Timestamp => {
  return admin.firestore.Timestamp.now();
};

// Type-safe load weights using enum values
export const LOAD_WEIGHTS: Record<RequestPriority, number> = {
  [RequestPriority.LOW]: 1,
  [RequestPriority.MEDIUM]: 2,
  [RequestPriority.HIGH]: 3,
  [RequestPriority.URGENT]: 4
} as const;
