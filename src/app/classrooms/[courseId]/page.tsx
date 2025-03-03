"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const mockCourse = {
    id: courseId,
    title: `Course ${courseId}`,
    lessons: [
      { id: "1", title: "Lesson 1", description: "Introduction to the course." },
      { id: "2", title: "Lesson 2", description: "Key concepts and basics." },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">{mockCourse.title}</h1>
      <div className="space-y-6">
        {mockCourse.lessons.map((lesson) => (
          <Card key={lesson.id} className="bg-white dark:bg-gray-700 border-teal-300 dark:border-cyan-600">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{lesson.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}