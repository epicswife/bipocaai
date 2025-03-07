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

import { RequestStatus, RequestPriority, CounselorStatus, ChatRoomMetadata } from '@/constants';

// Utility functions
export const createRef = <T>(collection: string, id: string): DocumentReference<T> => {
  return db.collection(collection).doc(id) as DocumentReference<T>;
};

export const serverTimestamp = (): Timestamp => {
  return admin.firestore.Timestamp.now();
};

// Constants
export const LOAD_WEIGHTS: Record<RequestPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
} as const;
