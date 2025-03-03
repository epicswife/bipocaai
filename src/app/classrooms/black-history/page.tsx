"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlackHistoryPage() {
  const mockLessons = [
    { id: "1", title: "Civil Rights Movement", description: "Explore the key events of the Civil Rights Movement.", source: "BlackFacts.com" },
    { id: "2", title: "Harlem Renaissance", description: "Learn about the cultural explosion in Harlem.", source: "BlackFacts.com" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-8 text-center">
        Black History Classroom
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {mockLessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="bg-card border-teal-300 dark:border-cyan-600 shadow-glow visionease:border-blue-400"
          >
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-foreground">{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">{lesson.description}</p>
              <p className="text-sm text-muted-foreground">Source: {lesson.source}</p>
              <Link href={`/classrooms/${lesson.id}`}>
                <Button className="mt-4 w-full bg-teal-300 hover:bg-cyan-400 dark:bg-teal-300 dark:hover:bg-cyan-400 visionease:bg-blue-400 visionease:hover:bg-yellow-300 text-foreground">
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