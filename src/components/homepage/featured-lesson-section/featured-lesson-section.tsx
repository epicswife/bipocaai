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
        {mockLessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`border rounded-lg p-4 sm:p-6 shadow-glow bg-white dark:bg-gray-700 border-teal-300 dark:border-cyan-600 ${
              index === 0 ? "border-purple-400 dark:border-blue-400" :
              index === 1 ? "border-green-300 dark:border-yellow-300" :
              "border-red-400 dark:border-red-400"
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-2">
              {lesson.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">Source: {lesson.source}</p>
            <Link href={`/classrooms/${lesson.id}`}>
              <Button
                className={`w-full ${
                  index === 0 ? "bg-purple-400 hover:bg-blue-400 dark:bg-purple-400 dark:hover:bg-blue-400" :
                  index === 1 ? "bg-green-300 hover:bg-yellow-300 dark:bg-green-300 dark:hover:bg-yellow-300" :
                  "bg-red-400 hover:bg-orange-400 dark:bg-red-400 dark:hover:bg-orange-400"
                } text-black`}
              >
                Explore
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}