import { collections, type MentalHealthRequest, type CounselorData } from './db';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { RequestStatus } from '@/constants';

// Mental Health Queries
export async function fetchMentalHealthRequests(userId: string) {
  try {
    const snapshot = await collections.mentalHealthRequests
      .where('counselorId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    } as MentalHealthRequest));
  } catch (error) {
    console.error('Error fetching mental health requests:', error);
    throw error;
  }
}

export async function fetchAvailableCounselors() {
  try {
    const snapshot = await collections.counselors
      .where('status', '==', 'available')
      .orderBy('currentLoad')
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    } as CounselorData));
  } catch (error) {
    console.error('Error fetching available counselors:', error);
    throw error;
  }
}

// Helper function to convert Firestore doc to typed data
export function convertDoc<T extends DocumentData>(doc: QueryDocumentSnapshot<T>): T & { id: string } {
  return {
    ...doc.data(),
    id: doc.id
  } as T & { id: string };
}

// Subscription Queries
export function subscribeToMentalHealthRequests(userId: string, onUpdate: (requests: MentalHealthRequest[]) => void) {
  return collections.mentalHealthRequests
    .where('counselorId', '==', userId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      snapshot => {
        const requests = snapshot.docs.map(doc => convertDoc<MentalHealthRequest>(doc as QueryDocumentSnapshot<MentalHealthRequest>));
        onUpdate(requests);
      },
      error => {
        console.error('Error in mental health requests subscription:', error);
        throw error;
      }
    );
}

export function subscribeToCounselors(onUpdate: (counselors: CounselorData[]) => void) {
  return collections.counselors
    .orderBy('currentLoad')
    .onSnapshot(
      snapshot => {
        const counselors = snapshot.docs.map(doc => convertDoc<CounselorData>(doc as QueryDocumentSnapshot<CounselorData>));
        onUpdate(counselors);
      },
      error => {
        console.error('Error in counselors subscription:', error);
        throw error;
      }
    );
}
