import { create } from 'zustand';
import type { ChatContact, ChatMessage } from '@/types';
import type { UserRole } from '@/types';

interface ChatState {
  // Contacts
  contacts: ChatContact[];
  selectedContact: ChatContact | null;
  isLoading: boolean;
  contactError?: Error;
  
  // Messages
  messages: ChatMessage[];
  newMessage: string;
  isSending: boolean;
  isLoadingMessages: boolean;
  messageError?: Error;

  // Filters
  activeTab: 'all' | 'assigned';
  selectedRole: UserRole | 'all';
  searchQuery: string;

  // Actions
  setContacts: (contacts: ChatContact[]) => void;
  setSelectedContact: (contact: ChatContact | null) => void;
  setLoading: (loading: boolean) => void;
  setContactError: (error: Error | undefined) => void;
  
  setMessages: (messages: ChatMessage[]) => void;
  setNewMessage: (message: string) => void;
  setSending: (sending: boolean) => void;
  setLoadingMessages: (loading: boolean) => void;
  setMessageError: (error: Error | undefined) => void;
  
  setActiveTab: (tab: 'all' | 'assigned') => void;
  setSelectedRole: (role: UserRole | 'all') => void;
  setSearchQuery: (query: string) => void;
  
  reset: () => void;
}

const initialState = {
  contacts: [],
  selectedContact: null,
  isLoading: false,
  contactError: undefined,
  
  messages: [],
  newMessage: '',
  isSending: false,
  isLoadingMessages: false,
  messageError: undefined,
  
  activeTab: 'all' as const,
  selectedRole: 'all' as const,
  searchQuery: '',
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,

  // Contacts
  setContacts: (contacts) => set({ contacts }),
  setSelectedContact: (selectedContact) => set({ selectedContact }),
  setLoading: (isLoading) => set({ isLoading }),
  setContactError: (contactError) => set({ contactError }),
  
  // Messages
  setMessages: (messages) => set({ messages }),
  setNewMessage: (newMessage) => set({ newMessage }),
  setSending: (isSending) => set({ isSending }),
  setLoadingMessages: (isLoadingMessages) => set({ isLoadingMessages }),
  setMessageError: (messageError) => set({ messageError }),
  
  // Filters
  setActiveTab: (activeTab) => set({ activeTab }),
  setSelectedRole: (selectedRole) => set({ selectedRole }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  
  // Reset
  reset: () => set(initialState),
}));
