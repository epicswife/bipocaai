export interface AuthUser {
  uid: string;
  email: string | null;
  role: "student" | "teacher" | "admin" | "counselor" | "parent";
  photoURL: string | null;
  displayName: string | null;
  emailVerified: boolean;
  // Custom fields for our app
  classIds?: string[];
  assignmentIds?: string[];
  achievementIds?: string[];
  // For parent accounts
  studentIds?: string[];
  // For teacher accounts
  subjectIds?: string[];
  // Firebase auth fields
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
  providerData: Array<{
    providerId: string;
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  }>;
}
