"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Calendar, Clock, Users, FileText, ArrowLeft, Check, Pencil } from "lucide-react";

// Define types for IEP Meeting data
type Document = {
  id: string;
  name: string;
  type: string;
};

// Define user role type
type UserWithRole = {
  email?: string | null;
  uid: string;
  role?: 'student' | 'teacher' | 'parent' | 'admin';
};

type IEPMeeting = {
  id: string;
  studentName: string;
  date: string;
  status: "upcoming" | "completed";
  participants: string[];
  location: string;
  duration: string;
  agenda: string[];
  notes: string;
  documents: Document[];
};

// Demo IEP Meeting data
const demoIEPMeetings: IEPMeeting[] = [
  {
    id: "iep-1",
    studentName: "Marcus Johnson",
    date: "2025-03-15T15:00:00.000Z",
    status: "upcoming",
    participants: ["Dr. Smith (Teacher)", "Ms. Davis (Counselor)", "Mr. Johnson (Parent)"],
    location: "Virtual Meeting (Zoom)",
    duration: "60 minutes",
    agenda: [
      "Review of current academic progress",
      "Discussion of behavioral support needs",
      "Goal setting for next quarter",
      "Resource allocation and planning",
    ],
    notes: "",
    documents: [
      { id: "doc-1", name: "Previous IEP Summary", type: "pdf" },
      { id: "doc-2", name: "Academic Progress Report", type: "docx" },
      { id: "doc-3", name: "Behavioral Assessment", type: "pdf" },
    ],
  },
  {
    id: "iep-2",
    studentName: "Alicia Washington",
    date: "2025-03-20T14:30:00.000Z",
    status: "upcoming",
    participants: ["Ms. Chen (Teacher)", "Dr. Martinez (Psychologist)", "Mrs. Washington (Parent)"],
    location: "Room 203, Main Building",
    duration: "45 minutes",
    agenda: [
      "Review of reading intervention progress",
      "Math support strategies",
      "Summer learning plan discussion",
    ],
    notes: "",
    documents: [
      { id: "doc-4", name: "Reading Assessment", type: "pdf" },
      { id: "doc-5", name: "Math Skills Evaluation", type: "pdf" },
    ],
  },
  {
    id: "iep-3",
    studentName: "Jamal Brown",
    date: "2025-02-28T13:00:00.000Z",
    status: "completed",
    participants: ["Mr. Wilson (Teacher)", "Ms. Lee (Special Education Coordinator)", "Mrs. Brown (Parent)"],
    location: "Conference Room A",
    duration: "90 minutes",
    agenda: [
      "Transition planning for high school",
      "Review of accommodations effectiveness",
      "Social skills development plan",
      "Discussion of extracurricular opportunities",
    ],
    notes: "Jamal has shown significant improvement in reading comprehension. The team agreed to reduce reading support but maintain math interventions. Mrs. Brown expressed interest in social skills support groups. Next steps include creating a transition plan for high school and exploring summer enrichment programs.",
    documents: [
      { id: "doc-6", name: "Transition Planning Guide", type: "pdf" },
      { id: "doc-7", name: "Accommodations Review", type: "docx" },
      { id: "doc-8", name: "Meeting Minutes", type: "pdf" },
    ],
  },
];

export default function IEPMeetingDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [meeting, setMeeting] = useState<IEPMeeting | null>(null);
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Use useEffect for navigation to avoid direct renders
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/iep-meetings");
    }
  }, [user, loading, router]);

  // Fetch meeting data
  useEffect(() => {
    if (params?.iepId) {
      const foundMeeting = demoIEPMeetings.find(meeting => meeting.id === params.iepId);
      if (foundMeeting) {
        setMeeting(foundMeeting);
        setNotes(foundMeeting.notes);
      } else {
        // Handle not found
        router.push("/iep-meetings");
      }
    }
  }, [params, router]);

  // Show loading state
  if (loading || !meeting) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  
  // If not logged in, show minimal content while redirecting
  if (!user) return <div className="flex justify-center items-center min-h-screen">Please log in to access IEP meetings.</div>;

  const handleSaveNotes = () => {
    // In a real app, this would update the database
    setIsEditing(false);
    // Show success message
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col">
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link href="/iep-meetings" className="inline-flex items-center text-primary hover:text-secondary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Meetings
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground">
                {meeting.studentName}&apos;s IEP Meeting
              </h1>
              <p className="text-muted-foreground mt-2">
                {meeting.status === "upcoming" ? "Upcoming" : "Completed"} meeting on {formatDate(meeting.date)}
              </p>
            </div>
            
            {meeting.status === "upcoming" && (
              <Button className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
                Join Meeting
              </Button>
            )}
          </div>

          <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism mb-8">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">Date</span>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary mr-2" />
                    <span className="text-foreground font-medium">{formatDate(meeting.date)}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">Time</span>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary mr-2" />
                    <span className="text-foreground font-medium">{formatTime(meeting.date)} ({meeting.duration})</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">Location</span>
                  <span className="text-foreground font-medium">{meeting.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${meeting.status === "upcoming" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                    {meeting.status === "upcoming" ? "Upcoming" : "Completed"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-8">
            <div>
              <div className="flex border-b border-muted mb-6">
                <button
                  onClick={() => setActiveTab(0)}
                  className={`px-4 py-2 -mb-px ${activeTab === 0 ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  className={`px-4 py-2 -mb-px ${activeTab === 1 ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
                >
                  Documents
                </button>
                {meeting.status === "completed" && (
                  <button
                    onClick={() => setActiveTab(2)}
                    className={`px-4 py-2 -mb-px ${activeTab === 2 ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
                  >
                    Meeting Notes
                  </button>
                )}
              </div>

              {activeTab === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-card border-secondary dark:border-primary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-foreground">Meeting Agenda</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {meeting.agenda.map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary mr-2 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-foreground">Participants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-4">
                        <Users className="h-5 w-5 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary mr-2" />
                        <span className="text-foreground font-medium">{meeting.participants.length} Attendees</span>
                      </div>
                      <ul className="space-y-2">
                        {meeting.participants.map((participant: string, index: number) => (
                          <li key={index} className="text-muted-foreground">{participant}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {activeTab === 1 && (
                <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">Meeting Documents</CardTitle>
                    <CardDescription>Access and download documents related to this IEP meeting</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {meeting.documents.map((doc: Document) => (
                        <div key={doc.id} className="flex justify-between items-center p-3 border border-muted rounded-md hover:bg-accent/50 transition-colors">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-primary dark:text-secondary visionease:text-primary high-contrast:text-primary mr-3" />
                            <div>
                              <p className="text-foreground font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground uppercase">{doc.type}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {meeting.status === "completed" && activeTab === 2 && (
                <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-foreground">Meeting Notes</CardTitle>
                      <CardDescription>Summary and key takeaways from the meeting</CardDescription>
                    </div>
                    {/* Check if user has appropriate role to edit notes */}
                    {((user as UserWithRole)?.role === "teacher" || (user as UserWithRole)?.role === "admin") ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary"
                        onClick={() => isEditing ? handleSaveNotes() : setIsEditing(true)}
                      >
                        {isEditing ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Save Notes
                          </>
                        ) : (
                          <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Notes
                          </>
                        )}
                      </Button>
                    ) : null}
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <textarea
                        className="w-full min-h-48 p-3 rounded-md bg-background border border-muted text-foreground"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-background/50 rounded-md min-h-24">
                        {notes ? (
                          <p className="text-muted-foreground whitespace-pre-wrap">{notes}</p>
                        ) : (
                          <p className="text-muted-foreground italic">No notes have been added for this meeting yet.</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}