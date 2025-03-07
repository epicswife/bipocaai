import { create } from 'zustand';
import { collections, serverTimestamp } from '@/lib/db';
import { subscribeToMentalHealthRequests, subscribeToCounselors } from '@/lib/queries';
import { toast } from 'sonner';
import type { MentalHealthRequest as DBMentalHealthRequest, CounselorData } from '@/lib/db';
import { RequestStatus, RequestPriority, CounselorStatus, CounselorSchedule } from '@/constants';



export type MentalHealthRequest = DBMentalHealthRequest;

export type CounselorAvailability = CounselorData & {
  schedule: CounselorSchedule;
};

interface MentalHealthState {
  requests: MentalHealthRequest[];
  counselors: CounselorAvailability[];
  isLoading: boolean;
  error?: string;
  selectedRequest: MentalHealthRequest | null;
  // Actions
  setRequests: (requests: MentalHealthRequest[]) => void;
  setCounselors: (counselors: CounselorAvailability[]) => void;
  setSelectedRequest: (request: MentalHealthRequest | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error?: string) => void;
  // Real-time subscriptions
  subscribeToRequests: (userId: string) => () => void;
  subscribeToCounselors: () => () => void;
  // Request management
  createRequest: (request: Omit<MentalHealthRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateRequestStatus: (requestId: string, status: RequestStatus) => Promise<void>;
  reset: () => void;
}

const initialState = {
  requests: [],
  counselors: [],
  isLoading: false,
  selectedRequest: null,
};

export const useMentalHealthStore = create<MentalHealthState>((set) => ({
  ...initialState,
  setRequests: (requests) => set({ requests }),
  setCounselors: (counselors) => set({ counselors }),
  setSelectedRequest: (selectedRequest) => set({ selectedRequest }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  subscribeToRequests: (userId: string) => {
    set({ isLoading: true });
    return subscribeToMentalHealthRequests(userId, 
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
  createRequest: async (request: Omit<MentalHealthRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    try {
      set({ isLoading: true });
      
      const newRequest = {
        ...request,
        id: collections.mentalHealthRequests.doc().id,
        status: RequestStatus.PENDING,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await collections.mentalHealthRequests.add(newRequest);
      toast.success('Request submitted successfully');
    } catch (error) {
      console.error('Error creating request:', error);
      set({ error: 'Failed to create request' });
      toast.error('Failed to submit request');
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
      set({ error: 'Failed to update request status' });
      toast.error('Failed to update request status');
      throw error;
    }
  },
  reset: () => set(initialState)
}));
