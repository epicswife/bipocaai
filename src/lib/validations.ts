import { z } from 'zod';

// User Validations
export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  role: z.enum(['student', 'teacher', 'admin', 'counselor', 'social_worker', 'parent'] as const),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').optional(),
});

// Live Class Validations
export const liveClassSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  startTime: z.date().min(new Date(), 'Start time must be in the future'),
  duration: z.number().min(15, 'Duration must be at least 15 minutes'),
  maxParticipants: z.number().min(1, 'Must allow at least 1 participant'),
  materials: z.array(z.string().url('Invalid material URL')).optional(),
});

// Assignment Validations
export const assignmentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  dueDate: z.date().min(new Date(), 'Due date must be in the future'),
  points: z.number().min(0, 'Points cannot be negative'),
  requirements: z.array(z.string()).min(1, 'Must have at least one requirement'),
  attachments: z.array(z.string().url('Invalid attachment URL')).optional(),
});

export const assignmentSubmissionSchema = z.object({
  content: z.string().min(1, 'Submission cannot be empty'),
  attachments: z.array(z.string().url('Invalid attachment URL')).optional(),
});

// Achievement Validations
export const achievementRequirementSchema = z.object({
  type: z.enum(['assignment', 'attendance', 'participation', 'custom']),
  threshold: z.number().min(1, 'Threshold must be at least 1'),
  metric: z.string().min(1, 'Metric must be specified'),
});

export const achievementSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['academic', 'participation', 'leadership', 'special']),
  points: z.number().min(0, 'Points cannot be negative'),
  icon: z.string().min(1, 'Icon must be specified'),
  requirements: z.array(achievementRequirementSchema).min(1, 'Must have at least one requirement'),
});

// Helper Types
export type UserFormData = z.infer<typeof userSchema>;
export type LiveClassFormData = z.infer<typeof liveClassSchema>;
export type AssignmentFormData = z.infer<typeof assignmentSchema>;
export type AssignmentSubmissionFormData = z.infer<typeof assignmentSubmissionSchema>;
export type AchievementFormData = z.infer<typeof achievementSchema>;
