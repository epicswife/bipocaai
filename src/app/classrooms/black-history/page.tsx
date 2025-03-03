"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlackHistoryClassroom() {
  const mockLessons = [
    { id: "1", title: "Black History 101", source: "BlackFacts.com", description: "Learn the basics of Black history." },
    { id: "2", title: "Civil Rights Movement", source: "BlackFacts.com", description: "Explore key events in the Civil Rights Movement." },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Black History Classroom</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {mockLessons.map((lesson) => (
          <Card key={lesson.id} className="bg-white dark:bg-gray-700 border-teal-300 dark:border-cyan-600">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{lesson.description}</p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-2">Source: {lesson.source}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}