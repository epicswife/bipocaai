import { db } from '@/lib/firebase';
import { Assignment, AssignmentSubmission } from '@/types';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  increment
} from 'firebase/firestore';
import { ASSIGNMENT_ERRORS } from '@/lib/errors';

export async function createAssignment(assignment: Omit<Assignment, 'id' | 'status'>): Promise<Assignment> {
  const newAssignment = {
    ...assignment,
    status: 'draft',
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(collection(db, 'assignments'), newAssignment);
  return { ...newAssignment, id: docRef.id } as Assignment;
}

export async function publishAssignment(assignmentId: string): Promise<void> {
  const assignmentRef = doc(db, 'assignments', assignmentId);
  const assignment = await getDoc(assignmentRef);

  if (!assignment.exists()) {
    throw ASSIGNMENT_ERRORS.NOT_FOUND;
  }

  await updateDoc(assignmentRef, {
    status: 'published',
    publishedAt: Timestamp.now(),
  });
}

export async function submitAssignment(
  assignmentId: string,
  submission: Omit<AssignmentSubmission, 'id' | 'assignmentId' | 'submittedAt' | 'status'>
): Promise<AssignmentSubmission> {
  // Get assignment to check due date
  const assignmentRef = doc(db, 'assignments', assignmentId);
  const assignment = await getDoc(assignmentRef);

  if (!assignment.exists()) {
    throw ASSIGNMENT_ERRORS.NOT_FOUND;
  }

  const assignmentData = assignment.data() as Assignment;
  
  // Check if past due
  if (assignmentData.dueDate.toDate() < new Date()) {
    throw ASSIGNMENT_ERRORS.PAST_DUE;
  }

  // Check if already submitted
  const existingSubmission = await getDocs(
    query(
      collection(db, 'assignments', assignmentId, 'submissions'),
      where('studentId', '==', submission.studentId)
    )
  );

  if (!existingSubmission.empty) {
    throw ASSIGNMENT_ERRORS.ALREADY_SUBMITTED;
  }

  const newSubmission = {
    ...submission,
    assignmentId,
    submittedAt: Timestamp.now(),
    status: 'submitted'
  };

  const submissionRef = await addDoc(
    collection(db, 'assignments', assignmentId, 'submissions'),
    newSubmission
  );

  // Update assignment stats
  await updateDoc(assignmentRef, {
    submissionCount: increment(1)
  });

  return { ...newSubmission, id: submissionRef.id } as AssignmentSubmission;
}

export async function gradeSubmission(
  assignmentId: string,
  submissionId: string,
  grade: number,
  feedback: string
): Promise<void> {
  const submissionRef = doc(db, 'assignments', assignmentId, 'submissions', submissionId);
  const submission = await getDoc(submissionRef);

  if (!submission.exists()) {
    throw new Error('Submission not found');
  }

  await updateDoc(submissionRef, {
    grade,
    feedback,
    status: 'graded',
    gradedAt: Timestamp.now()
  });
}

export async function getAssignmentsByTeacher(teacherId: string): Promise<Assignment[]> {
  const snapshot = await getDocs(
    query(
      collection(db, 'assignments'),
      where('teacherId', '==', teacherId),
      orderBy('createdAt', 'desc')
    )
  );

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Assignment));
}

export async function getAssignmentsByStudent(studentId: string): Promise<Assignment[]> {
  const snapshot = await getDocs(
    query(
      collection(db, 'assignments'),
      where('status', '==', 'published'),
      orderBy('dueDate', 'asc')
    )
  );

  const assignments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Assignment));

  // Get submission status for each assignment
  const assignmentsWithStatus = await Promise.all(
    assignments.map(async (assignment) => {
      const submissionSnapshot = await getDocs(
        query(
          collection(db, 'assignments', assignment.id, 'submissions'),
          where('studentId', '==', studentId)
        )
      );

      const submission = submissionSnapshot.docs[0]?.data() as AssignmentSubmission | undefined;
      return {
        ...assignment,
        submitted: !!submission,
        submissionStatus: submission?.status,
        grade: submission?.grade,
        feedback: submission?.feedback
      };
    })
  );

  return assignmentsWithStatus;
}
