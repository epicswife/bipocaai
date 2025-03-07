"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizCreator } from "@/components/tools/quiz-creator";
import { LessonPlanner } from "@/components/tools/lesson-planner";
import { LessonImporter } from "@/components/tools/lesson-importer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { BookOpen, Users, Star, Clock } from "lucide-react";

// Mock data
const recentLessons = [
  { id: 1, title: "Civil Rights Movement", students: 25, rating: 4.8, duration: "45 min" },
  { id: 2, title: "African American Scientists", students: 18, rating: 4.5, duration: "60 min" },
  { id: 3, title: "Indigenous Peoples' History", students: 22, rating: 4.7, duration: "50 min" },
];

export default function TeacherDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-4xl font-orbitron font-bold text-foreground mb-8">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Students", value: "65", icon: Users, color: "text-amber-500" },
          { title: "Active Lessons", value: "8", icon: BookOpen, color: "text-teal-500" },
          { title: "Avg. Rating", value: "4.7", icon: Star, color: "text-amber-500" },
          { title: "Teaching Hours", value: "128", icon: Clock, color: "text-teal-500" },
        ].map((stat, index) => (
          <Card key={index} className="border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Recent Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                    <div>
                      <h3 className="font-medium text-foreground">{lesson.title}</h3>
                      <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {lesson.students}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {lesson.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-primary/20"
            />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lessons" className="space-y-4">
        <TabsList className="bg-muted/20">
          <TabsTrigger value="lessons" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Lesson Planner
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Quiz Creator
          </TabsTrigger>
          <TabsTrigger value="import" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Import Lessons
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className="border-none p-0">
          <LessonPlanner />
        </TabsContent>
        <TabsContent value="quizzes" className="border-none p-0">
          <QuizCreator />
        </TabsContent>
        <TabsContent value="import" className="border-none p-0">
          <LessonImporter />
        </TabsContent>
      </Tabs>
    </div>
  );
}
