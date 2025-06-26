import { FieldValue, Timestamp } from 'firebase/firestore';
import { RequestPriority } from '@/constants';
import type { UserRole } from '@/types';

// Type-safe chat room metadata following established patterns
export interface ChatRoomMetadata {
  studentName: string | FieldValue;
  counselorName: string | FieldValue;
  requestType: string | FieldValue;
  confidential: boolean | FieldValue;
  priority?: RequestPriority | FieldValue;
}

// Type-safe message interface
export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  participants: string[];
  timestamp: Timestamp;
  status: 'sent' | 'delivered' | 'read';
}

// Type-safe contact interface
export interface ChatContact {
  id: string;
  name: string;
  role: UserRole;
  grade?: string;
  avatarUrl?: string;
  lastActive: Timestamp | null;
  status: 'online' | 'offline' | 'away';
  lastMessage?: string;
  recentActivity?: string;
}

// Type-safe tab type
export type TabType = 'all' | 'assigned';

// Type-safe error type
export class ChatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChatError';
  }
}
