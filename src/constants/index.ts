import { FieldValue } from 'firebase/firestore';

export enum RequestStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum RequestPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum CounselorStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  OFFLINE = 'offline'
}

export interface ChatRoomMetadata {
  studentName: string | FieldValue;
  counselorName: string | FieldValue;
  requestType: string | FieldValue;
  confidential: boolean | FieldValue;
  priority?: RequestPriority | FieldValue;
}

export interface CounselorSchedule {
  [key: string]: {
    start: string;
    end: string;
  };
}

export interface CounselorAvailability {
  status: CounselorStatus;
  schedule: CounselorSchedule;
}
