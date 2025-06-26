import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp, 
  QueryConstraint, 
  orderBy,
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { HomeschoolStudent, Course, Lesson } from "@/types/homeschool";

// Type for query error
export interface QueryError {
  code: string;
  message: string;
}

// Type guard for QueryError
export const isQueryError = (error: unknown): error is QueryError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    typeof (error as QueryError).code === "string" &&
    typeof (error as QueryError).message === "string"
  );
};

// Convert Firestore document to HomeschoolStudent type
export const convertToHomeschoolStudent = (
  doc: { id: string; [key: string]: unknown }
): HomeschoolStudent => {
  return {
    id: doc.id,
    name: (doc.name as string) || "",
    gradeLevel: (doc.gradeLevel as string) || "",
    age: (doc.age as string) || "",
    parentId: (doc.parentId as string) || "",
    parentName: (doc.parentName as string) || "",
    createdAt: (doc.createdAt as Timestamp) || Timestamp.now(),
    updatedAt: (doc.updatedAt as Timestamp) || Timestamp.now(),
    progress: (doc.progress as { [subjectId: string]: number }) || {},
  };
};

// Get all students for a parent
export const getStudentsByParentId = async (parentId: string): Promise<HomeschoolStudent[] | QueryError> => {
  try {
    const constraints: QueryConstraint[] = [
      where("parentId", "==", parentId),
      orderBy("createdAt", "desc")
    ];
    
    const studentsRef = collection(db, "homeschoolStudents");
    const q = query(studentsRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    const students: HomeschoolStudent[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      students.push(convertToHomeschoolStudent({ id: doc.id, ...data }));
    });
    
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    return {
      code: "fetch-students-error",
      message: isQueryError(error) ? error.message : "Failed to fetch students"
    };
  }
};

// Get a single student by ID
export const getStudentById = async (studentId: string): Promise<HomeschoolStudent | QueryError> => {
  try {
    const studentRef = doc(db, "homeschoolStudents", studentId);
    const studentDoc = await getDoc(studentRef);
    
    if (studentDoc.exists()) {
      const data = studentDoc.data();
      return convertToHomeschoolStudent({ id: studentDoc.id, ...data });
    } else {
      return {
        code: "student-not-found",
        message: "Student not found"
      };
    }
  } catch (error) {
    console.error("Error fetching student:", error);
    return {
      code: "fetch-student-error",
      message: isQueryError(error) ? error.message : "Failed to fetch student"
    };
  }
};

// Add a new student
export const addStudent = async (studentData: Omit<HomeschoolStudent, "id" | "createdAt" | "updatedAt">): Promise<{ id: string } | QueryError> => {
  try {
    const dataWithTimestamps = {
      ...studentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, "homeschoolStudents"), dataWithTimestamps);
    return { id: docRef.id };
  } catch (error) {
    console.error("Error adding student:", error);
    return {
      code: "add-student-error",
      message: isQueryError(error) ? error.message : "Failed to add student"
    };
  }
};

// Update an existing student
export const updateStudent = async (studentId: string, studentData: Partial<HomeschoolStudent>): Promise<boolean | QueryError> => {
  try {
    const dataWithTimestamp = {
      ...studentData,
      updatedAt: serverTimestamp(),
    };
    
    const studentRef = doc(db, "homeschoolStudents", studentId);
    await updateDoc(studentRef, dataWithTimestamp);
    return true;
  } catch (error) {
    console.error("Error updating student:", error);
    return {
      code: "update-student-error",
      message: isQueryError(error) ? error.message : "Failed to update student"
    };
  }
};

// Delete a student
export const deleteStudent = async (studentId: string): Promise<boolean | QueryError> => {
  try {
    await deleteDoc(doc(db, "homeschoolStudents", studentId));
    return true;
  } catch (error) {
    console.error("Error deleting student:", error);
    return {
      code: "delete-student-error",
      message: isQueryError(error) ? error.message : "Failed to delete student"
    };
  }
};

// Get courses by grade level
export const getCoursesByGradeLevel = async (gradeLevel: string): Promise<Course[] | QueryError> => {
  try {
    const constraints: QueryConstraint[] = [
      where("gradeLevel", "==", gradeLevel),
      orderBy("createdAt", "desc")
    ];
    
    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    const courses: Course[] = [];
    querySnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() } as Course);
    });
    
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      code: "fetch-courses-error",
      message: isQueryError(error) ? error.message : "Failed to fetch courses"
    };
  }
};

// Get lessons by course ID
export const getLessonsByCourseId = async (courseId: string): Promise<Lesson[] | QueryError> => {
  try {
    const constraints: QueryConstraint[] = [
      where("courseId", "==", courseId),
      orderBy("createdAt", "asc")
    ];
    
    const lessonsRef = collection(db, "lessons");
    const q = query(lessonsRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    const lessons: Lesson[] = [];
    querySnapshot.forEach((doc) => {
      lessons.push({ id: doc.id, ...doc.data() } as Lesson);
    });
    
    return lessons;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return {
      code: "fetch-lessons-error",
      message: isQueryError(error) ? error.message : "Failed to fetch lessons"
    };
  }
};

// Update student progress
export const updateStudentProgress = async (
  studentId: string, 
  subjectId: string, 
  progress: number
): Promise<boolean | QueryError> => {
  try {
    const studentRef = doc(db, "homeschoolStudents", studentId);
    await updateDoc(studentRef, {
      [`progress.${subjectId}`]: progress,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error updating student progress:", error);
    return {
      code: "update-progress-error",
      message: isQueryError(error) ? error.message : "Failed to update student progress"
    };
  }
};
