export type UserRole = "student" | "teacher" | "parent" | "admin" | "counselor" | "social_worker";

export interface User {
  name: string;
  role: UserRole;
  email: string;
}