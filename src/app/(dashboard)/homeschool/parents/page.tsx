"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  FileText, 
  Calendar as CalendarIcon,
  Users,
  Settings,
  PlusCircle,
  CheckCircle2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data for parent dashboard
const childrenData = [
  {
    id: 1,
    name: "Emily Johnson",
    grade: "7th Grade",
    age: 12,
    subjects: [
      { name: "Math", progress: 85, lastActivity: "Completed Algebra Quiz", date: "Yesterday" },
      { name: "Science", progress: 72, lastActivity: "Started Biology Module", date: "Today" },
      { name: "History", progress: 90, lastActivity: "Completed Civil War Essay", date: "3 days ago" },
      { name: "English", progress: 78, lastActivity: "Reading Assignment", date: "Today" }
    ],
    upcomingAssignments: [
      { id: 1, title: "Fractions Quiz", subject: "Math", dueDate: "Tomorrow", status: "Not Started" },
      { id: 2, title: "Science Lab Report", subject: "Science", dueDate: "Mar 10", status: "In Progress" },
      { id: 3, title: "Book Report", subject: "English", dueDate: "Mar 15", status: "Not Started" }
    ],
    recentAchievements: [
      { id: 1, title: "Math Master", description: "Completed Algebra module with 95% accuracy", date: "Mar 3" },
      { id: 2, title: "Science Explorer", description: "Completed 10 science experiments", date: "Feb 28" }
    ]
  },
  {
    id: 2,
    name: "Michael Johnson",
    grade: "4th Grade",
    age: 9,
    subjects: [
      { name: "Math", progress: 80, lastActivity: "Multiplication Practice", date: "Today" },
      { name: "Science", progress: 65, lastActivity: "Plants Worksheet", date: "Yesterday" },
      { name: "Reading", progress: 88, lastActivity: "Chapter Book Reading", date: "Today" },
      { name: "Social Studies", progress: 70, lastActivity: "State Capitals Quiz", date: "2 days ago" }
    ],
    upcomingAssignments: [
      { id: 1, title: "Multiplication Test", subject: "Math", dueDate: "Mar 8", status: "Not Started" },
      { id: 2, title: "Plant Growth Project", subject: "Science", dueDate: "Mar 12", status: "Not Started" }
    ],
    recentAchievements: [
      { id: 1, title: "Reading Champion", description: "Read 5 books this month", date: "Mar 1" }
    ]
  }
];

const curriculumResources = [
  { id: 1, title: "7th Grade Math Curriculum", subject: "Math", type: "Full Curriculum", rating: 4.8 },
  { id: 2, title: "Middle School Science Labs", subject: "Science", type: "Activities", rating: 4.6 },
  { id: 3, title: "U.S. History Interactive Lessons", subject: "History", type: "Lessons", rating: 4.7 },
  { id: 4, title: "4th Grade Reading Comprehension", subject: "Reading", type: "Worksheets", rating: 4.5 },
  { id: 5, title: "Elementary Math Foundations", subject: "Math", type: "Full Curriculum", rating: 4.9 }
];

const upcomingEvents = [
  { id: 1, title: "Virtual Science Fair", date: "Mar 15, 2025", time: "1:00 PM - 3:00 PM" },
  { id: 2, title: "Parent-Teacher Conference", date: "Mar 20, 2025", time: "4:30 PM - 5:00 PM" },
  { id: 3, title: "Homeschool Co-op Meeting", date: "Mar 25, 2025", time: "10:00 AM - 12:00 PM" }
];

export default function HomeschoolParentDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedChild, setSelectedChild] = useState(childrenData[0]);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-orbitron font-bold text-foreground">Parent Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Add Activity
          </Button>
        </div>
      </div>

      {/* Child Selector */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Your Children</CardTitle>
          <CardDescription>Select a child to view their progress and assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {childrenData.map((child) => (
              <Button 
                key={child.id}
                variant={selectedChild.id === child.id ? "default" : "outline"}
                className={selectedChild.id === child.id ? "bg-teal-500 hover:bg-teal-600 text-white" : ""}
                onClick={() => setSelectedChild(child)}
              >
                {child.name} ({child.grade})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Subjects", value: selectedChild.subjects.length.toString(), icon: BookOpen, color: "text-amber-500" },
          { title: "Grade Level", value: selectedChild.grade.split(" ")[0], icon: GraduationCap, color: "text-teal-500" },
          { title: "Weekly Hours", value: "18", icon: Clock, color: "text-violet-500" },
          { title: "Assignments", value: selectedChild.upcomingAssignments.length.toString(), icon: FileText, color: "text-rose-500" },
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
            <CardTitle>Subject Progress</CardTitle>
            <CardDescription>{selectedChild.name}&apos;s progress across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {selectedChild.subjects.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-foreground">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">{subject.lastActivity} &bull; {subject.date}</p>
                    </div>
                    <span className="text-foreground font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2 [&>div]:bg-teal-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-teal-500" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-primary/20"
            />
            <div className="mt-4 space-y-2">
              <h3 className="font-medium text-foreground">Upcoming Events</h3>
              {upcomingEvents.map((event) => (
                <div key={event.id} className="text-sm p-2 rounded-md bg-muted/20">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-muted-foreground">{event.date} • {event.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assignments" className="space-y-4">
        <TabsList className="bg-muted/20">
          <TabsTrigger value="assignments" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Assignments
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Achievements
          </TabsTrigger>
          <TabsTrigger value="curriculum" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Curriculum Resources
          </TabsTrigger>
          <TabsTrigger value="community" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            Homeschool Community
          </TabsTrigger>
        </TabsList>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="border-none p-0">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Upcoming Assignments</CardTitle>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Assignment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedChild.upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                    <div>
                      <h3 className="font-medium text-foreground">{assignment.title}</h3>
                      <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
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
                      <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">
                        Edit
                      </Button>
                      <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                        View Details
                      </Button>
                    </div>
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
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedChild.recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20">
                    <div className="mt-1">
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Achieved on {achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Curriculum Resources Tab */}
        <TabsContent value="curriculum" className="border-none p-0">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Curriculum Resources</CardTitle>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  Browse All Resources
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {curriculumResources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                    <div>
                      <h3 className="font-medium text-foreground">{resource.title}</h3>
                      <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{resource.subject}</span>
                        <span>{resource.type}</span>
                        <span className="text-amber-500">★ {resource.rating}</span>
                      </div>
                    </div>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                      View Resource
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="border-none p-0">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Homeschool Community</CardTitle>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Join Groups
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Local Homeschool Groups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-md bg-muted/20">
                        <h4 className="font-medium">Metro Area Homeschoolers</h4>
                        <p className="text-sm text-muted-foreground">Weekly meetups, field trips, and educational activities</p>
                        <Button variant="link" className="text-teal-500 p-0 h-auto mt-1">Join Group</Button>
                      </div>
                      <div className="p-3 rounded-md bg-muted/20">
                        <h4 className="font-medium">Science & Nature Explorers</h4>
                        <p className="text-sm text-muted-foreground">Hands-on science activities and nature exploration</p>
                        <Button variant="link" className="text-teal-500 p-0 h-auto mt-1">Join Group</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Community Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-md bg-muted/20">
                        <h4 className="font-medium">Homeschool Art Exhibition</h4>
                        <p className="text-sm text-muted-foreground">April 10, 2025 • Community Center</p>
                        <Button variant="link" className="text-teal-500 p-0 h-auto mt-1">Learn More</Button>
                      </div>
                      <div className="p-3 rounded-md bg-muted/20">
                        <h4 className="font-medium">STEM Workshop Day</h4>
                        <p className="text-sm text-muted-foreground">April 15, 2025 • Science Museum</p>
                        <Button variant="link" className="text-teal-500 p-0 h-auto mt-1">Learn More</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
