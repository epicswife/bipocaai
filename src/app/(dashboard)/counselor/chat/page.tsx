"use client";

import { useEffect, useCallback } from 'react';
import { useUser } from '@/lib/auth';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  Timestamp,
  limit,
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Loader2, MessageSquare, Send, UserCircle, Users } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useChatStore, UserRole, Message, ChatContact, TabType } from '@/stores/chat';

const USER_ROLE_LABELS: Record<UserRole, string> = {
  student: 'Students',
  teacher: 'Teachers',
  social_worker: 'Social Workers',
  counselor: 'Counselors',
  admin: 'Administrators',
  parent: 'Parents',
} as const;

// Utility functions
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const formatTime = (timestamp: Timestamp): string => {
  try {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return '';
  }
};

const USER_ROLE_COLORS: Record<UserRole, string> = {
  student: 'bg-blue-500/20 text-blue-600',
  teacher: 'bg-green-500/20 text-green-600',
  social_worker: 'bg-purple-500/20 text-purple-600',
  counselor: 'bg-orange-500/20 text-orange-600',
  admin: 'bg-red-500/20 text-red-600',
  parent: 'bg-teal-500/20 text-teal-600',
} as const;

const getRoleColor = (role: UserRole): string => USER_ROLE_COLORS[role];

export default function CounselorChatPage() {
  const { user } = useUser();
  const {
    contacts,
    messages,
    selectedContact,
    newMessage,
    isLoading,
    isSending,
    isLoadingMessages,
    contactError,
    messageError,
    activeTab,
    selectedRole,
    searchQuery,
    setContacts,
    setMessages,
    setSelectedContact,
    setNewMessage,
    setLoading,
    setSending,
    setLoadingMessages,
    setContactError,
    setMessageError,
    setActiveTab,
    setSelectedRole,
    setSearchQuery,
    reset,
  } = useChatStore();

  const loadContacts = useCallback(() => {
    if (!user?.uid) return;

    try {
      setLoading(true);
      setContactError(undefined);

      const contactsRef = collection(db, 'users');
      const baseConstraints = [
        where('active', '==', true),
        orderBy('lastActive', 'desc'),
      ];

      const queryConstraints = activeTab === 'assigned'
        ? [
            where('role', '==', 'student'),
            where('assignedCounselor', '==', user.uid),
            ...baseConstraints,
          ]
        : [
            where('role', '==', selectedRole),
            ...baseConstraints,
          ];

      const q = query(contactsRef, ...queryConstraints);
      return onSnapshot(q, (snapshot) => {
        const loadedContacts = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as ChatContact
        );
        setContacts(loadedContacts);
        setLoading(false);
      }, (error) => {
        console.error('Error loading contacts:', error);
        setContactError('Failed to load contacts');
        setLoading(false);
        toast.error('Error loading contacts');
      });
    } catch (error) {
      console.error('Contacts load error:', error);
      setContactError('Error loading contacts');
      setLoading(false);
    }
  }, [user?.uid, activeTab, selectedRole, setContacts, setLoading, setContactError]);

  const loadMessages = useCallback((contactId: string) => {
    if (!user?.uid || !contactId) return;

    try {
      setLoadingMessages(true);
      setMessageError(undefined);

      const messagesRef = collection(db, 'messages');
      const q = query(
        messagesRef,
        where('participants', 'array-contains', user.uid),
        where('participants', 'array-contains', contactId),
        orderBy('timestamp', 'desc'),
        limit(50)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loadedMessages = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as Message
        );
        setMessages(loadedMessages);
        setLoadingMessages(false);
      }, (error) => {
        console.error('Error loading messages:', error);
        setMessageError('Failed to load messages');
        setLoadingMessages(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Messages load error:', error);
      setMessageError('Error loading messages');
      setLoadingMessages(false);
      return undefined;
    }
  }, [user?.uid, setMessages, setLoadingMessages, setMessageError]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedContact) return;

    try {
      setSending(true);
      
      await addDoc(collection(db, 'messages'), {
        content: newMessage,
        senderId: user.uid,
        senderName: user.displayName,
        participants: [user.uid, selectedContact.id],
        timestamp: serverTimestamp(),
        status: 'sent',
      });

      setNewMessage('');
    } catch (error) {
      console.error('Message send error:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const unsubscribe = loadContacts();
    return () => {
      if (unsubscribe) unsubscribe();
      reset();
    };
  }, [loadContacts, reset]);

  useEffect(() => {
    if (selectedContact) {
      const unsubscribe = loadMessages(selectedContact.id);
      return () => unsubscribe?.();
    }
  }, [selectedContact, loadMessages]);

  if (!user) {
    return <div className="p-8 text-center">Please log in to access the chat.</div>;
  }

  return (
    <div className="container mx-auto h-[calc(100vh-2rem)] p-4">
      <div className="flex h-full bg-background/50 rounded-xl border border-primary/10 overflow-hidden shadow-lg">

        <aside className="w-[320px] border-r border-primary/10 bg-background/80 backdrop-blur-sm flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-orbitron font-bold text-primary mb-6">Messages</h1>
            <div className="relative mb-6">
              <div className="relative">
                <Input
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background/50 border-primary/20 pl-10 py-5"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-muted-foreground">Filter by Role</h2>
                <Select
                  value={selectedRole}
                  onValueChange={(value) => setSelectedRole(value as UserRole)}
                >
                  <SelectTrigger className="w-[180px] bg-background/50">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.entries(USER_ROLE_LABELS).map(([role, label]) => (
                        <SelectItem key={role} value={role}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Tabs defaultValue="assigned" className="w-full" onValueChange={(value) => setActiveTab(value as TabType)}>
                <TabsList className="grid w-full grid-cols-2 bg-background/50 p-1 rounded-lg">
                  <TabsTrigger value="assigned" className="text-sm font-medium rounded-md">My Students</TabsTrigger>
                  <TabsTrigger value="all" className="text-sm font-medium rounded-md">All {USER_ROLE_LABELS[selectedRole]}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 p-4">
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4 rounded-lg bg-background/50 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted/50" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-24 bg-muted/50 rounded" />
                          <div className="h-4 w-16 bg-muted/50 rounded" />
                          <div className="h-4 w-12 bg-muted/50 rounded" />
                        </div>
                        <div className="h-3 w-32 bg-muted/50 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : contacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-12 w-12 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                </div>
                <h3 className="font-medium">
                  {contactError ? "Error loading contacts" : `No ${USER_ROLE_LABELS[selectedRole].toLowerCase()} found`}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {contactError || 
                    (activeTab === "assigned" 
                      ? "You don't have any assigned students yet" 
                      : `Try selecting a different role or check back later`)}
                </p>
                {contactError && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      setContactError(undefined);
                      void loadContacts();
                    }}
                  >
                    Try Again
                  </Button>
                )}
              </div>

            ) : (
              <div className="space-y-2">
                {contacts
                  .filter(contact => 
                    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    USER_ROLE_LABELS[contact.role as UserRole].toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (contact.grade && contact.grade.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((contact) => (
                    <div
                      key={contact.id}
                      className={cn(
                        "p-4 cursor-pointer rounded-lg transition-all duration-200 border",
                        selectedContact?.id === contact.id
                          ? "bg-primary/15 border-primary/30 shadow-md"
                          : "border-transparent hover:bg-accent/10 hover:border-primary/20 hover:shadow-sm"
                      )}
                      onClick={() => setSelectedContact(contact)}
                      role="option"
                      tabIndex={0}
                      aria-selected={selectedContact?.id === contact.id}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedContact(contact);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                          <AvatarFallback>
                            {getInitials(contact.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">{contact.name}</p>
                            <Badge variant="outline" className={cn("text-xs shrink-0", getRoleColor(contact.role))}>
                              {USER_ROLE_LABELS[contact.role]}
                            </Badge>
                            {contact.role === "student" && contact.grade && (
                              <Badge variant="outline" className="text-xs shrink-0">
                                Grade {contact.grade}
                              </Badge>
                            )}
                            {contact.status === "online" && (
                              <Badge variant="default" className="ml-auto text-xs bg-green-500/20 text-green-600 hover:bg-green-500/30 shrink-0">
                                Online
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {contact.lastMessage || contact.recentActivity || "No recent activity"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </aside>
      <main className="flex-1 flex flex-col bg-background/80 backdrop-blur-sm">
        {selectedContact ? (
          <>
            <div className="px-8 py-4 border-b border-primary/10 bg-background/50 backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedContact.avatarUrl} alt={selectedContact.name} />
                  <AvatarFallback>
                    {getInitials(selectedContact.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedContact.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedContact.role}
                    {selectedContact.grade && ` - Grade ${selectedContact.grade}`}
                  </p>
                </div>
              </div>
            </div>
            <ScrollArea className="flex-1 px-8 py-6">
              {isLoadingMessages ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3 animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-muted/50" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-24 bg-muted/50 rounded" />
                        <div className="h-12 w-64 bg-muted/50 rounded-lg" />
                      </div>
                      </div>
                    ))}
                  </div>
                ) : messageError ? (
                  <div className="flex flex-col items-center justify-center h-48 text-destructive/70">
                    <AlertCircle className="w-12 h-12 mb-2 opacity-50" />
                    <p className="text-sm mb-4">{messageError}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setMessageError(undefined);
                        void loadMessages(selectedContact.id);
                      }}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mb-2 opacity-50" aria-hidden="true" />
                    <p className="text-sm">No messages yet</p>
                    <p className="text-xs text-muted-foreground/50">Start the conversation!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3 group",
                          message.senderId === user?.uid ? "justify-end" : "justify-start"
                        )}
                      >
                        {message.senderId !== user?.uid && (
                          <Avatar className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <AvatarImage src={selectedContact.avatarUrl} alt={message.senderName} />
                            <AvatarFallback>{getInitials(message.senderName)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            "rounded-lg px-4 py-2 max-w-[70%] shadow-sm",
                            message.senderId === user?.uid
                              ? "bg-primary text-primary-foreground rounded-br-sm"
                              : "bg-muted/50 backdrop-blur-sm rounded-bl-sm"
                          )}
                        >
                          <p className="text-sm leading-relaxed break-words">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              <form onSubmit={sendMessage} className="px-8 py-4 border-t border-primary/10 bg-background/80 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto w-full">
                  <div className="flex gap-3 items-center bg-background/80 rounded-full border border-primary/20 pl-6 pr-2 shadow-sm hover:border-primary/30 transition-all duration-200">
                    <Input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      disabled={isSending}
                      aria-label="Message input"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="shrink-0 h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary"
                      disabled={isSending || !newMessage.trim()}
                    >
                      {isSending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <UserCircle className="w-12 h-12 mb-2 opacity-50" />
              <p>Select a contact to start chatting</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
