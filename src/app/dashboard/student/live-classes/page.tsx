"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser } from "@/lib/auth";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  QueryConstraint,
  Timestamp,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  increment
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Video, Calendar, Users } from "lucide-react";
import { toast } from "sonner";



interface LiveClass {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  startTime: Timestamp;
  duration: number; // in minutes
  maxParticipants: number;
  currentParticipants: number;
  status: 'scheduled' | 'live' | 'ended';
  meetingUrl?: string;
}

export default function LiveClassesPage() {
  const { user } = useUser();
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  const loadClasses = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const classesRef = collection(db, "live-classes");
      const queryConstraints: QueryConstraint[] = [
        where("status", "!=", "ended")
      ];

      if (activeTab === "upcoming") {
        queryConstraints.push(
          where("status", "==", "scheduled"),
          where("startTime", ">", Timestamp.now()),
          orderBy("startTime", "asc")
        );
      } else if (activeTab === "live") {
        queryConstraints.push(
          where("status", "==", "live")
        );
      }

      const finalQuery = query(classesRef, ...queryConstraints);
      const snapshot = await getDocs(finalQuery);
      const classList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LiveClass[];

      setClasses(classList);
    } catch (error) {
      console.error("Error loading classes:", error);
      toast.error("Failed to load live classes");
    } finally {
      setIsLoading(false);
    }
  }, [user, activeTab]);

  const joinClass = async (classId: string) => {
    try {
      // Get the class document
      const classRef = doc(db, "live-classes", classId);
      const classDoc = await getDoc(classRef);
      const classData = classDoc.data() as LiveClass;

      // Check if class is live and has space
      if (classData.status !== 'live') {
        toast.error("This class is not live yet");
        return;
      }

      if (classData.currentParticipants >= classData.maxParticipants) {
        toast.error("This class is full");
        return;
      }

      // Update participants count
      await updateDoc(classRef, {
        currentParticipants: increment(1)
      });

      // Redirect to meeting URL
      if (classData.meetingUrl) {
        window.open(classData.meetingUrl, '_blank');
        toast.success("Joined class successfully!");
      } else {
        toast.error("Meeting URL not found");
      }
    } catch (error) {
      console.error("Error joining class:", error);
      toast.error("Failed to join class");
    }
  };

  const formatTime = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(date);
  };

  useEffect(() => {
    if (user) {
      loadClasses();
    }
  }, [loadClasses, user]);

  if (!user) {
    return <div className="p-8 text-center">Please log in to access live classes.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Live Classes</h1>
        <p className="text-muted-foreground">
          Join interactive live classes with your teachers and classmates.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="upcoming">
            <Calendar className="w-4 h-4 mr-2" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="live">
            <Video className="w-4 h-4 mr-2" />
            Live Now
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : classes.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              No {activeTab === "upcoming" ? "upcoming" : "live"} classes found.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((liveClass) => (
              <Card key={liveClass.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{liveClass.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {liveClass.subject}
                      </p>
                    </div>
                    <Badge
                      variant={liveClass.status === "live" ? "destructive" : "secondary"}
                    >
                      {liveClass.status === "live" ? "LIVE" : "Scheduled"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Teacher</p>
                      <p className="text-sm text-muted-foreground">
                        {liveClass.teacherName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">
                        {formatTime(liveClass.startTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">
                        {liveClass.duration} minutes
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-1" />
                        {liveClass.currentParticipants}/{liveClass.maxParticipants}
                      </div>
                      <Button
                        onClick={() => joinClass(liveClass.id)}
                        disabled={liveClass.status !== "live"}
                      >
                        {liveClass.status === "live" ? "Join Now" : "Join Later"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
