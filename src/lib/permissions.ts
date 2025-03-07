import { UserRole } from "./types";

// Define all possible features in the application
export type FeatureId = 
  // Core Learning Features
  | "view_courses"
  | "enroll_courses"
  | "track_progress"
  | "view_badges"
  | "access_gamification"
  | "join_live_classroom"
  | "access_chat"
  | "view_black_history"
  
  // Student Features
  | "submit_assignments"
  | "take_quizzes"
  | "view_grades"
  | "join_study_groups"
  | "access_tutoring"
  
  // Teaching Features
  | "create_quiz"
  | "create_lesson"
  | "use_ai_planning"
  | "view_student_progress"
  | "grade_assignments"
  | "import_lessons"
  | "manage_teacher_calendar"
  | "host_live_classroom"
  
  // Parent/Homeschool Features
  | "manage_child_account"
  | "view_child_progress"
  | "homeschool_tools"
  | "homeschool_ai_planning"
  | "homeschool_calendar"
  | "homeschool_quiz_creation"
  
  // Admin Features
  | "view_district_analytics"
  | "manage_users"
  | "system_settings"
  | "manage_field_trips"
  
  // Support Features
  | "access_mental_health_records"
  | "provide_family_resources"
  | "student_support"
  | "iep_meeting_access"
  | "iep_creation"
  
  // Public Features (accessible to all roles)
  | "view_profile"
  | "edit_profile"
  | "view_about"
  | "view_contact"
  | "view_legal";

// Define feature metadata
export interface Feature {
  id: FeatureId;
  title: string;
  description: string;
  path: string;
  icon?: string;
  color?: string;
  category: FeatureCategory;
}

export type FeatureCategory = 
  | "Learning" 
  | "Student"
  | "Teaching" 
  | "Homeschool" 
  | "Administration" 
  | "Support" 
  | "Special Education"
  | "Mental Health"
  | "Account";

// Define all features with their metadata
export const features: Record<FeatureId, Feature> = {
  // Core Learning Features
  view_courses: {
    id: "view_courses",
    title: "My Courses",
    description: "Access your enrolled courses",
    path: "/courses",
    color: "amber-400",
    category: "Learning"
  },
  enroll_courses: {
    id: "enroll_courses",
    title: "Enroll in Courses",
    description: "Browse and enroll in new courses",
    path: "/courses/browse",
    color: "cyan-400",
    category: "Learning"
  },
  track_progress: {
    id: "track_progress",
    title: "My Progress",
    description: "Track your learning progress",
    path: "/dashboard/progress",
    color: "green-300",
    category: "Learning"
  },
  view_badges: {
    id: "view_badges",
    title: "My Badges",
    description: "View earned badges and achievements",
    path: "/dashboard/badges",
    color: "purple-400",
    category: "Learning"
  },
  access_gamification: {
    id: "access_gamification",
    title: "Gamification",
    description: "Access gamification features",
    path: "/dashboard/gamification",
    color: "green-300",
    category: "Learning"
  },
  join_live_classroom: {
    id: "join_live_classroom",
    title: "Live Classrooms",
    description: "Join live virtual classrooms",
    path: "/classrooms/live",
    color: "red-400",
    category: "Learning"
  },
  access_chat: {
    id: "access_chat",
    title: "AI Chat",
    description: "Chat with our AI learning assistant",
    path: "/chat",
    color: "blue-400",
    category: "Learning"
  },
  view_black_history: {
    id: "view_black_history",
    title: "Black History",
    description: "Explore Black History resources",
    path: "/classrooms/black-history",
    color: "amber-400",
    category: "Learning"
  },
  
  // Student Features
  submit_assignments: {
    id: "submit_assignments",
    title: "Submit Assignments",
    description: "Submit your completed assignments",
    path: "/student/assignments",
    color: "amber-400",
    category: "Student"
  },
  take_quizzes: {
    id: "take_quizzes",
    title: "Take Quizzes",
    description: "Take quizzes and assessments",
    path: "/student/quizzes",
    color: "blue-400",
    category: "Student"
  },
  view_grades: {
    id: "view_grades",
    title: "My Grades",
    description: "View your grades and feedback",
    path: "/student/grades",
    color: "green-300",
    category: "Student"
  },
  join_study_groups: {
    id: "join_study_groups",
    title: "Study Groups",
    description: "Join and participate in study groups",
    path: "/student/study-groups",
    color: "purple-400",
    category: "Student"
  },
  access_tutoring: {
    id: "access_tutoring",
    title: "Tutoring",
    description: "Access tutoring services",
    path: "/student/tutoring",
    color: "red-400",
    category: "Student"
  },
  
  // Teaching Features
  create_quiz: {
    id: "create_quiz",
    title: "Create Quiz",
    description: "Create a new quiz for your students",
    path: "/teacher/quiz-creation",
    color: "amber-400",
    category: "Teaching"
  },
  create_lesson: {
    id: "create_lesson",
    title: "Create Lesson",
    description: "Create a new lesson plan",
    path: "/teacher/courses",
    color: "blue-400",
    category: "Teaching"
  },
  use_ai_planning: {
    id: "use_ai_planning",
    title: "AI Planning",
    description: "Use AI to help plan lessons",
    path: "/teacher/ai-planning",
    color: "teal-300",
    category: "Teaching"
  },
  view_student_progress: {
    id: "view_student_progress",
    title: "Student Progress",
    description: "View your students' progress",
    path: "/teacher/dashboard",
    color: "purple-400",
    category: "Teaching"
  },
  grade_assignments: {
    id: "grade_assignments",
    title: "Grade Assignments",
    description: "Grade student assignments",
    path: "/teacher/quizzes",
    color: "red-400",
    category: "Teaching"
  },
  import_lessons: {
    id: "import_lessons",
    title: "Import Lessons",
    description: "Import lessons from external sources",
    path: "/teacher/lesson-import",
    color: "green-300",
    category: "Teaching"
  },
  manage_teacher_calendar: {
    id: "manage_teacher_calendar",
    title: "Teacher Calendar",
    description: "Manage your teaching calendar",
    path: "/teacher/calendar",
    color: "cyan-400",
    category: "Teaching"
  },
  host_live_classroom: {
    id: "host_live_classroom",
    title: "Host Live Class",
    description: "Host a live virtual classroom",
    path: "/classrooms/live/host",
    color: "red-400",
    category: "Teaching"
  },
  
  // Parent/Homeschool Features
  manage_child_account: {
    id: "manage_child_account",
    title: "Manage Child Account",
    description: "Manage your child's account settings",
    path: "/homeschool/dashboard",
    color: "green-300",
    category: "Homeschool"
  },
  view_child_progress: {
    id: "view_child_progress",
    title: "Child Progress",
    description: "View your child's learning progress",
    path: "/homeschool/dashboard",
    color: "blue-400",
    category: "Homeschool"
  },
  homeschool_tools: {
    id: "homeschool_tools",
    title: "Homeschool Tools",
    description: "Access homeschool tools and resources",
    path: "/homeschool/dashboard",
    color: "green-300",
    category: "Homeschool"
  },
  homeschool_ai_planning: {
    id: "homeschool_ai_planning",
    title: "Homeschool AI Planning",
    description: "Use AI to plan homeschool curriculum",
    path: "/homeschool/ai-planning",
    color: "teal-300",
    category: "Homeschool"
  },
  homeschool_calendar: {
    id: "homeschool_calendar",
    title: "Homeschool Calendar",
    description: "Manage your homeschool calendar",
    path: "/homeschool/calendar",
    color: "cyan-400",
    category: "Homeschool"
  },
  homeschool_quiz_creation: {
    id: "homeschool_quiz_creation",
    title: "Create Homeschool Quizzes",
    description: "Create quizzes for your homeschool student",
    path: "/homeschool/quiz-creation",
    color: "amber-400",
    category: "Homeschool"
  },
  
  // Admin Features
  view_district_analytics: {
    id: "view_district_analytics",
    title: "District Analytics",
    description: "View analytics for your district",
    path: "/districts/dashboard",
    color: "red-400",
    category: "Administration"
  },
  manage_users: {
    id: "manage_users",
    title: "Manage Users",
    description: "Manage user accounts and permissions",
    path: "/admin/users",
    color: "purple-400",
    category: "Administration"
  },
  system_settings: {
    id: "system_settings",
    title: "System Settings",
    description: "Configure system settings",
    path: "/admin/settings",
    color: "cyan-400",
    category: "Administration"
  },
  manage_field_trips: {
    id: "manage_field_trips",
    title: "Field Trips",
    description: "Manage virtual field trips",
    path: "/districts/field-trips",
    color: "green-300",
    category: "Administration"
  },
  
  // Support Features
  access_mental_health_records: {
    id: "access_mental_health_records",
    title: "Mental Health Records",
    description: "Access student mental health records",
    path: "/mental-health/counselor",
    color: "blue-400",
    category: "Mental Health"
  },
  provide_family_resources: {
    id: "provide_family_resources",
    title: "Family Resources",
    description: "Provide resources for families",
    path: "/mental-health/resources",
    color: "green-300",
    category: "Support"
  },
  student_support: {
    id: "student_support",
    title: "Student Support",
    description: "Access student support tools",
    path: "/mental-health/counselor",
    color: "blue-400",
    category: "Support"
  },
  iep_meeting_access: {
    id: "iep_meeting_access",
    title: "IEP Meetings",
    description: "Access IEP meeting tools",
    path: "/iep-meetings",
    color: "purple-400",
    category: "Special Education"
  },
  iep_creation: {
    id: "iep_creation",
    title: "Create IEPs",
    description: "Create Individualized Education Plans",
    path: "/iep-meetings/create",
    color: "teal-300",
    category: "Special Education"
  },
  
  // Public Features (accessible to all roles)
  view_profile: {
    id: "view_profile",
    title: "View Profile",
    description: "View your profile information",
    path: "/profile",
    color: "blue-400",
    category: "Account"
  },
  edit_profile: {
    id: "edit_profile",
    title: "Edit Profile",
    description: "Edit your profile information",
    path: "/profile/edit",
    color: "green-300",
    category: "Account"
  },
  view_about: {
    id: "view_about",
    title: "About",
    description: "Learn about BIPOCA AI",
    path: "/about",
    color: "amber-400",
    category: "Account"
  },
  view_contact: {
    id: "view_contact",
    title: "Contact",
    description: "Contact BIPOCA AI support",
    path: "/contact",
    color: "purple-400",
    category: "Account"
  },
  view_legal: {
    id: "view_legal",
    title: "Legal",
    description: "View legal information",
    path: "/legal",
    color: "red-400",
    category: "Account"
  }
};

// Define which features each role has access to
export const rolePermissions: Record<UserRole, FeatureId[]> = {
  student: [
    // Learning features
    "view_courses",
    "enroll_courses",
    "track_progress",
    "view_badges",
    "access_gamification",
    "join_live_classroom",
    "access_chat",
    "view_black_history",
    
    // Student-specific features
    "submit_assignments",
    "take_quizzes",
    "view_grades",
    "join_study_groups",
    "access_tutoring",
    
    // Public features
    "view_profile",
    "edit_profile",
    "view_about",
    "view_contact",
    "view_legal"
  ],
  teacher: [
    // Learning features
    "view_courses",
    "enroll_courses",
    "join_live_classroom",
    "access_chat",
    "view_black_history",
    
    // Teaching features
    "create_quiz",
    "create_lesson",
    "use_ai_planning",
    "view_student_progress",
    "grade_assignments",
    "import_lessons",
    "manage_teacher_calendar",
    "host_live_classroom",
    
    // Public features
    "view_profile",
    "edit_profile",
    "view_about",
    "view_contact",
    "view_legal"
  ],
  parent: [
    // Learning features
    "view_courses",
    "access_chat",
    "view_black_history",
    
    // Homeschool features
    "manage_child_account",
    "view_child_progress",
    "homeschool_tools",
    "homeschool_ai_planning",
    "homeschool_calendar",
    "homeschool_quiz_creation",
    
    // Public features
    "view_profile",
    "edit_profile",
    "view_about",
    "view_contact",
    "view_legal"
  ],
  admin: [
    // Learning features
    "view_courses",
    "enroll_courses",
    "join_live_classroom",
    "access_chat",
    "view_black_history",
    
    // Teaching features
    "create_quiz",
    "create_lesson",
    "use_ai_planning",
    "view_student_progress",
    "grade_assignments",
    "import_lessons",
    "manage_teacher_calendar",
    "host_live_classroom",
    
    // Admin features
    "view_district_analytics",
    "manage_users",
    "system_settings",
    "manage_field_trips",
    
    // Support features
    "iep_meeting_access",
    "iep_creation",
    
    // Public features
    "view_profile",
    "edit_profile",
    "view_about",
    "view_contact",
    "view_legal"
  ],
  counselor: [
    // Learning features
    "view_courses",
    "access_chat",
    "view_black_history",
    
    // Support features
    "access_mental_health_records",
    "student_support",
    "iep_meeting_access",
    
    // Public features
    "view_profile",
    "edit_profile",
    "view_about",
    "view_contact",
    "view_legal"
  ],
  social_worker: [
    // Learning features
    "view_courses",
    "access_chat",
    "view_black_history",
    
    // Support features
    "provide_family_resources",
    "student_support",
    "iep_meeting_access",
    
    // Public features
    "view_profile",
    "edit_profile",
    "view_about",
    "view_contact",
    "view_legal"
  ]
};

// Helper function to check if a user has access to a feature
export function hasAccess(role: UserRole, featureId: FeatureId): boolean {
  return rolePermissions[role].includes(featureId);
}

// Get all features a user has access to
export function getAccessibleFeatures(role: UserRole): Feature[] {
  return rolePermissions[role].map(featureId => features[featureId]);
}

// Get features by category for a specific role
export function getFeaturesByCategory(role: UserRole): Record<string, Feature[]> {
  const userFeatures = getAccessibleFeatures(role);
  const categorizedFeatures: Record<string, Feature[]> = {
    "Learning": [],
    "Student": [],
    "Teaching": [],
    "Homeschool": [],
    "Administration": [],
    "Support": [],
    "Special Education": [],
    "Mental Health": [],
    "Account": []
  };
  
  userFeatures.forEach(feature => {
    categorizedFeatures[feature.category].push(feature);
  });
  
  // Remove empty categories
  Object.keys(categorizedFeatures).forEach(key => {
    if (categorizedFeatures[key].length === 0) {
      delete categorizedFeatures[key];
    }
  });
  
  return categorizedFeatures;
}
