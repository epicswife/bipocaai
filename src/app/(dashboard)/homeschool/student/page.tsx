"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  GraduationCap, 
  Star, 
  Calendar as CalendarIcon,
  PlayCircle,
  FileText,
  BookMarked,
  Trophy,
  Users,
  Brain,
  Sparkles,
  PlusCircle
} from "lucide-react";

// Mock data for student dashboard
const studentData = {
  name: "Emily Johnson",
  grade: "7th Grade",
  age: 12,
  subjects: [
    { id: 1, name: "Math", progress: 85, currentTopic: "Algebra: Equations and Inequalities" },
    { id: 2, name: "Science", progress: 72, currentTopic: "Biology: Cell Structure and Function" },
    { id: 3, name: "History", progress: 90, currentTopic: "American History: Civil War" },
    { id: 4, name: "English", progress: 78, currentTopic: "Literature: To Kill a Mockingbird" }
  ],
  todaySchedule: [
    { id: 1, time: "9:00 AM - 10:30 AM", subject: "Math", activity: "Algebra Lesson & Practice" },
    { id: 2, time: "10:45 AM - 12:00 PM", subject: "Science", activity: "Biology Lab: Cell Observation" },
    { id: 3, time: "1:00 PM - 2:30 PM", subject: "History", activity: "Civil War Documentary & Notes" },
    { id: 4, time: "2:45 PM - 3:30 PM", subject: "English", activity: "Reading & Comprehension" }
  ],
  assignments: [
    { 
      id: 1, 
      title: "Algebra Quiz", 
      subject: "Math", 
      dueDate: "Tomorrow", 
      status: "Not Started", 
      priority: "High",
      description: "Complete the quiz on solving equations and inequalities."
    },
    { 
      id: 2, 
      title: "Cell Diagram", 
      subject: "Science", 
      dueDate: "Mar 10", 
      status: "In Progress", 
      priority: "Medium",
      description: "Create a detailed diagram of a plant cell and label all parts."
    },
    { 
      id: 3, 
      title: "Civil War Essay", 
      subject: "History", 
      dueDate: "Mar 15", 
      status: "Not Started", 
      priority: "Medium",
      description: "Write a 500-word essay on the causes of the Civil War."
    },
    { 
      id: 4, 
      title: "Book Report", 
      subject: "English", 
      dueDate: "Mar 20", 
      status: "Not Started", 
      priority: "Low",
      description: "Write a report on To Kill a Mockingbird, focusing on character development."
    }
  ],
  achievements: [
    { 
      id: 1, 
      title: "Math Whiz", 
      description: "Completed Algebra module with 95% accuracy", 
      date: "Mar 3",
      icon: "Brain"
    },
    { 
      id: 2, 
      title: "Science Explorer", 
      description: "Completed 10 science experiments", 
      date: "Feb 28",
      icon: "Sparkles"
    },
    { 
      id: 3, 
      title: "History Buff", 
      description: "Aced the American Revolution quiz", 
      date: "Feb 20",
      icon: "BookMarked"
    }
  ],
  learningResources: [
    { 
      id: 1, 
      title: "Algebra Interactive Lessons", 
      subject: "Math", 
      type: "Interactive", 
      format: "Video & Practice",
      description: "Step-by-step video lessons with practice problems"
    },
    { 
      id: 2, 
      title: "Biology Virtual Lab", 
      subject: "Science", 
      type: "Simulation", 
      format: "Interactive Lab",
      description: "Virtual lab experiments for cell biology"
    },
    { 
      id: 3, 
      title: "Civil War Documentary Series", 
      subject: "History", 
      type: "Video", 
      format: "Documentary",
      description: "Comprehensive documentary series on the American Civil War"
    },
    { 
      id: 4, 
      title: "Literature Analysis Guide", 
      subject: "English", 
      type: "Guide", 
      format: "PDF & Worksheets",
      description: "Analysis guide and worksheets for classic literature"
    }
  ],
  studyGroups: [
    { 
      id: 1, 
      name: "Math Study Circle", 
      members: 5, 
      nextMeeting: "Mar 8, 4:00 PM",
      topic: "Algebra Problem Solving"
    },
    { 
      id: 2, 
      name: "Science Club", 
      members: 7, 
      nextMeeting: "Mar 12, 3:30 PM",
      topic: "Biology Lab Preparation"
    }
  ]
};

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  switch(iconName) {
    case "Brain": return Brain;
    case "Sparkles": return Sparkles;
    case "BookMarked": return BookMarked;
    default: return Star;
  }
};

export default function HomeschoolStudentDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-orbitron font-bold text-foreground">Student Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Welcome, {studentData.name}</span>
          <Badge className="bg-teal-500">{studentData.grade}</Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Subjects", value: studentData.subjects.length.toString(), icon: BookOpen, color: "text-amber-500" },
          { title: "Grade Level", value: studentData.grade.split(" ")[0], icon: GraduationCap, color: "text-teal-500" },
          { title: "Achievements", value: studentData.achievements.length.toString(), icon: Trophy, color: "text-violet-500" },
          { title: "Assignments", value: studentData.assignments.length.toString(), icon: FileText, color: "text-rose-500" },
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
        {/* Subject Progress */}
        <Card className="border-primary/20 lg:col-span-2">
          <CardHeader>
            <CardTitle>My Learning Progress</CardTitle>
            <CardDescription>Track your progress across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {studentData.subjects.map((subject) => (
                <div key={subject.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-foreground">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">Current: {subject.currentTopic}</p>
                    </div>
                    <span className="text-foreground font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2 [&>div]:bg-teal-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-teal-500" />
              Today&apos;s Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentData.todaySchedule.map((item) => (
                <div key={item.id} className="p-3 rounded-md bg-muted/20 border-l-4 border-teal-500">
                  <p className="text-sm font-medium text-muted-foreground">{item.time}</p>
                  <h3 className="font-medium text-foreground">{item.subject}</h3>
                  <p className="text-sm text-muted-foreground">{item.activity}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-primary/20"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assignments" className="space-y-4">
        <TabsList className="bg-muted/20">
          <TabsTrigger value="assignments" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Assignments
          </TabsTrigger>
          <TabsTrigger value="lessons" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Learning Resources
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Achievements
          </TabsTrigger>
          <TabsTrigger value="study-groups" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Study Groups
          </TabsTrigger>
        </TabsList>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="border-none p-0">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>My Assignments</CardTitle>
              <CardDescription>Track your upcoming assignments and their due dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentData.assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{assignment.title}</h3>
                        <Badge className={
                          assignment.priority === "High" ? "bg-rose-500" : 
                          assignment.priority === "Medium" ? "bg-amber-500" : 
                          "bg-blue-500"
                        }>
                          {assignment.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{assignment.description}</p>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{assignment.subject}</span>
                        <span>Due: {assignment.dueDate}</span>
                        <span className={
                          assignment.status === "Not Started" ? "text-amber-500" : 
                          assignment.status === "In Progress" ? "text-blue-500" : 
                          "text-green-500"
                        }>
                          {assignment.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                        Start Work
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Resources Tab */}
        <TabsContent value="lessons" className="border-none p-0">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Access your learning materials and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentData.learningResources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                    <div>
                      <h3 className="font-medium text-foreground">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{resource.subject}</span>
                        <span>{resource.type}</span>
                        <span>{resource.format}</span>
                      </div>
                    </div>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="border-none p-0">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>My Achievements</CardTitle>
              <CardDescription>Celebrate your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studentData.achievements.map((achievement) => {
                  const IconComponent = getIconComponent(achievement.icon);
                  return (
                    <Card key={achievement.id} className="border-primary/20 overflow-hidden">
                      <div className="h-2 bg-teal-500 w-full"></div>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                            <IconComponent className="w-6 h-6 text-teal-500" />
                          </div>
                          <h3 className="font-bold text-foreground">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground mt-2">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground mt-4">Achieved on {achievement.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Groups Tab */}
        <TabsContent value="study-groups" className="border-none p-0">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Study Groups</CardTitle>
                  <CardDescription>Connect with other homeschool students</CardDescription>
                </div>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Find Groups
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentData.studyGroups.map((group) => (
                  <Card key={group.id} className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription>{group.members} members</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Next Meeting:</span>
                          <span className="text-foreground">{group.nextMeeting}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Topic:</span>
                          <span className="text-foreground">{group.topic}</span>
                        </div>
                        <Button className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white">
                          Join Meeting
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="border-dashed border-2 border-muted-foreground/20 flex flex-col items-center justify-center p-6">
                  <PlusCircle className="w-8 h-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium text-foreground">Create New Study Group</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">Start your own study group with other homeschool students</p>
                  <Button variant="outline" className="mt-4">
                    Get Started
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
