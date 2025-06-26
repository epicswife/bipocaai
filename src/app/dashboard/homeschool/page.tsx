"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizCreator } from "@/components/tools/quiz-creator";
import { LessonPlanner } from "@/components/tools/lesson-planner";
import { LessonImporter } from "@/components/tools/lesson-importer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { BookOpen, GraduationCap, Star, Clock, ChevronRight } from "lucide-react";

// Mock data
const studentProgress = [
  { 
    name: "Emily Johnson",
    grade: "7th Grade",
    subjects: [
      { name: "History", progress: 85 },
      { name: "Science", progress: 78 },
      { name: "Math", progress: 92 },
    ]
  }
];

const upcomingLessons = [
  { id: 1, title: "Civil Rights Movement", subject: "History", date: "Today, 2:00 PM" },
  { id: 2, title: "Cell Biology", subject: "Science", date: "Tomorrow, 10:00 AM" },
  { id: 3, title: "Algebra Basics", subject: "Math", date: "Mar 6, 1:30 PM" },
];

export default function HomeschoolDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-4xl font-orbitron font-bold text-foreground mb-8">Homeschool Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Subjects", value: "6", icon: BookOpen, color: "text-amber-500" },
          { title: "Grade Level", value: "7th", icon: GraduationCap, color: "text-teal-500" },
          { title: "Avg. Score", value: "85%", icon: Star, color: "text-amber-500" },
          { title: "Study Hours", value: "24", icon: Clock, color: "text-teal-500" },
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
              <CardTitle>Student Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {studentProgress.map((student, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-foreground">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.grade}</p>
                    </div>
                    <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {student.subjects.map((subject, sIndex) => (
                      <div key={sIndex} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{subject.name}</span>
                          <span className="text-foreground font-medium">{subject.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-500"
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/20 mt-8">
            <CardHeader>
              <CardTitle>Upcoming Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                    <div>
                      <h3 className="font-medium text-foreground">{lesson.title}</h3>
                      <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{lesson.subject}</span>
                        <span>{lesson.date}</span>
                      </div>
                    </div>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                      Start Lesson
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
