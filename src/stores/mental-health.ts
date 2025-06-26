import { create } from 'zustand';
import { collections, serverTimestamp } from '@/lib/db';
import { subscribeToMentalHealthRequests, subscribeToCounselors } from '@/lib/queries';
import { toast } from 'sonner';
import type { MentalHealthRequest as DBMentalHealthRequest, CounselorData } from '@/lib/db';
import { RequestStatus, RequestPriority, CounselorStatus, type CounselorSchedule } from '@/constants';

// Export types and enums for external use
export { RequestStatus, RequestPriority, CounselorStatus };
export type MentalHealthRequest = DBMentalHealthRequest;

// Type for counselor with schedule
export type CounselorAvailability = CounselorData & {
  schedule: CounselorSchedule;
  status: CounselorStatus;
};

// Base request type without system fields
export type BaseRequest = Omit<MentalHealthRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

// State interface following established patterns
interface MentalHealthState {
  // Data
  requests: MentalHealthRequest[];
  counselors: CounselorData[];
  isLoading: boolean;
  error?: string;
  selectedRequest: MentalHealthRequest | null;

  // Actions
  setRequests: (requests: MentalHealthRequest[]) => void;
  setCounselors: (counselors: CounselorData[]) => void;
  setSelectedRequest: (request: MentalHealthRequest | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error?: string) => void;

  // Real-time subscriptions
  subscribeToRequests: (userId: string) => () => void;
  subscribeToCounselors: () => () => void;

  // Request management
  createRequest: (request: BaseRequest) => Promise<void>;
  updateRequestStatus: (requestId: string, status: RequestStatus) => Promise<void>;
  reset: () => void;
}

// Initial state with proper types
const initialState: Pick<MentalHealthState, 'requests' | 'counselors' | 'isLoading' | 'selectedRequest'> = {
  requests: [],
  counselors: [],
  isLoading: false,
  selectedRequest: null,
};

// Create store with proper error handling and type safety
export const useMentalHealthStore = create<MentalHealthState>((set) => ({
  ...initialState,

  // Basic state setters
  setRequests: (requests) => set({ requests }),
  setCounselors: (counselors) => set({ counselors }),
  setSelectedRequest: (selectedRequest) => set({ selectedRequest }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Real-time subscription handlers
  subscribeToRequests: (userId: string) => {
    set({ isLoading: true });
    return subscribeToMentalHealthRequests(
      userId,
      (requests) => {
        set({ requests, isLoading: false });
      }
    );
  },

  subscribeToCounselors: () => {
    return subscribeToCounselors(
      (counselors) => {
        set({ counselors });
      }
    );
  },

  // Request management with proper error handling
  createRequest: async (request: BaseRequest) => {
    try {
      set({ isLoading: true });
      
      const newRequest = {
        ...request,
        id: collections.mentalHealthRequests.doc().id,
        status: RequestStatus.PENDING,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      } satisfies MentalHealthRequest;

      await collections.mentalHealthRequests.add(newRequest);
      toast.success('Request submitted successfully');
    } catch (error) {
      console.error('Error creating request:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create request';
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateRequestStatus: async (requestId: string, status: RequestStatus) => {
    try {
      const update = {
        status,
        updatedAt: serverTimestamp()
      } as const;

      await collections.mentalHealthRequests.doc(requestId).update(update);
      toast.success('Request status updated');
    } catch (error) {
      console.error('Error updating request status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update request status';
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Reset state
  reset: () => set(initialState)
}));
