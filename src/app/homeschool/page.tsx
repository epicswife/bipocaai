"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Calendar, Brain, FileQuestion, Download } from "lucide-react";

export default function HomeschoolIndex() {
  const router = useRouter();

  // Redirect to dashboard by default
  useEffect(() => {
    router.push("/homeschool/dashboard");
  }, [router]);

  // This page will only be visible briefly before redirect
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-orbitron font-bold text-center mb-8">Homeschool Hub</h1>
      
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-lg text-muted-foreground">
          Welcome to your comprehensive homeschool management platform. Plan lessons, create quizzes, 
          track progress, and organize your homeschool journey all in one place.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { 
            title: "Dashboard", 
            description: "View student progress and upcoming lessons", 
            icon: BookOpen, 
            href: "/homeschool/dashboard",
            color: "bg-teal-500" 
          },
          { 
            title: "Courses", 
            description: "Manage your courses and lessons", 
            icon: GraduationCap, 
            href: "/homeschool/courses",
            color: "bg-amber-500" 
          },
          { 
            title: "Calendar", 
            description: "Schedule and organize your homeschool activities", 
            icon: Calendar, 
            href: "/homeschool/calendar",
            color: "bg-indigo-500" 
          },
          { 
            title: "AI Planning", 
            description: "Get AI assistance for lesson planning", 
            icon: Brain, 
            href: "/homeschool/ai-planning",
            color: "bg-purple-500" 
          },
          { 
            title: "Quiz Creation", 
            description: "Create and manage quizzes for your students", 
            icon: FileQuestion, 
            href: "/homeschool/quiz-creation",
            color: "bg-rose-500" 
          },
          { 
            title: "Lesson Import", 
            description: "Import lessons from external sources", 
            icon: Download, 
            href: "/homeschool/lesson-import",
            color: "bg-blue-500" 
          },
        ].map((item, index) => (
          <Card key={index} className="border-primary/20 overflow-hidden">
            <div className={`h-2 ${item.color}`} />
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full ${item.color} bg-opacity-10 mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <Button 
                  onClick={() => router.push(item.href)}
                  className={`${item.color} hover:${item.color.replace('bg-', 'bg-')}-600 text-white`}
                >
                  Go to {item.title}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
