"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@/lib/auth";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
  QueryConstraint
} from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, UserCircle } from "lucide-react";
import { toast } from "sonner";

import { ExtendedUser } from "@/lib/types";

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

export default function ChatPage() {
  const { user, loading } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("teachers");

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load contacts based on active tab
  useEffect(() => {
    if (!user) return;

    const loadContacts = async () => {
      try {
        const contactsRef = collection(db, "users");
        let queryConstraints: QueryConstraint[] = [];

        switch (activeTab) {
          case "teachers":
            queryConstraints = [
              where("role", "==", "teacher"),
              where("active", "==", true)
            ];
            break;
          case "counselors":
            queryConstraints = [
              where("role", "==", "counselor"),
              where("active", "==", true)
            ];
            break;
          case "classmates":
            queryConstraints = [
              where("role", "==", "student"),
              where("active", "==", true),
              where("uid", "!=", user.uid)
            ];
            break;
          default:
            queryConstraints = [];
        }

        const finalQuery = query(contactsRef, ...queryConstraints);
        const snapshot = await getDocs(finalQuery);
        const contactsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          status: Math.random() > 0.5 ? 'online' : 'offline', // Simulated online status
          lastActive: new Date().toISOString(),
        })) as ChatContact[];

        setContacts(contactsList);
      } catch (error) {
        console.error("Error loading contacts:", error);
        toast.error("Failed to load contacts");
      }
    };

    loadContacts();
  }, [user, activeTab]);

  // Load and listen to messages
  useEffect(() => {
    if (!user || !selectedContact) return;

    const messagesRef = collection(db, "messages");
    
    // Create a compound query for messages between these two users
    const q = query(
      messagesRef,
      where("participants", "array-contains", user.uid),
      where("chatId", "==", [user.uid, selectedContact.id].sort().join("_")),
      orderBy("timestamp", "asc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [user, selectedContact]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedContact || !newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      // Create a consistent chat ID by sorting UIDs
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
      .map(part => part[0])
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
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-12rem)]">
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* Contacts List */}
        <Card className="col-span-4 border-primary/20">
          <CardHeader className="pb-4">
            <CardTitle>Messages</CardTitle>
            <Tabs defaultValue="teachers" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="teachers" className="flex-1">Teachers</TabsTrigger>
                <TabsTrigger value="counselors" className="flex-1">Counselors</TabsTrigger>
                <TabsTrigger value="classmates" className="flex-1">Classmates</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedContact?.id === contact.id
                        ? "bg-primary/10"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatarUrl} />
                          <AvatarFallback className="bg-primary/10">
                            {getInitials(contact.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div 
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                            contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{contact.name}</p>
                          <Badge variant="outline" className="ml-2">
                            {contact.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.lastMessage || "No messages yet"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="col-span-8 border-primary/20">
          {selectedContact ? (
            <>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedContact.avatarUrl} />
                    <AvatarFallback className="bg-primary/10">
                      {getInitials(selectedContact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedContact.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-25rem)]">
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isOwnMessage = message.senderId === user?.uid;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`flex items-end space-x-2 max-w-[70%] ${isOwnMessage ? "flex-row-reverse space-x-reverse" : ""}`}>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={message.senderAvatar} />
                              <AvatarFallback className="bg-primary/10 text-xs">
                                {getInitials(message.senderName)}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`rounded-lg p-3 ${
                                isOwnMessage
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center space-x-2 mt-4"
                >
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isSending || !newMessage.trim()}>
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <UserCircle className="h-16 w-16 mb-4" />
              <p>Select a contact to start chatting</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}