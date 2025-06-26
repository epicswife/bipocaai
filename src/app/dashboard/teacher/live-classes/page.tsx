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
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Video, Calendar, Users, Plus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



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

interface NewClassForm {
  title: string;
  description: string;
  subject: string;
  startTime: string;
  duration: string;
  maxParticipants: string;
}

const initialFormState: NewClassForm = {
  title: "",
  description: "",
  subject: "",
  startTime: "",
  duration: "60",
  maxParticipants: "30"
};

export default function TeacherLiveClassesPage() {
  const { user } = useUser();
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<NewClassForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadClasses = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const classesRef = collection(db, "live-classes");
      const queryConstraints: QueryConstraint[] = [
        where("teacherId", "==", user.uid),
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

  const startClass = async (classId: string) => {
    if (!user) return;

    try {
      const classRef = doc(db, "live-classes", classId);
      await updateDoc(classRef, {
        status: "live",
        meetingUrl: `https://meet.bipoca.ai/${classId}` // Example URL
      });
      toast.success("Class started successfully!");
    } catch (error) {
      console.error("Error starting class:", error);
      toast.error("Failed to start class");
    }
  };

  const endClass = async (classId: string) => {
    if (!user) return;

    try {
      const classRef = doc(db, "live-classes", classId);
      await updateDoc(classRef, {
        status: "ended"
      });
      toast.success("Class ended successfully!");
    } catch (error) {
      console.error("Error ending class:", error);
      toast.error("Failed to end class");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const startTimeDate = new Date(formData.startTime);
      const newClass = {
        title: formData.title,
        description: formData.description,
        subject: formData.subject,
        startTime: Timestamp.fromDate(startTimeDate),
        duration: parseInt(formData.duration),
        maxParticipants: parseInt(formData.maxParticipants),
        currentParticipants: 0,
        teacherId: user.uid,
        teacherName: user.displayName || 'Teacher',
        status: "scheduled" as const
      };

      await addDoc(collection(db, "live-classes"), newClass);
      toast.success("New class scheduled successfully!");
      setFormData(initialFormState);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error scheduling class:", error);
      toast.error("Failed to schedule class");
    } finally {
      setIsSubmitting(false);
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
    return <div className="p-8 text-center">Please log in to manage live classes.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Live Classes</h1>
          <p className="text-muted-foreground">
            Schedule and manage your live classes.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Class</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  max="180"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="maxParticipants">Max Participants</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  "Schedule Class"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
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
                      <p className="text-sm font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">
                        {liveClass.description}
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
                      {liveClass.status === "live" ? (
                        <Button
                          variant="destructive"
                          onClick={() => endClass(liveClass.id)}
                        >
                          End Class
                        </Button>
                      ) : (
                        <Button
                          onClick={() => startClass(liveClass.id)}
                        >
                          Start Class
                        </Button>
                      )}
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
