"use client";

import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TeacherCoursesPage() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Please log in to manage your courses.</div>;

  const mockCourses = [
    { id: "1", title: "Black History 101", description: "Learn about Black history and culture." },
    { id: "2", title: "Indigenous Cultures", description: "Explore the rich history of Indigenous peoples." },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Your Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {mockCourses.map((course) => (
          <Link href={`/classrooms/${course.id}`} key={course.id}>
            <Card className="bg-white dark:bg-gray-700 border-teal-300 dark:border-cyan-600 hover:shadow-glow transition">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{course.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}