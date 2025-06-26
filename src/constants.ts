// Mental Health Request Status
export enum RequestStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Mental Health Request Priority
export enum RequestPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

// Counselor Status
export enum CounselorStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  OFFLINE = 'offline',
  ON_LEAVE = 'on_leave'
}

// Counselor Schedule Types
export type TimeSlot = {
  start: string; // HH:mm format
  end: string;   // HH:mm format
};

export type DaySchedule = {
  isAvailable: boolean;
  slots: TimeSlot[];
};

export type WeekSchedule = {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
};

export type CounselorSchedule = {
  weeklySchedule: WeekSchedule;
  exceptions: {
    [date: string]: {
      isAvailable: boolean;
      slots?: TimeSlot[];
      reason?: string;
    };
  };
};

// Priority Score Mapping (for sorting)
export const PRIORITY_SCORES: Record<RequestPriority, number> = {
  [RequestPriority.LOW]: 1,
  [RequestPriority.MEDIUM]: 2,
  [RequestPriority.HIGH]: 3,
  [RequestPriority.URGENT]: 4
} as const;

// Status Display Names
export const STATUS_DISPLAY: Record<RequestStatus, string> = {
  [RequestStatus.PENDING]: 'Pending',
  [RequestStatus.ASSIGNED]: 'Assigned',
  [RequestStatus.IN_PROGRESS]: 'In Progress',
  [RequestStatus.COMPLETED]: 'Completed',
  [RequestStatus.CANCELLED]: 'Cancelled'
} as const;

// Priority Display Names
export const PRIORITY_DISPLAY: Record<RequestPriority, string> = {
  [RequestPriority.LOW]: 'Low',
  [RequestPriority.MEDIUM]: 'Medium',
  [RequestPriority.HIGH]: 'High',
  [RequestPriority.URGENT]: 'Urgent'
} as const;

// Counselor Status Display Names
export const COUNSELOR_STATUS_DISPLAY: Record<CounselorStatus, string> = {
  [CounselorStatus.AVAILABLE]: 'Available',
  [CounselorStatus.BUSY]: 'Busy',
  [CounselorStatus.OFFLINE]: 'Offline',
  [CounselorStatus.ON_LEAVE]: 'On Leave'
} as const;
