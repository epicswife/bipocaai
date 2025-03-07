import { create } from 'zustand';
import { Timestamp } from 'firebase/firestore';

export type UserStatus = "online" | "offline" | "away";
export type UserRole = "student" | "teacher" | "social_worker" | "counselor" | "admin" | "parent";
export type TabType = "assigned" | "all";

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: Timestamp;
  type: "text" | "image" | "file";
  status: "sending" | "sent" | "error";
}

export interface ChatContact {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  lastMessage?: string;
  unreadCount: number;
  lastActive?: Timestamp | null;
  status: UserStatus;
  assignedCounselor?: string;
  grade?: string;
  recentActivity?: string;
  active: boolean;
}

interface ChatState {
  contacts: ChatContact[];
  messages: Message[];
  selectedContact: ChatContact | null;
  newMessage: string;
  isLoading: boolean;
  isSending: boolean;
  isLoadingMessages: boolean;
  contactError?: string;
  messageError?: string;
  activeTab: TabType;
  selectedRole: UserRole;
  searchQuery: string;
  setContacts: (contacts: ChatContact[]) => void;
  setMessages: (messages: Message[]) => void;
  setSelectedContact: (contact: ChatContact | null) => void;
  setNewMessage: (message: string) => void;
  setLoading: (isLoading: boolean) => void;
  setSending: (isSending: boolean) => void;
  setLoadingMessages: (isLoading: boolean) => void;
  setContactError: (error?: string) => void;
  setMessageError: (error?: string) => void;
  setActiveTab: (tab: TabType) => void;
  setSelectedRole: (role: UserRole) => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}

const initialState = {
  contacts: [],
  messages: [],
  selectedContact: null,
  newMessage: "",
  isLoading: true,
  isSending: false,
  isLoadingMessages: false,
  activeTab: "assigned" as TabType,
  selectedRole: "student" as UserRole,
  searchQuery: ""
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,
  setContacts: (contacts) => set({ contacts }),
  setMessages: (messages) => set({ messages }),
  setSelectedContact: (selectedContact) => set({ selectedContact }),
  setNewMessage: (newMessage) => set({ newMessage }),
  setLoading: (isLoading) => set({ isLoading }),
  setSending: (isSending) => set({ isSending }),
  setLoadingMessages: (isLoadingMessages) => set({ isLoadingMessages }),
  setContactError: (contactError) => set({ contactError }),
  setMessageError: (messageError) => set({ messageError }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setSelectedRole: (selectedRole) => set({ selectedRole }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  reset: () => set(initialState)
}));
