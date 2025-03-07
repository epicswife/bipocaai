import { onDocumentCreated, type FirestoreEvent } from 'firebase-functions/v2/firestore';
import type { QueryDocumentSnapshot, Transaction } from 'firebase-admin/firestore';
import {
  db,
  collections,
  serverTimestamp,
  type MentalHealthRequest,
  type CounselorData,
  LOAD_WEIGHTS
} from '../lib/db';
import { RequestStatus, CounselorStatus } from '@/constants';

interface AssignCounselorResult {
  success: boolean;
  error?: string;
  counselorId?: string;
  counselorName?: string;
  chatRoomId?: string;
}

interface AssignCounselorOptions {
  requestId: string;
  request: MentalHealthRequest;
}

// Helper function to score counselors based on specialties and load
function scoreCounselor(counselor: CounselorData, request: MentalHealthRequest): number {
  const specialtyMatches = request.tags.filter(tag => 
    counselor.specialties.includes(tag)
  ).length;
  
  const loadScore = 1 - (counselor.currentLoad / counselor.maxLoad);
  const specialtyScore = specialtyMatches / request.tags.length;
  const priorityWeight = LOAD_WEIGHTS[request.priority];
  
  return (loadScore + specialtyScore) * priorityWeight;
}

export const assignCounselor = async ({ requestId, request }: AssignCounselorOptions): Promise<AssignCounselorResult> => {
  let selectedCounselor: CounselorData | null = null;
  let resultChatRoomId = '';

  try {
    const counselorsSnapshot = await collections.counselors
      .where('status', '==', 'available')
      .get();

    if (counselorsSnapshot.empty) {
      return {
        success: false,
        error: 'No available counselors found'
      };
    }

    // Get available counselors and filter by load capacity
    const availableCounselors = counselorsSnapshot.docs
      .map(doc => ({ ...doc.data(), id: doc.id } as CounselorData))
      .filter(counselor => counselor.currentLoad < counselor.maxLoad);

    if (availableCounselors.length === 0) {
      return {
        success: false,
        error: 'No counselors available with capacity'
      };
    }

    // Score and sort counselors
    const bestCounselor = availableCounselors
      .map(counselor => ({
        counselor,
        score: scoreCounselor(counselor, request)
      }))
      .sort((a, b) => b.score - a.score)[0];

    if (!bestCounselor?.counselor) {
      return {
        success: false,
        error: 'Could not find suitable counselor'
      };
    }

    selectedCounselor = bestCounselor.counselor;

    if (!selectedCounselor) {
      return {
        success: false,
        error: 'No counselor selected'
      };
    }

    await db.runTransaction(async (transaction: Transaction) => {
      const requestRef = collections.mentalHealthRequests.doc(requestId);
      const counselorRef = collections.counselors.doc(selectedCounselor!.id);
      const chatRoomRef = collections.chatRooms.doc();
      const notificationRef = collections.notifications.doc();

      const newLoad = selectedCounselor!.currentLoad + LOAD_WEIGHTS[request.priority];
      const newStatus = newLoad >= selectedCounselor!.maxLoad ? 'busy' as CounselorStatus : 'available' as CounselorStatus;

      const requestUpdate = {
        counselorId: selectedCounselor!.userId,
        counselorName: selectedCounselor!.name,
        status: RequestStatus.ASSIGNED,
        updatedAt: serverTimestamp()
      } as const;

      const counselorUpdate = {
        currentLoad: newLoad,
        status: newStatus,
        lastActive: serverTimestamp()
      } as const;

      const chatRoomData = {
        participants: [request.studentId, selectedCounselor!.userId] as string[],
        type: 'mental_health' as const,
        requestId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastMessage: null,
        lastMessageAt: null,
        status: 'active',
        metadata: {
          studentName: request.studentName,
          counselorName: selectedCounselor!.name,
          requestType: request.requestType,
          confidential: request.confidential,
          priority: request.priority
        }
      } as const;

      const notificationData = {
        userId: selectedCounselor!.userId,
        type: 'mental_health_assignment' as const,
        title: 'New Mental Health Request',
        message: `You have been assigned to a new ${request.requestType} request from ${request.studentName}`,
        read: false,
        createdAt: serverTimestamp(),
        metadata: {
          requestId,
          chatRoomId: chatRoomRef.id,
          requestType: request.requestType,
          priority: request.priority
        }
      } as const;

      transaction.update(requestRef, requestUpdate);
      transaction.update(counselorRef, counselorUpdate);
      transaction.set(chatRoomRef, chatRoomData);
      transaction.set(notificationRef, notificationData);

      resultChatRoomId = chatRoomRef.id;
    });

    return {
      success: true,
      counselorId: selectedCounselor!.userId,
      counselorName: selectedCounselor!.name,
      chatRoomId: resultChatRoomId
    };
  } catch (err) {
    console.error('Error assigning counselor:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred'
    };
  }
};

export const onNewMentalHealthRequest = onDocumentCreated(
  {
    document: 'mentalHealthRequests/{requestId}',
    region: 'us-central1',
    retry: true,
    memory: '256MiB'
  },
  async (event: FirestoreEvent<QueryDocumentSnapshot | undefined, { requestId: string }>): Promise<AssignCounselorResult | null> => {
    try {
      if (!event.data) {
        console.error('No event data provided');
        return null;
      }

      const requestId = event.params.requestId;
      const request = event.data.data() as MentalHealthRequest;

      if (!request || !requestId) {
        console.error('Invalid request data:', { request, requestId });
        return {
          success: false,
          error: 'Invalid request data'
        };
      }

      return assignCounselor({ requestId, request });
    } catch (err) {
      console.error('Error in onNewMentalHealthRequest:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error occurred'
      };
    }
  });
