export interface Assignment {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  dueDate: Date;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  studentId: string;
  submissionUrl?: string;
}
