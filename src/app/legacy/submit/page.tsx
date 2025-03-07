"use client";

import { useUser } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [formState, setFormState] = useState({
    title: "",
    category: "",
    content: "",
    submitting: false
  });

  const handleChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setFormState(prev => ({ ...prev, submitting: true }));
    
    try {
      // Here you would actually submit the data to your backend
      console.log("Submitting form data:", formState);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to memories page after successful submission
      router.push("/legacy");
    } catch (error) {
      console.error("Error submitting memory:", error);
    } finally {
      setFormState(prev => ({ ...prev, submitting: false }));
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Please log in to submit a story.</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={() => router.push("/legacy")}
          className="mr-4"
        >
          &larr; Back to Memories
        </Button>
        <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white">Submit Your Story</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-glow border-gold-300 dark:border-teal-700">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Title</label>
          <Input 
            placeholder="Enter story title" 
            className="mt-1 bg-gray-100 dark:bg-gray-600" 
            value={formState.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
          <Select 
            value={formState.category} 
            onValueChange={(value) => handleChange("category", value)}
          >
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
          <Textarea 
            placeholder="Share your story..." 
            className="mt-1 bg-gray-100 dark:bg-gray-600" 
            rows={5}
            value={formState.content}
            onChange={(e) => handleChange("content", e.target.value)}
            required
          />
        </div>
        <Button 
          type="submit"
          className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500"
          disabled={formState.submitting || !formState.title || !formState.category || !formState.content}
        >
          {formState.submitting ? "Submitting..." : "Submit Story"}
        </Button>
      </form>
    </div>
  );
}