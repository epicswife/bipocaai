import { db } from '@/lib/firebase';
import { LiveClass } from '@/types';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  increment,
  serverTimestamp
} from 'firebase/firestore';
import { LIVE_CLASS_ERRORS } from '@/lib/errors';

export async function createLiveClass(liveClass: Omit<LiveClass, 'id' | 'status' | 'currentParticipants'>): Promise<LiveClass> {
  const newClass = {
    ...liveClass,
    status: 'scheduled',
    currentParticipants: 0,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, 'live-classes'), newClass);
  return { ...newClass, id: docRef.id } as LiveClass;
}

export async function startLiveClass(classId: string, meetingUrl: string): Promise<void> {
  const classRef = doc(db, 'live-classes', classId);
  const classDoc = await getDoc(classRef);

  if (!classDoc.exists()) {
    throw LIVE_CLASS_ERRORS.NOT_FOUND;
  }

  const classData = classDoc.data() as LiveClass;
  
  if (classData.status === 'live') {
    throw LIVE_CLASS_ERRORS.ALREADY_STARTED;
  }

  if (classData.status === 'ended') {
    throw LIVE_CLASS_ERRORS.ALREADY_ENDED;
  }

  await updateDoc(classRef, {
    status: 'live',
    meetingUrl,
    startedAt: serverTimestamp(),
  });
}

export async function endLiveClass(classId: string, recordingUrl?: string): Promise<void> {
  const classRef = doc(db, 'live-classes', classId);
  const classDoc = await getDoc(classRef);

  if (!classDoc.exists()) {
    throw LIVE_CLASS_ERRORS.NOT_FOUND;
  }

  await updateDoc(classRef, {
    status: 'ended',
    recordingUrl,
    endedAt: serverTimestamp(),
  });
}

export async function joinLiveClass(classId: string, userId: string): Promise<void> {
  const classRef = doc(db, 'live-classes', classId);
  const classDoc = await getDoc(classRef);

  if (!classDoc.exists()) {
    throw LIVE_CLASS_ERRORS.NOT_FOUND;
  }

  const classData = classDoc.data() as LiveClass;

  if (classData.status !== 'live') {
    throw new Error('Class is not live');
  }

  if (classData.currentParticipants >= classData.maxParticipants) {
    throw new Error('Class is full');
  }

  // Add student to attendance
  await addDoc(collection(db, 'live-classes', classId, 'attendance'), {
    userId,
    joinedAt: serverTimestamp(),
  });

  // Increment participant count
  await updateDoc(classRef, {
    currentParticipants: increment(1)
  });
}

export async function leaveLiveClass(classId: string, userId: string): Promise<void> {
  const classRef = doc(db, 'live-classes', classId);

  // Update attendance record
  const attendanceQuery = query(
    collection(db, 'live-classes', classId, 'attendance'),
    where('userId', '==', userId),
    where('leftAt', '==', null)
  );

  const attendanceDocs = await getDocs(attendanceQuery);
  
  if (!attendanceDocs.empty) {
    await updateDoc(doc(db, 'live-classes', classId, 'attendance', attendanceDocs.docs[0].id), {
      leftAt: serverTimestamp(),
    });
  }

  // Decrement participant count
  await updateDoc(classRef, {
    currentParticipants: increment(-1)
  });
}

export async function getUpcomingClasses(): Promise<LiveClass[]> {
  const snapshot = await getDocs(
    query(
      collection(db, 'live-classes'),
      where('status', '==', 'scheduled'),
      where('startTime', '>', Timestamp.now()),
      orderBy('startTime', 'asc')
    )
  );

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LiveClass));
}

export async function getLiveClasses(): Promise<LiveClass[]> {
  const snapshot = await getDocs(
    query(
      collection(db, 'live-classes'),
      where('status', '==', 'live'),
      orderBy('startTime', 'desc')
    )
  );

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LiveClass));
}

export async function getTeacherClasses(teacherId: string): Promise<LiveClass[]> {
  const snapshot = await getDocs(
    query(
      collection(db, 'live-classes'),
      where('teacherId', '==', teacherId),
      orderBy('startTime', 'desc')
    )
  );

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LiveClass));
}

export async function getClassAttendance(classId: string): Promise<{
  userId: string;
  joinedAt: Timestamp;
  leftAt?: Timestamp;
}[]> {
  const snapshot = await getDocs(
    collection(db, 'live-classes', classId, 'attendance')
  );

  return snapshot.docs.map(doc => doc.data() as any);
}
