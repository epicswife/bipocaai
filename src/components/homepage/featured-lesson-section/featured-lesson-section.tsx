"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeaturedLessonSection() {
  const mockLessons = [
    { id: "1", title: "Black History 101", source: "BlackFacts.com" },
    { id: "2", title: "Indigenous Cultures", source: "Legacy" },
    { id: "3", title: "Math Basics", source: "BIPOCA AI" },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-center text-black dark:text-white mb-8">
        Featured Lessons
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {mockLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="border border-teal-300 dark:border-cyan-600 rounded-lg p-4 sm:p-6 shadow-glow bg-white dark:bg-gray-700"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-2">
              {lesson.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">Source: {lesson.source}</p>
            <Link href={`/classrooms/${lesson.id}`}>
              <Button className="w-full bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
                Explore
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}