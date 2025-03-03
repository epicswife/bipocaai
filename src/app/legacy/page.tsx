"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LegacyPage() {
  const mockSubmissions = [
    { id: "1", category: "black", title: "Black History Story", content: "A story about Black heritage." },
    { id: "2", category: "indigenous", title: "Indigenous Tradition", content: "A traditional Indigenous practice." },
    { id: "3", category: "poc", title: "Cultural Festival", content: "A festival celebrated by people of color." },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Legacy Section</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {mockSubmissions.map((submission) => (
          <Card key={submission.id} className="bg-white dark:bg-gray-700 border-amber-400 dark:border-gold-500">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">{submission.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{submission.content}</p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-2">Category: {submission.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/legacy/submit">
          <Button className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
            Submit Your Story
          </Button>
        </Link>
      </div>
    </div>
  );
}