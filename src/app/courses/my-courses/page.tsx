"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Course } from "@/lib/types";
import { toast } from "sonner";
import { BookOpen, Clock, CheckCircle } from "lucide-react";

interface EnrolledCourse extends Course {
  progress: number;
  lastAccessed: string;
  status: "in-progress" | "completed" | "not-started";
}

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // In a real app, you'd query user enrollments
        const q = query(collection(db, "user-courses"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const courseList: EnrolledCourse[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          courseList.push({
            id: data.courseId,
            title: data.courseTitle,
            description: data.courseDescription,
            source: data.source || "BIPOCA AI",
            contentType: data.contentType || "mixed",
            language: data.language || "English",
            isFeatured: data.isFeatured || false,
            progress: data.progress || 0,
            lastAccessed: data.lastAccessed || "Never",
            status: data.status || "not-started"
          });
        });

        // If no enrolled courses exist, add mock data
        if (courseList.length === 0) {
          const mockEnrolledCourses: EnrolledCourse[] = [
            { 
              id: "1", 
              title: "Black History 101", 
              description: "Comprehensive exploration of Black history and culture.", 
              source: "BlackFacts.com", 
              contentType: "video", 
              language: "English", 
              isFeatured: true,
              progress: 75,
              lastAccessed: "2 days ago",
              status: "in-progress"
            },
            { 
              id: "2", 
              title: "Indigenous Cultures", 
              description: "Deep dive into Indigenous peoples' traditions and history.", 
              source: "Legacy Education", 
              contentType: "interactive", 
              language: "English", 
              isFeatured: true,
              progress: 100,
              lastAccessed: "1 week ago",
              status: "completed"
            },
            { 
              id: "3", 
              title: "STEM Excellence", 
              description: "Advanced STEM concepts with culturally relevant examples.", 
              source: "BIPOCA AI", 
              contentType: "mixed", 
              language: "English", 
              isFeatured: false,
              progress: 25,
              lastAccessed: "3 days ago",
              status: "in-progress"
            },
          ];
          setCourses(mockEnrolledCourses);
        } else {
          setCourses(courseList);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error fetching your courses";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your courses</h1>
        <Link href="/auth/login">
          <Button>Log In</Button>
        </Link>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-[var(--color-pan-amber)]" />;
      default:
        return <BookOpen className="w-5 h-5 text-[var(--color-pan-green)]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500";
      case "in-progress":
        return "border-[var(--color-pan-amber)]";
      default:
        return "border-[var(--color-pan-green)]";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4">
          My Courses
        </h1>
        <p className="text-lg text-muted-foreground">
          Continue your learning journey with your enrolled courses.
        </p>
      </div>
      
      {courses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No courses enrolled yet</h2>
          <p className="text-muted-foreground mb-6">Start your learning journey by exploring our course catalog.</p>
          <Link href="/courses">
            <Button className="bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
              Browse Courses
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course) => (
            <Card
              key={course.id}
              className={`bg-card ${getStatusColor(course.status)} shadow-glow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl text-foreground flex-1">{course.title}</CardTitle>
                  {getStatusIcon(course.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Last accessed: {course.lastAccessed}</span>
                    <span className="capitalize">{course.status.replace("-", " ")}</span>
                  </div>
                </div>
                
                <Link href={`/classrooms/${course.id}`}>
                  <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white">
                    {course.status === "completed" ? "Review Course" : "Continue Learning"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
