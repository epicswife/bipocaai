import { collections, serverTimestamp, type MentalHealthRequest, type CounselorData, type MentalHealthAssessment, type MentalHealthAppointment } from './db';
import type { QueryDocumentSnapshot, DocumentData, Unsubscribe } from 'firebase/firestore';
import {  CounselorStatus } from '@/constants';

// Type-safe document conversion
type WithId<T> = T & { id: string };

// Helper function to convert Firestore doc to typed data with proper error handling
export function convertDoc<T extends DocumentData>(doc: QueryDocumentSnapshot<T>): WithId<T> {
  try {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
    } as WithId<T>;
  } catch (error) {
    console.error('Error converting document:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to convert document: ${error.message}`
        : 'Failed to convert document'
    );
  }
}

// Mental Health Queries following established patterns
export async function fetchMentalHealthRequests(userId: string): Promise<WithId<MentalHealthRequest>[]> {
  try {
    const snapshot = await collections.mentalHealthRequests
      .where('counselorId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc) => 
      convertDoc<MentalHealthRequest>(doc as unknown as QueryDocumentSnapshot<MentalHealthRequest>)
    );
  } catch (error) {
    console.error('Error fetching mental health requests:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to fetch mental health requests: ${error.message}`
        : 'Failed to fetch mental health requests'
    );
  }
}

export async function fetchAvailableCounselors(): Promise<WithId<CounselorData>[]> {
  try {
    const snapshot = await collections.counselors
      .where('status', '==', CounselorStatus.AVAILABLE)
      .orderBy('currentLoad')
      .get();

    return snapshot.docs.map((doc) =>
      convertDoc<CounselorData>(doc as unknown as QueryDocumentSnapshot<CounselorData>)
    );
  } catch (error) {
    console.error('Error fetching available counselors:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to fetch available counselors: ${error.message}`
        : 'Failed to fetch available counselors'
    );
  }
}

// Type-safe subscription queries with proper cleanup
export function subscribeToMentalHealthRequests(
  userId: string,
  onUpdate: (requests: WithId<MentalHealthRequest>[]) => void
): Unsubscribe {
  return collections.mentalHealthRequests
    .where('counselorId', '==', userId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      (snapshot) => {
        try {
          const requests = snapshot.docs.map((doc) =>
            convertDoc<MentalHealthRequest>(doc as unknown as QueryDocumentSnapshot<MentalHealthRequest>)
          );
          onUpdate(requests);
        } catch (error) {
          console.error('Error processing mental health requests update:', error);
          // Don't throw in subscription callback - it would break the subscription
          onUpdate([]);
        }
      },
      (error) => {
        console.error('Error in mental health requests subscription:', error);
        // Don't throw in error callback - it would break the subscription
        onUpdate([]);
      }
    );
}

export function subscribeToCounselors(
  onUpdate: (counselors: WithId<CounselorData>[]) => void
): Unsubscribe {
  return collections.counselors
    .orderBy('currentLoad')
    .onSnapshot(
      (snapshot) => {
        try {
          const counselors = snapshot.docs.map((doc) =>
            convertDoc<CounselorData>(doc as unknown as QueryDocumentSnapshot<CounselorData>)
          );
          onUpdate(counselors);
        } catch (error) {
          console.error('Error processing counselors update:', error);
          // Don't throw in subscription callback - it would break the subscription
          onUpdate([]);
        }
      },
      (error) => {
        console.error('Error in counselors subscription:', error);
        // Don't throw in error callback - it would break the subscription
        onUpdate([]);
      }
    );
}

// Mental Health Assessment Queries
export async function createAssessment(assessmentData: Omit<MentalHealthAssessment, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await collections.mentalHealthAssessments.add({
      ...assessmentData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating assessment:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to create assessment: ${error.message}`
        : 'Failed to create assessment'
    );
  }
}

export async function fetchUserAssessments(userId: string): Promise<WithId<MentalHealthAssessment>[]> {
  try {
    const snapshot = await collections.mentalHealthAssessments
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .get();

    return snapshot.docs.map((doc) => 
      convertDoc<MentalHealthAssessment>(doc as unknown as QueryDocumentSnapshot<MentalHealthAssessment>)
    );
  } catch (error) {
    console.error('Error fetching user assessments:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to fetch user assessments: ${error.message}`
        : 'Failed to fetch user assessments'
    );
  }
}

export async function fetchAssessmentById(assessmentId: string): Promise<WithId<MentalHealthAssessment> | null> {
  try {
    const docRef = collections.mentalHealthAssessments.doc(assessmentId);
    const doc = await docRef.get();
    
    if (doc.exists) {
      return convertDoc<MentalHealthAssessment>(doc as unknown as QueryDocumentSnapshot<MentalHealthAssessment>);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching assessment by ID:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to fetch assessment: ${error.message}`
        : 'Failed to fetch assessment'
    );
  }
}

export function subscribeToUserAssessments(
  userId: string,
  onUpdate: (assessments: WithId<MentalHealthAssessment>[]) => void
): Unsubscribe {
  return collections.mentalHealthAssessments
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .limit(10)
    .onSnapshot(
      (snapshot) => {
        try {
          const assessments = snapshot.docs.map((doc) =>
            convertDoc<MentalHealthAssessment>(doc as unknown as QueryDocumentSnapshot<MentalHealthAssessment>)
          );
          onUpdate(assessments);
        } catch (error) {
          console.error('Error processing assessments update:', error);
          // Don't throw in subscription callback - it would break the subscription
          onUpdate([]);
        }
      },
      (error) => {
        console.error('Error in assessments subscription:', error);
        // Don't throw in error callback - it would break the subscription
        onUpdate([]);
      }
    );
}

// Mental Health Appointment Queries
export async function createAppointment(appointmentData: Omit<MentalHealthAppointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const now = serverTimestamp();
    const docRef = await collections.appointments.add({
      ...appointmentData,
      createdAt: now,
      updatedAt: now
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to create appointment: ${error.message}`
        : 'Failed to create appointment'
    );
  }
}

export async function fetchUserAppointments(userId: string): Promise<WithId<MentalHealthAppointment>[]> {
  try {
    const snapshot = await collections.appointments
      .where('userId', '==', userId)
      .orderBy('date', 'asc')
      .get();

    return snapshot.docs.map((doc) => 
      convertDoc<MentalHealthAppointment>(doc as unknown as QueryDocumentSnapshot<MentalHealthAppointment>)
    );
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to fetch user appointments: ${error.message}`
        : 'Failed to fetch user appointments'
    );
  }
}

export async function fetchUpcomingAppointments(userId: string): Promise<WithId<MentalHealthAppointment>[]> {
  try {
    const now = serverTimestamp();
    const snapshot = await collections.appointments
      .where('userId', '==', userId)
      .where('date', '>=', now)
      .where('status', '==', 'scheduled')
      .orderBy('date', 'asc')
      .limit(5)
      .get();

    return snapshot.docs.map((doc) => 
      convertDoc<MentalHealthAppointment>(doc as unknown as QueryDocumentSnapshot<MentalHealthAppointment>)
    );
  } catch (error) {
    console.error('Error fetching upcoming appointments:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to fetch upcoming appointments: ${error.message}`
        : 'Failed to fetch upcoming appointments'
    );
  }
}

export async function updateAppointment(
  appointmentId: string,
  updates: Partial<Omit<MentalHealthAppointment, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  try {
    const docRef = collections.appointments.doc(appointmentId);
    await docRef.update({
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to update appointment: ${error.message}`
        : 'Failed to update appointment'
    );
  }
}

export async function cancelAppointment(appointmentId: string): Promise<void> {
  try {
    const docRef = collections.appointments.doc(appointmentId);
    await docRef.update({
      status: 'cancelled',
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to cancel appointment: ${error.message}`
        : 'Failed to cancel appointment'
    );
  }
}

export function subscribeToUserAppointments(
  userId: string,
  onUpdate: (appointments: WithId<MentalHealthAppointment>[]) => void
): Unsubscribe {
  return collections.appointments
    .where('userId', '==', userId)
    .orderBy('date', 'asc')
    .onSnapshot(
      (snapshot) => {
        try {
          const appointments = snapshot.docs.map((doc) =>
            convertDoc<MentalHealthAppointment>(doc as unknown as QueryDocumentSnapshot<MentalHealthAppointment>)
          );
          onUpdate(appointments);
        } catch (error) {
          console.error('Error processing appointments update:', error);
          // Don't throw in subscription callback - it would break the subscription
          onUpdate([]);
        }
      },
      (error) => {
        console.error('Error in appointments subscription:', error);
        // Don't throw in error callback - it would break the subscription
        onUpdate([]);
      }
    );
}
