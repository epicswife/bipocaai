"use client";

import { useAuth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function SubmitLegacyPage() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Please log in to submit a story.</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Submit Your Story</h1>
      <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-glow border-gold-300 dark:border-teal-700">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Title</label>
          <Input placeholder="Enter story title" className="mt-1 bg-gray-100 dark:bg-gray-600" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
          <Select>
            <SelectTrigger className="mt-1 bg-gray-100 dark:bg-gray-600">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="indigenous">Indigenous</SelectItem>
              <SelectItem value="poc">People of Color</SelectItem>
              <SelectItem value="ally">Ally</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Story Content</label>
          <Textarea placeholder="Share your story..." className="mt-1 bg-gray-100 dark:bg-gray-600" rows={5} />
        </div>
        <Button className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
          Submit Story (Placeholder)
        </Button>
      </div>
    </div>
  );
}