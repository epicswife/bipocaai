import { db } from '@/lib/firebase';
import { StudentProgress, Assignment, LiveClass } from '@/types';
import { 
  doc, 
  getDoc,
  getDocs,
  query,
  where,
  collection,
  runTransaction,
  Timestamp,
  orderBy
} from 'firebase/firestore';

export async function getStudentStats(userId: string): Promise<StudentProgress['stats']> {
  // Get assignment stats
  const assignmentsQuery = query(
    collection(db, 'assignments'),
    where('status', '==', 'published')
  );
  const assignments = await getDocs(assignmentsQuery);
  
  let totalGrade = 0;
  let gradedAssignments = 0;

  for (const assignment of assignments.docs) {
    const submissionQuery = query(
      collection(db, 'assignments', assignment.id, 'submissions'),
      where('studentId', '==', userId),
      where('status', '==', 'graded')
    );
    const submissions = await getDocs(submissionQuery);
    if (!submissions.empty) {
      const submission = submissions.docs[0].data();
      if (submission.grade !== undefined) {
        totalGrade += submission.grade;
        gradedAssignments++;
      }
    }
  }

  // Get attendance stats
  const classesQuery = query(
    collection(db, 'live-classes'),
    where('status', '==', 'ended')
  );
  const classes = await getDocs(classesQuery);
  
  let attendedClasses = 0;
  for (const classDoc of classes.docs) {
    const attendanceQuery = query(
      collection(db, 'live-classes', classDoc.id, 'attendance'),
      where('userId', '==', userId)
    );
    const attendance = await getDocs(attendanceQuery);
    if (!attendance.empty) {
      attendedClasses++;
    }
  }

  // Calculate stats
  return {
    totalPoints: 0, // Will be updated when calculating achievements
    classesAttended: attendedClasses,
    assignmentsCompleted: gradedAssignments,
    averageGrade: gradedAssignments > 0 ? totalGrade / gradedAssignments : 0
  };
}

export async function updateStudentProgress(userId: string): Promise<void> {
  await runTransaction(db, async (transaction) => {
    const progressRef = doc(db, 'student-progress', userId);
    const progressDoc = await transaction.get(progressRef);
    
    // Get current stats
    const stats = await getStudentStats(userId);
    
    // Get achievement points
    const achievementsQuery = query(
      collection(db, 'achievements'),
      where('earnedBy', 'array-contains', userId)
    );
    const achievements = await getDocs(achievementsQuery);
    
    let totalPoints = 0;
    achievements.docs.forEach(doc => {
      totalPoints += doc.data().points;
    });
    
    stats.totalPoints = totalPoints;

    // Update progress document
    if (!progressDoc.exists()) {
      transaction.set(progressRef, {
        userId,
        achievements: [],
        stats,
        lastUpdated: Timestamp.now()
      });
    } else {
      transaction.update(progressRef, {
        stats,
        lastUpdated: Timestamp.now()
      });
    }
  });
}

export async function getRecentActivity(userId: string) {
  const activities = [];

  // Get recent assignments
  const assignmentsQuery = query(
    collection(db, 'assignments'),
    where('status', '==', 'published'),
    orderBy('dueDate', 'desc'),
    where('dueDate', '>', Timestamp.now())
  );
  const assignments = await getDocs(assignmentsQuery);
  
  for (const doc of assignments.docs) {
    const assignment = { id: doc.id, ...doc.data() } as Assignment;
    const submissionQuery = query(
      collection(db, 'assignments', doc.id, 'submissions'),
      where('studentId', '==', userId)
    );
    const submissions = await getDocs(submissionQuery);
    
    activities.push({
      type: 'assignment',
      data: assignment,
      status: submissions.empty ? 'pending' : submissions.docs[0].data().status,
      date: assignment.dueDate
    });
  }

  // Get recent classes
  const classesQuery = query(
    collection(db, 'live-classes'),
    where('status', 'in', ['scheduled', 'live']),
    orderBy('startTime', 'asc')
  );
  const classes = await getDocs(classesQuery);
  
  for (const doc of classes.docs) {
    const liveClass = { id: doc.id, ...doc.data() } as LiveClass;
    const attendanceQuery = query(
      collection(db, 'live-classes', doc.id, 'attendance'),
      where('userId', '==', userId)
    );
    const attendance = await getDocs(attendanceQuery);
    
    activities.push({
      type: 'class',
      data: liveClass,
      status: attendance.empty ? 'not_joined' : 'joined',
      date: liveClass.startTime
    });
  }

  // Sort by date
  return activities.sort((a, b) => b.date.toMillis() - a.date.toMillis());
}

export async function getStudentPerformanceReport(userId: string) {
  const progressRef = doc(db, 'student-progress', userId);
  const progressDoc = await getDoc(progressRef);
  const progress = progressDoc.exists() ? progressDoc.data() as StudentProgress : null;

  if (!progress) {
    return null;
  }

  // Get assignment performance
  const assignmentsQuery = query(
    collection(db, 'assignments'),
    where('status', '==', 'published')
  );
  const assignments = await getDocs(assignmentsQuery);
  
  const assignmentStats = {
    total: assignments.size,
    completed: 0,
    onTime: 0,
    late: 0,
    averageScore: 0,
    totalPoints: 0,
    earnedPoints: 0
  };

  for (const doc of assignments.docs) {
    const assignment = doc.data() as Assignment;
    const submissionQuery = query(
      collection(db, 'assignments', doc.id, 'submissions'),
      where('studentId', '==', userId)
    );
    const submissions = await getDocs(submissionQuery);
    
    if (!submissions.empty) {
      const submission = submissions.docs[0].data();
      assignmentStats.completed++;
      
      if (submission.submittedAt.toDate() <= assignment.dueDate.toDate()) {
        assignmentStats.onTime++;
      } else {
        assignmentStats.late++;
      }
      
      if (submission.grade !== undefined) {
        assignmentStats.earnedPoints += submission.grade;
        assignmentStats.totalPoints += assignment.points;
      }
    }
  }

  if (assignmentStats.completed > 0) {
    assignmentStats.averageScore = assignmentStats.earnedPoints / assignmentStats.totalPoints * 100;
  }

  // Get attendance performance
  const classesQuery = query(
    collection(db, 'live-classes'),
    where('status', '==', 'ended')
  );
  const classes = await getDocs(classesQuery);
  
  const attendanceStats = {
    total: classes.size,
    attended: 0,
    attendanceRate: 0
  };

  for (const doc of classes.docs) {
    const attendanceQuery = query(
      collection(db, 'live-classes', doc.id, 'attendance'),
      where('userId', '==', userId)
    );
    const attendance = await getDocs(attendanceQuery);
    if (!attendance.empty) {
      attendanceStats.attended++;
    }
  }

  if (attendanceStats.total > 0) {
    attendanceStats.attendanceRate = (attendanceStats.attended / attendanceStats.total) * 100;
  }

  return {
    userId,
    assignmentStats,
    attendanceStats,
    achievements: progress.achievements,
    stats: progress.stats,
    generatedAt: Timestamp.now()
  };
}
