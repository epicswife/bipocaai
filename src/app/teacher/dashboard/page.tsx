"use client";

import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TeacherDashboard() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Please log in to view your dashboard.</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-glow border-gold-300 dark:border-teal-700">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Upload Lesson</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Add a new lesson to your course.</p>
          <Button className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
            Upload
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-glow border-gold-300 dark:border-teal-700">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Create Quiz</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Design a new quiz for your students.</p>
          <Link href="/teacher/quizzes/new">
            <Button className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
              Create
            </Button>
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-glow border-gold-300 dark:border-teal-700">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">AI Lesson Planning</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Use AI to generate lesson plans.</p>
          <Button className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
            Generate (Placeholder)
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-glow border-gold-300 dark:border-teal-700">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Import Lessons</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Import lessons from an online source.</p>
          <Link href="/teacher/import">
            <Button className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
              Import
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}