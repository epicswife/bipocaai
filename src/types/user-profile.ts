import { AuthUser } from './auth';

export interface UserProfile extends AuthUser {
  // Extended profile fields
  name: string;
  bio?: string;
  interests?: string;
  preferredLanguage?: string;
  avatarUrl?: string;
}

// Type guard to check if a user has profile data
export function hasProfileData(user: AuthUser): user is UserProfile {
  return 'name' in user || 'bio' in user || 'interests' in user || 'preferredLanguage' in user;
}
