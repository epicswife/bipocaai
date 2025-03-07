export type UserRole = "student" | "teacher" | "parent" | "admin" | "counselor" | "social_worker";

export interface User {
  uid: string;
  email: string;
  role: UserRole;
}

export interface ExtendedUser extends User {
  name: string;
  bio?: string;
  interests?: string;
  preferredLanguage?: string;
  avatarUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  source: string;
  contentType: "video" | "pdf" | "text";
  language: string;
  isFeatured: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  timestamp: number;
  isModerated: boolean;
  warningLevel?: number; // 0 = none, 1 = warning, 2 = suspension, 3 = ban
}