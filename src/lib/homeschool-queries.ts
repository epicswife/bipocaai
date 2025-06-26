import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp,
  onSnapshot,
  QueryConstraint,
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";
import { db } from "./firebase";
import { 
  Course, 
  Lesson, 
  Quiz, 
  StudentProgress, 
  ScheduleEvent 
} from "@/types/homeschool";

// Collection references
const coursesCollection = collection(db, "homeschoolCourses");
const lessonsCollection = collection(db, "homeschoolLessons");
const quizzesCollection = collection(db, "homeschoolQuizzes");
const progressCollection = collection(db, "homeschoolProgress");
const scheduleCollection = collection(db, "homeschoolSchedule");

// Helper functions for type conversion
const convertCourse = (doc: QueryDocumentSnapshot<DocumentData>): Course => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    subject: data.subject,
    gradeLevel: data.gradeLevel,
    description: data.description,
    createdBy: data.createdBy,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    lessons: data.lessons || []
  };
};

const convertLesson = (doc: QueryDocumentSnapshot<DocumentData>): Lesson => {
  const data = doc.data();
  return {
    id: doc.id,
    courseId: data.courseId,
    title: data.title,
    content: data.content,
    duration: data.duration,
    objectives: data.objectives || [],
    materials: data.materials || [],
    activities: data.activities || [],
    assessment: data.assessment || "",
    standards: data.standards || [],
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};

const convertQuiz = (doc: QueryDocumentSnapshot<DocumentData>): Quiz => {
  const data = doc.data();
  return {
    id: doc.id,
    courseId: data.courseId,
    lessonId: data.lessonId,
    title: data.title,
    description: data.description,
    questions: data.questions || [],
    createdBy: data.createdBy,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};

const convertProgress = (doc: QueryDocumentSnapshot<DocumentData>): StudentProgress => {
  const data = doc.data();
  return {
    userId: data.userId,
    courseId: data.courseId,
    lessonId: data.lessonId,
    completed: data.completed,
    score: data.score,
    lastAccessed: data.lastAccessed,
    timeSpent: data.timeSpent
  };
};

const convertScheduleEvent = (doc: QueryDocumentSnapshot<DocumentData>): ScheduleEvent => {
  const data = doc.data();
  return {
    id: doc.id,
    userId: data.userId,
    title: data.title,
    description: data.description,
    startTime: data.startTime,
    endTime: data.endTime,
    courseId: data.courseId,
    lessonId: data.lessonId,
    recurring: data.recurring,
    recurrencePattern: data.recurrencePattern,
    createdAt: data.createdAt
  };
};

// Course queries
export const fetchUserCourses = async (userId: string): Promise<Course[]> => {
  try {
    const q = query(
      coursesCollection,
      where("createdBy", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertCourse);
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const createCourse = async (courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(coursesCollection, {
      ...courseData,
      createdAt: now,
      updatedAt: now
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const updateCourse = async (courseId: string, courseData: Partial<Course>): Promise<void> => {
  try {
    const courseRef = doc(db, "homeschoolCourses", courseId);
    await updateDoc(courseRef, {
      ...courseData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId: string): Promise<void> => {
  try {
    const courseRef = doc(db, "homeschoolCourses", courseId);
    await deleteDoc(courseRef);
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// Lesson queries
export const fetchCourseLessons = async (courseId: string): Promise<Lesson[]> => {
  try {
    const q = query(
      lessonsCollection,
      where("courseId", "==", courseId),
      orderBy("createdAt", "asc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertLesson);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
};

export const createLesson = async (lessonData: Omit<Lesson, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(lessonsCollection, {
      ...lessonData,
      createdAt: now,
      updatedAt: now
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error creating lesson:", error);
    throw error;
  }
};

export const updateLesson = async (lessonId: string, lessonData: Partial<Lesson>): Promise<void> => {
  try {
    const lessonRef = doc(db, "homeschoolLessons", lessonId);
    await updateDoc(lessonRef, {
      ...lessonData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating lesson:", error);
    throw error;
  }
};

export const deleteLesson = async (lessonId: string): Promise<void> => {
  try {
    const lessonRef = doc(db, "homeschoolLessons", lessonId);
    await deleteDoc(lessonRef);
  } catch (error) {
    console.error("Error deleting lesson:", error);
    throw error;
  }
};

// Quiz queries
export const fetchCourseQuizzes = async (courseId: string): Promise<Quiz[]> => {
  try {
    const q = query(
      quizzesCollection,
      where("courseId", "==", courseId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertQuiz);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

export const createQuiz = async (quizData: Omit<Quiz, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(quizzesCollection, {
      ...quizData,
      createdAt: now,
      updatedAt: now
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const updateQuiz = async (quizId: string, quizData: Partial<Quiz>): Promise<void> => {
  try {
    const quizRef = doc(db, "homeschoolQuizzes", quizId);
    await updateDoc(quizRef, {
      ...quizData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const deleteQuiz = async (quizId: string): Promise<void> => {
  try {
    const quizRef = doc(db, "homeschoolQuizzes", quizId);
    await deleteDoc(quizRef);
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

// Progress queries
export const fetchStudentProgress = async (userId: string, courseId?: string): Promise<StudentProgress[]> => {
  try {
    const constraints: QueryConstraint[] = [
      where("userId", "==", userId),
      orderBy("lastAccessed", "desc")
    ];
    
    if (courseId) {
      constraints.push(where("courseId", "==", courseId));
    }
    
    const q = query(progressCollection, ...constraints);
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertProgress);
  } catch (error) {
    console.error("Error fetching student progress:", error);
    throw error;
  }
};

export const updateStudentProgress = async (
  userId: string, 
  courseId: string, 
  lessonId: string, 
  progressData: Partial<StudentProgress>
): Promise<void> => {
  try {
    // First check if a progress record exists
    const q = query(
      progressCollection,
      where("userId", "==", userId),
      where("courseId", "==", courseId),
      where("lessonId", "==", lessonId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Create new progress record
      await addDoc(progressCollection, {
        userId,
        courseId,
        lessonId,
        completed: progressData.completed || false,
        score: progressData.score,
        lastAccessed: Timestamp.now(),
        timeSpent: progressData.timeSpent || 0
      });
    } else {
      // Update existing record
      const progressRef = doc(db, "homeschoolProgress", querySnapshot.docs[0].id);
      await updateDoc(progressRef, {
        ...progressData,
        lastAccessed: Timestamp.now()
      });
    }
  } catch (error) {
    console.error("Error updating student progress:", error);
    throw error;
  }
};

// Schedule queries
export const fetchUserSchedule = async (userId: string, startDate?: Date, endDate?: Date): Promise<ScheduleEvent[]> => {
  try {
    const constraints: QueryConstraint[] = [
      where("userId", "==", userId),
      orderBy("startTime", "asc")
    ];
    
    if (startDate) {
      constraints.push(where("startTime", ">=", Timestamp.fromDate(startDate)));
    }
    
    if (endDate) {
      constraints.push(where("startTime", "<=", Timestamp.fromDate(endDate)));
    }
    
    const q = query(scheduleCollection, ...constraints);
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertScheduleEvent);
  } catch (error) {
    console.error("Error fetching schedule:", error);
    throw error;
  }
};

export const createScheduleEvent = async (eventData: Omit<ScheduleEvent, "id" | "createdAt">): Promise<string> => {
  try {
    const docRef = await addDoc(scheduleCollection, {
      ...eventData,
      createdAt: Timestamp.now()
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error creating schedule event:", error);
    throw error;
  }
};

export const updateScheduleEvent = async (eventId: string, eventData: Partial<ScheduleEvent>): Promise<void> => {
  try {
    const eventRef = doc(db, "homeschoolSchedule", eventId);
    await updateDoc(eventRef, eventData);
  } catch (error) {
    console.error("Error updating schedule event:", error);
    throw error;
  }
};

export const deleteScheduleEvent = async (eventId: string): Promise<void> => {
  try {
    const eventRef = doc(db, "homeschoolSchedule", eventId);
    await deleteDoc(eventRef);
  } catch (error) {
    console.error("Error deleting schedule event:", error);
    throw error;
  }
};

// Subscription queries for real-time updates
export const subscribeToUserCourses = (
  userId: string, 
  callback: (courses: Course[]) => void
) => {
  const q = query(
    coursesCollection,
    where("createdBy", "==", userId),
    orderBy("createdAt", "desc")
  );
  
  return onSnapshot(q, (snapshot) => {
    const courses = snapshot.docs.map(convertCourse);
    callback(courses);
  }, (error) => {
    console.error("Error subscribing to courses:", error);
  });
};

export const subscribeToCourseLessons = (
  courseId: string,
  callback: (lessons: Lesson[]) => void
) => {
  const q = query(
    lessonsCollection,
    where("courseId", "==", courseId),
    orderBy("createdAt", "asc")
  );
  
  return onSnapshot(q, (snapshot) => {
    const lessons = snapshot.docs.map(convertLesson);
    callback(lessons);
  }, (error) => {
    console.error("Error subscribing to lessons:", error);
  });
};

export const subscribeToUserSchedule = (
  userId: string,
  callback: (events: ScheduleEvent[]) => void,
  startDate?: Date,
  endDate?: Date
) => {
  const constraints: QueryConstraint[] = [
    where("userId", "==", userId),
    orderBy("startTime", "asc")
  ];
  
  if (startDate) {
    constraints.push(where("startTime", ">=", Timestamp.fromDate(startDate)));
  }
  
  if (endDate) {
    constraints.push(where("startTime", "<=", Timestamp.fromDate(endDate)));
  }
  
  const q = query(scheduleCollection, ...constraints);
  
  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map(convertScheduleEvent);
    callback(events);
  }, (error) => {
    console.error("Error subscribing to schedule:", error);
  });
};
