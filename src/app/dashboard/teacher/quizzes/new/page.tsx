"use client";

import { useAuth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateQuizPage() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Please log in to create a quiz.</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Create a New Quiz</h1>
      <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-glow border-gold-300 dark:border-teal-700">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Quiz Title</label>
          <Input placeholder="Enter quiz title" className="mt-1 bg-gray-100 dark:bg-gray-600" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Question 1</label>
          <Input placeholder="Enter question" className="mt-1 bg-gray-100 dark:bg-gray-600" />
          <Input placeholder="Option A" className="mt-2 bg-gray-100 dark:bg-gray-600" />
          <Input placeholder="Option B" className="mt-2 bg-gray-100 dark:bg-gray-600" />
          <Input placeholder="Option C" className="mt-2 bg-gray-100 dark:bg-gray-600" />
        </div>
        <Button className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
          Save Quiz (Placeholder)
        </Button>
      </div>
    </div>
  );
}