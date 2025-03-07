export interface LiveClass {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  startTime: Date;
  endTime?: Date;
  status: 'scheduled' | 'live' | 'ended';
  students: string[];
  meetingUrl?: string;
}
