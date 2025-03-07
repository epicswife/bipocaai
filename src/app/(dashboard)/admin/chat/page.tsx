"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser } from "@/lib/auth";
import { ExtendedUser } from "@/lib/types";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, limit, getDocs, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, UserCircle } from "lucide-react";
import { toast } from "sonner";



interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  receiverId: string;
  timestamp: FirebaseTimestamp;
}

type FirebaseTimestamp = {
  toDate: () => Date;
  seconds: number;
  nanoseconds: number;
};

interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  lastMessage?: string;
  unreadCount?: number;
  lastActive?: string;
  status?: 'online' | 'offline' | 'away';
}

export default function AdminChatPage() {
  const { user } = useUser();
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("students");

  const loadContacts = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const contactsRef = collection(db, "users");
      let contactsQuery;

      const baseQuery = query(contactsRef);

      switch (activeTab) {
        case "students":
          contactsQuery = query(baseQuery, 
            where("role", "==", "student"),
            where("active", "==", true)
          );
          break;
        case "teachers":
          contactsQuery = query(baseQuery, 
            where("role", "==", "teacher"),
            where("active", "==", true)
          );
          break;
        case "counselors":
          contactsQuery = query(baseQuery, 
            where("role", "==", "counselor"),
            where("active", "==", true)
          );
          break;
        case "social_workers":
          contactsQuery = query(baseQuery, 
            where("role", "==", "social_worker"),
            where("active", "==", true)
          );
          break;
        default:
          contactsQuery = baseQuery;
      }

      const snapshot = await getDocs(contactsQuery);
      const contactsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ChatContact[];

      setContacts(contactsList);
    } catch (error) {
      console.error("Error loading contacts:", error);
      toast.error("Failed to load contacts");
    } finally {
      setIsLoading(false);
    }
  }, [user, activeTab]);

  const loadMessages = useCallback(async () => {
    if (!user || !selectedContact) return;

    const messagesRef = collection(db, "messages");
    
    const q = query(
      messagesRef,
      where("participants", "array-contains", user.uid),
      where("chatId", "==", [user.uid, selectedContact.id].sort().join("_")),
      orderBy("timestamp", "asc"),
      limit(50)
    );

    return onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(messagesList);
    });
  }, [user, selectedContact, setMessages]);
  

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedContact || !newMessage.trim()) return;

    setIsSending(true);
    try {
      const chatId = [user.uid, selectedContact.id].sort().join("_");
      
      await addDoc(collection(db, "messages"), {
        text: newMessage.trim(),
        senderId: user.uid,
        senderName: (user as unknown as ExtendedUser).name,
        senderAvatar: (user as unknown as ExtendedUser).avatarUrl,
        receiverId: selectedContact.id,
        participants: [user.uid, selectedContact.id],
        chatId: chatId,
        timestamp: serverTimestamp(),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (timestamp: FirebaseTimestamp | null) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  useEffect(() => {
    if (user) {
      loadContacts();
    }
  }, [loadContacts, user]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    if (user && selectedContact) {
      const setupMessages = async () => {
        unsubscribe = await loadMessages();
      };
      setupMessages();
    }
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [loadMessages, user, selectedContact]);   

  if (!user) {
    return <div className="p-8 text-center">Please log in to access the chat.</div>;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      <div className="w-80 border-r">
        <div className="p-4 border-b">
          <Tabs defaultValue="students" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="counselors">Counselors</TabsTrigger>
              <TabsTrigger value="social_workers">Social Workers</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {contacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={`p-3 cursor-pointer hover:bg-accent ${
                    selectedContact?.id === contact.id ? "bg-accent" : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={contact.avatarUrl} />
                      <AvatarFallback>
                        {getInitials(contact.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{contact.name}</p>
                        {contact.status === "online" && (
                          <Badge variant="default" className="ml-2 bg-green-500">
                            Online
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.lastMessage || `${contact.role}`}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedContact.avatarUrl} />
                  <AvatarFallback>
                    {getInitials(selectedContact.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedContact.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedContact.role}
                  </p>
                </div>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === user.uid ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-2 max-w-[70%] ${
                        message.senderId === user.uid ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.senderAvatar} />
                        <AvatarFallback>
                          {getInitials(message.senderName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground">
                            {message.senderName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.senderId === user.uid
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <form onSubmit={sendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isSending}
                />
                <Button type="submit" disabled={isSending}>
                  {isSending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <UserCircle className="w-12 h-12 mb-2" />
            <p>Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
