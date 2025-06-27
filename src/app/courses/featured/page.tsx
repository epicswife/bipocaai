"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Course } from "@/lib/types";
import { toast } from "sonner";
import { Star } from "lucide-react";

export default function FeaturedCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const q = query(collection(db, "courses"), where("isFeatured", "==", true));
        const querySnapshot = await getDocs(q);
        const courseList: Course[] = [];
        querySnapshot.forEach((doc) => {
          courseList.push({ id: doc.id, ...doc.data() } as Course);
        });

        // If no featured courses exist, add mock data
        if (courseList.length === 0) {
          const mockFeaturedCourses: Course[] = [
            { 
              id: "1", 
              title: "Black History 101", 
              description: "Comprehensive exploration of Black history and culture from ancient civilizations to modern achievements.", 
              source: "BlackFacts.com", 
              contentType: "video", 
              language: "English", 
              isFeatured: true 
            },
            { 
              id: "2", 
              title: "Indigenous Cultures", 
              description: "Deep dive into the rich traditions, history, and contributions of Indigenous peoples worldwide.", 
              source: "Legacy Education", 
              contentType: "interactive", 
              language: "English", 
              isFeatured: true 
            },
            { 
              id: "3", 
              title: "STEM Excellence for BIPOC Students", 
              description: "Advanced STEM concepts with culturally relevant examples and BIPOC role models in science and technology.", 
              source: "BIPOCA AI", 
              contentType: "mixed", 
              language: "English", 
              isFeatured: true 
            },
            { 
              id: "4", 
              title: "Pan-African Literature", 
              description: "Explore the rich literary traditions across Africa and the African diaspora.", 
              source: "BIPOCA AI", 
              contentType: "text", 
              language: "English", 
              isFeatured: true 
            },
          ];
          setCourses(mockFeaturedCourses);
        } else {
          setCourses(courseList);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error fetching featured courses";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-4 flex items-center justify-center gap-2">
          <Star className="w-8 h-8 text-[var(--color-pan-amber)]" />
          Featured Courses
          <Star className="w-8 h-8 text-[var(--color-pan-amber)]" />
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our most popular and impactful courses, carefully curated to provide exceptional learning experiences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="bg-card border-[var(--color-pan-amber)] dark:border-[var(--color-pan-green)] shadow-glow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <CardHeader className="relative">
              <div className="absolute top-2 right-2">
                <Star className="w-5 h-5 text-[var(--color-pan-amber)] fill-current" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-foreground pr-8">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">{course.description}</p>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">Source: {course.source}</p>
                <span className="text-xs bg-[var(--color-pan-green)]/20 dark:bg-[var(--color-pan-amber)]/20 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] px-2 py-1 rounded-full">
                  {course.contentType}
                </span>
              </div>
              <Link href={`/classrooms/${course.id}`}>
                <Button className="w-full bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-glow">
                  Start Learning
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link href="/courses">
          <Button variant="outline" className="border-[var(--color-pan-green)] dark:border-[var(--color-pan-amber)] text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] hover:bg-[var(--color-pan-green)]/10 dark:hover:bg-[var(--color-pan-amber)]/10">
            View All Courses
          </Button>
        </Link>
      </div>
    </div>
  );
}
