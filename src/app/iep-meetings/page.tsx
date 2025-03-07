"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { CalendarPlus, ClipboardList, Users, BookOpen, FileText, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

const demoIEPMeetings = [
  {
    id: "iep-1",
    studentName: "Marcus Johnson",
    date: "2025-03-15T15:00:00.000Z",
    status: "upcoming",
    participants: ["Dr. Smith (Teacher)", "Ms. Davis (Counselor)", "Mr. Johnson (Parent)"],
  },
  {
    id: "iep-2",
    studentName: "Alicia Washington",
    date: "2025-03-20T14:30:00.000Z",
    status: "upcoming",
    participants: ["Ms. Chen (Teacher)", "Dr. Martinez (Psychologist)", "Mrs. Washington (Parent)"],
  },
  {
    id: "iep-3",
    studentName: "Jamal Brown",
    date: "2025-02-28T13:00:00.000Z",
    status: "completed",
    participants: ["Mr. Wilson (Teacher)", "Ms. Lee (Special Education Coordinator)", "Mrs. Brown (Parent)"],
  },
];

export default function IEPMeetingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Use useEffect for navigation to avoid direct renders
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/iep-meetings");
    }
  }, [user, loading, router]);

  // Show loading state
  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  
  // If not logged in, show minimal content while redirecting
  if (!user) return <div className="flex justify-center items-center min-h-screen">Please log in to access IEP meetings.</div>;

  const filteredMeetings = demoIEPMeetings.filter((meeting) =>
    meeting.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingMeetings = filteredMeetings.filter((meeting) => meeting.status === "upcoming");
  const pastMeetings = filteredMeetings.filter((meeting) => meeting.status === "completed");

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            IEP Meetings
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Collaborative planning for educational success
          </p>
        </motion.div>
        <svg
          className="absolute bottom-0 left-0 w-full h-24 text-background dark:text-background visionease:text-background high-contrast:text-background"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C360 50 1080 50 1440 100 L1440 100 L0 100 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Search & Schedule Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="max-w-md w-full">
              <Label htmlFor="searchMeetings" className="mb-2 block text-foreground">Search Meetings</Label>
              <Input
                id="searchMeetings"
                placeholder="Search by student name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary"
              />
            </div>
            <div>
              <Link href="/iep-meetings/schedule">
                <Button className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
                  <CalendarPlus className="mr-2 h-5 w-5" />
                  Schedule New Meeting
                </Button>
              </Link>
            </div>
          </div>

          {/* Process Steps */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-foreground mb-6 text-center">
              IEP Meeting Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <ClipboardList className="h-10 w-10 text-amber-500" />,
                  title: "1. Preparation",
                  description: "Gather assessments, progress reports, and set goals for the meeting.",
                },
                {
                  icon: <Users className="h-10 w-10 text-blue-500" />,
                  title: "2. Collaboration",
                  description: "Meet with all stakeholders to discuss needs and develop personalized plans.",
                },
                {
                  icon: <BookOpen className="h-10 w-10 text-green-500" />,
                  title: "3. Implementation",
                  description: "Execute the plan with regular monitoring and adjustments as needed.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Meetings */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gray-dark dark:bg-gradient-gray-dark visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-foreground mb-6">
            Upcoming Meetings
          </h2>
          {upcomingMeetings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingMeetings.map((meeting) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-card border-green-400 shadow-glow glassmorphism h-full">
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{meeting.studentName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-muted-foreground">
                            {new Date(meeting.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Participants:</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {meeting.participants.map((participant, idx) => (
                              <li key={idx}>{participant}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Link href={`/iep-meetings/${meeting.id}`}>
                            <Button className="w-full bg-green-400 hover:bg-green-500 text-white">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No upcoming meetings found.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Past Meetings */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-foreground mb-6">
            Past Meetings
          </h2>
          {pastMeetings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastMeetings.map((meeting) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-card border-blue-400 shadow-glow glassmorphism h-full">
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{meeting.studentName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                          <span className="text-muted-foreground">
                            {new Date(meeting.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Participants:</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {meeting.participants.map((participant, idx) => (
                              <li key={idx}>{participant}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Link href={`/iep-meetings/${meeting.id}`}>
                            <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white">
                              View Summary
                            </Button>
                          </Link>
                          <Link href={`/iep-meetings/${meeting.id}/documents`}>
                            <Button variant="outline" className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                              <FileText className="h-4 w-4 mr-1" /> Documents
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No past meetings found.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-foreground dark:text-gray-800 mb-6 text-center">
            IEP Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-primary dark:border-secondary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
              <CardHeader>
                <CardTitle className="text-xl text-foreground dark:text-gray-800">For Parents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-gray-700">
                  <li>Understanding Your Rights in the IEP Process</li>
                  <li>Questions to Ask During an IEP Meeting</li>
                  <li>How to Advocate for Your Child&apos;s Needs</li>
                  <li>Preparing Documentation for IEP Meetings</li>
                </ul>
                <Link href="/resources/iep-parents">
                  <Button className="mt-4 w-full bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
                    Access Resources
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card border-secondary dark:border-primary visionease:border-primary high-contrast:border-primary shadow-glow glassmorphism h-full">
              <CardHeader>
                <CardTitle className="text-xl text-foreground dark:text-gray-800">For Educators</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-gray-700">
                  <li>Effective IEP Goal Writing</li>
                  <li>Documenting Student Progress</li>
                  <li>Inclusive Teaching Strategies</li>
                  <li>Collaborating with Support Services</li>
                </ul>
                <Link href="/resources/iep-educators">
                  <Button className="mt-4 w-full bg-secondary hover:bg-primary dark:bg-primary dark:hover:bg-secondary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground shadow-glow">
                    Access Resources
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}