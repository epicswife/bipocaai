"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { BookOpen, GraduationCap, Star, Clock, ChevronRight, Plus } from "lucide-react";
import { LessonPlanner } from "@/components/tools/lesson-planner";
import { QuizCreator } from "@/components/tools/quiz-creator";
import { LessonImporter } from "@/components/tools/lesson-importer";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserCourses, fetchStudentProgress, fetchUserSchedule } from "@/lib/homeschool-queries";
import { Course, StudentProgress, ScheduleEvent } from "@/types/homeschool";
import { toast } from "sonner";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export default function HomeschoolDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
      } else {
        // Redirect to login if not authenticated
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch user data when authenticated
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch courses, progress, and schedule
        const [userCourses, userProgress, userEvents] = await Promise.all([
          fetchUserCourses(user.uid),
          fetchStudentProgress(user.uid),
          fetchUserSchedule(user.uid)
        ]);
        
        setCourses(userCourses);
        setProgress(userProgress);
        setEvents(userEvents);
      } catch (error) {
        console.error("Error fetching homeschool data:", error);
        toast.error("Failed to load homeschool data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  // Calculate stats
  const totalSubjects = [...new Set(courses.map(course => course.subject))].length;
  const averageScore = progress.length > 0 
    ? Math.round(progress.reduce((sum, p) => sum + (p.score || 0), 0) / progress.filter(p => p.score !== undefined).length) 
    : 0;
  const totalStudyHours = progress.reduce((sum, p) => sum + p.timeSpent, 0) / 60; // Convert minutes to hours
  
  // Get upcoming lessons from schedule
  const upcomingLessons = events
    .filter(event => new Date(event.startTime.toDate()) > new Date())
    .sort((a, b) => a.startTime.toDate().getTime() - b.startTime.toDate().getTime())
    .slice(0, 3)
    .map(event => ({
      id: event.id,
      title: event.title,
      subject: event.description || "",
      date: formatEventDate(event.startTime.toDate())
    }));

  // Format date for display
  function formatEventDate(date: Date): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  }

  // Mock data for student progress until we have real data
  const studentProgress = [
    { 
      name: user?.displayName || "Student",
      grade: "7th Grade",
      subjects: [
        { name: "History", progress: 85 },
        { name: "Science", progress: 78 },
        { name: "Math", progress: 92 },
      ]
    }
  ];

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your homeschool dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-orbitron font-bold text-foreground">Homeschool Dashboard</h1>
        <Button 
          onClick={() => router.push("/homeschool/courses")} 
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Subjects", value: totalSubjects.toString(), icon: BookOpen, color: "text-amber-500" },
          { title: "Grade Level", value: "7th", icon: GraduationCap, color: "text-teal-500" },
          { title: "Avg. Score", value: `${averageScore}%`, icon: Star, color: "text-amber-500" },
          { title: "Study Hours", value: Math.round(totalStudyHours).toString(), icon: Clock, color: "text-teal-500" },
        ].map((stat, index) => (
          <Card key={index} className="border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Student Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {studentProgress.map((student, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-foreground">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.grade}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-teal-500 text-teal-500 hover:bg-teal-50"
                      onClick={() => router.push("/homeschool/courses")}
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {student.subjects.map((subject, sIndex) => (
                      <div key={sIndex} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{subject.name}</span>
                          <span className="text-foreground font-medium">{subject.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-500"
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/20 mt-8">
            <CardHeader>
              <CardTitle>Upcoming Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingLessons.length > 0 ? (
                  upcomingLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                      <div>
                        <h3 className="font-medium text-foreground">{lesson.title}</h3>
                        <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{lesson.subject}</span>
                          <span>{lesson.date}</span>
                        </div>
                      </div>
                      <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                        Start Lesson
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No upcoming lessons scheduled</p>
                    <Button 
                      variant="link" 
                      className="mt-2 text-teal-500"
                      onClick={() => router.push("/homeschool/calendar")}
                    >
                      Schedule a lesson
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-primary/20"
            />
            <div className="mt-4">
              <Button 
                className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                onClick={() => router.push("/homeschool/calendar")}
              >
                View Full Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lessons" className="space-y-4">
        <TabsList className="bg-muted/20">
          <TabsTrigger value="lessons" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Lesson Planner
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Quiz Creator
          </TabsTrigger>
          <TabsTrigger value="import" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Import Lessons
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className="border-none p-0">
          <LessonPlanner />
        </TabsContent>
        <TabsContent value="quizzes" className="border-none p-0">
          <QuizCreator />
        </TabsContent>
        <TabsContent value="import" className="border-none p-0">
          <LessonImporter />
        </TabsContent>
      </Tabs>
    </div>
  );
}
