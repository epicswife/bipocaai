import { db } from '@/lib/firebase';
import { 
  doc, 
  collection,
  query,
  where,
  onSnapshot,
  DocumentData
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LiveClass, Assignment, Achievement, StudentProgress } from '@/types';

// Generic real-time hook for any collection
export function useCollectionRealtime<T extends DocumentData>(
  collectionPath: string,
  queryConstraints: Parameters<typeof query>[1][] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, collectionPath), ...queryConstraints);
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as unknown as T[];
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error('Real-time subscription error:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionPath, queryConstraints]);

  return { data, loading, error };
}

// Generic real-time hook for a single document
export function useDocumentRealtime<T extends DocumentData>(documentPath: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, documentPath),
      (doc) => {
        setData(doc.exists() ? { id: doc.id, ...doc.data() } as unknown as T : null);
        setLoading(false);
      },
      (err) => {
        console.error('Real-time document subscription error:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [documentPath]);

  return { data, loading, error };
}

// Live Classes
export function useLiveClassesRealtime(status?: 'scheduled' | 'live' | 'ended') {
  const constraints = status ? [where('status', '==', status)] : [];
  return useCollectionRealtime<LiveClass>('live-classes', constraints);
}

export function useLiveClassRealtime(classId: string) {
  return useDocumentRealtime<LiveClass>(`live-classes/${classId}`);
}

// Assignments
export function useAssignmentsRealtime(teacherId?: string) {
  const constraints = teacherId ? [where('teacherId', '==', teacherId)] : [];
  return useCollectionRealtime<Assignment>('assignments', constraints);
}

export function useAssignmentRealtime(assignmentId: string) {
  return useDocumentRealtime<Assignment>(`assignments/${assignmentId}`);
}

// Achievements
export function useAchievementsRealtime() {
  return useCollectionRealtime<Achievement>('achievements');
}

export function useAchievementRealtime(achievementId: string) {
  return useDocumentRealtime<Achievement>(`achievements/${achievementId}`);
}

// Student Progress
export function useStudentProgressRealtime(userId: string) {
  return useDocumentRealtime<StudentProgress>(`student-progress/${userId}`);
}

// Attendance tracking for live classes
export function useClassAttendanceRealtime(classId: string) {
  return useCollectionRealtime(`live-classes/${classId}/attendance`);
}

// Assignment submissions
export function useAssignmentSubmissionsRealtime(assignmentId: string) {
  return useCollectionRealtime(`assignments/${assignmentId}/submissions`);
}

// Custom hook for tracking multiple related collections
export function useStudentDashboardRealtime(userId: string) {
  const [dashboard, setDashboard] = useState({
    upcomingClasses: [] as LiveClass[],
    activeAssignments: [] as Assignment[],
    recentAchievements: [] as Achievement[],
    progress: null as StudentProgress | null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    try {
      // Track upcoming classes
      const classesQuery = query(
        collection(db, 'live-classes'),
        where('status', '==', 'scheduled')
      );
      unsubscribers.push(
        onSnapshot(classesQuery, (snapshot) => {
          setDashboard(prev => ({
            ...prev,
            upcomingClasses: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as LiveClass[]
          }));
        })
      );

      // Track active assignments
      const assignmentsQuery = query(
        collection(db, 'assignments'),
        where('status', '==', 'published')
      );
      unsubscribers.push(
        onSnapshot(assignmentsQuery, (snapshot) => {
          setDashboard(prev => ({
            ...prev,
            activeAssignments: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Assignment[]
          }));
        })
      );

      // Track achievements
      const progressRef = doc(db, 'student-progress', userId);
      unsubscribers.push(
        onSnapshot(progressRef, (doc) => {
          setDashboard(prev => ({
            ...prev,
            progress: doc.exists() ? { id: doc.id, ...doc.data() } as unknown as StudentProgress : null
          }));
        })
      );

      setLoading(false);
    } catch (err) {
      console.error('Error setting up real-time subscriptions:', err);
      setError(err as Error);
      setLoading(false);
    }

    return () => unsubscribers.forEach(unsubscribe => unsubscribe());
  }, [userId]);

  return { dashboard, loading, error };
}
