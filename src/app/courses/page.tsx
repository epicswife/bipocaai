"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Course } from "@/lib/types";
import { toast } from "sonner";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courseList: Course[] = [];
        querySnapshot.forEach((doc) => {
          courseList.push({ id: doc.id, ...doc.data() } as Course);
        });

        // If no courses exist, add mock data
        if (courseList.length === 0) {
          const mockCourses: Course[] = [
            { id: "1", title: "Black History 101", description: "Learn about Black history and culture.", source: "BlackFacts.com", contentType: "video", language: "English", isFeatured: true },
            { id: "2", title: "Indigenous Cultures", description: "Explore the history of Indigenous peoples.", source: "Legacy", contentType: "text", language: "English", isFeatured: true },
            { id: "3", title: "Math Basics", description: "Foundational math concepts for beginners.", source: "BIPOCA AI", contentType: "pdf", language: "English", isFeatured: true },
            { id: "4", title: "Science for Kids", description: "Fun science experiments for children.", source: "BIPOCA AI", contentType: "video", language: "English", isFeatured: false },
          ];
          setCourses(mockCourses);
        } else {
          setCourses(courseList);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error fetching courses";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-8 text-center">
        All Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {courses.map((course) => (
          <Card
            key={course.id}
            className={`bg-card border-teal-300 dark:border-cyan-600 shadow-glow visionease:border-blue-400 ${course.isFeatured ? "border-purple-400 dark:border-blue-400 visionease:border-blue-400" : "border-green-300 dark:border-yellow-300 visionease:border-yellow-300"}`}
          >
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-foreground">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">{course.description}</p>
              <p className="text-sm text-muted-foreground">Source: {course.source}</p>
              <Link href={`/classrooms/${course.id}`}>
                <Button
                  className={`mt-4 w-full ${course.isFeatured ? "bg-purple-400 hover:bg-blue-400 dark:bg-purple-400 dark:hover:bg-blue-400 visionease:bg-blue-400 visionease:hover:bg-yellow-300" : "bg-green-300 hover:bg-yellow-300 dark:bg-green-300 dark:hover:bg-yellow-300 visionease:bg-yellow-300 visionease:hover:bg-blue-400"} text-foreground`}
                >
                  Explore
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}