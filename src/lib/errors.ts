export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Auth Errors
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: new AppError('Invalid email or password', 'AUTH/INVALID_CREDENTIALS', 401),
  USER_NOT_FOUND: new AppError('User not found', 'AUTH/USER_NOT_FOUND', 404),
  UNAUTHORIZED: new AppError('Unauthorized access', 'AUTH/UNAUTHORIZED', 401),
  INVALID_ROLE: new AppError('Invalid user role', 'AUTH/INVALID_ROLE', 403),
} as const;

// Live Class Errors
export const LIVE_CLASS_ERRORS = {
  NOT_FOUND: new AppError('Live class not found', 'LIVE_CLASS/NOT_FOUND', 404),
  ALREADY_STARTED: new AppError('Class has already started', 'LIVE_CLASS/ALREADY_STARTED', 400),
  ALREADY_ENDED: new AppError('Class has already ended', 'LIVE_CLASS/ALREADY_ENDED', 400),
  NOT_ENROLLED: new AppError('Student not enrolled in class', 'LIVE_CLASS/NOT_ENROLLED', 403),
} as const;

// Assignment Errors
export const ASSIGNMENT_ERRORS = {
  NOT_FOUND: new AppError('Assignment not found', 'ASSIGNMENT/NOT_FOUND', 404),
  PAST_DUE: new AppError('Assignment is past due', 'ASSIGNMENT/PAST_DUE', 400),
  ALREADY_SUBMITTED: new AppError('Assignment already submitted', 'ASSIGNMENT/ALREADY_SUBMITTED', 400),
  NOT_ASSIGNED: new AppError('Assignment not assigned to student', 'ASSIGNMENT/NOT_ASSIGNED', 403),
} as const;

// Achievement Errors
export const ACHIEVEMENT_ERRORS = {
  NOT_FOUND: new AppError('Achievement not found', 'ACHIEVEMENT/NOT_FOUND', 404),
  ALREADY_EARNED: new AppError('Achievement already earned', 'ACHIEVEMENT/ALREADY_EARNED', 400),
  REQUIREMENTS_NOT_MET: new AppError('Achievement requirements not met', 'ACHIEVEMENT/REQUIREMENTS_NOT_MET', 400),
} as const;

interface FirebaseError {
  code?: string;
  message?: string;
}

// API Error Handler
export const handleApiError = (error: unknown) => {
  console.error('API Error:', error);

  if (error instanceof AppError) {
    return {
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        details: error.details,
      },
    };
  }

  // Firebase errors
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const firebaseError = error as FirebaseError;
    if (firebaseError.code?.startsWith('auth/')) {
      return {
        error: {
          message: firebaseError.message || 'Authentication error occurred',
          code: firebaseError.code,
          statusCode: 401,
        },
      };
    }
  }

  // Default error
  return {
    error: {
      message: 'An unexpected error occurred',
      code: 'INTERNAL_SERVER_ERROR',
      statusCode: 500,
    },
  };
};
