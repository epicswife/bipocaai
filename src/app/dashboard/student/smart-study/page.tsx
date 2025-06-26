"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Clock, Lightbulb, Search, BookMarked, History } from "lucide-react";

export default function SmartStudyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const setActiveTab = useState("resources")[1];
  
  // Mock study resources
  const studyResources = [
    {
      id: 1,
      title: "Black History Timeline",
      type: "Interactive",
      subject: "African American Studies",
      duration: "45 mins",
      difficulty: "Intermediate",
      description: "Explore key events and figures in Black history through an interactive timeline."
    },
    {
      id: 2,
      title: "Civil Rights Movement: Key Speeches",
      type: "Audio",
      subject: "History",
      duration: "60 mins",
      difficulty: "Intermediate",
      description: "Listen to and analyze important speeches from the Civil Rights Movement."
    },
    {
      id: 3,
      title: "Black Scientists and Inventors",
      type: "Article",
      subject: "Science",
      duration: "30 mins",
      difficulty: "Beginner",
      description: "Learn about influential Black scientists and their contributions to various fields."
    }
  ];
  
  // Mock study sessions
  const recentSessions = [
    {
      id: 1,
      title: "African American Literature Review",
      date: "2025-03-04",
      duration: "45 mins",
      progress: "Completed"
    },
    {
      id: 2,
      title: "Civil Rights Timeline Study",
      date: "2025-03-02",
      duration: "30 mins",
      progress: "Completed"
    }
  ];
  
  // Mock AI-generated study plans
  const studyPlans = [
    {
      id: 1,
      title: "Black History Month Intensive",
      description: "A comprehensive 2-week study plan covering key aspects of Black history",
      sessions: 8,
      totalHours: 12,
      topics: ["Historical Figures", "Civil Rights", "Cultural Impact"]
    },
    {
      id: 2,
      title: "Civil Rights Movement Deep Dive",
      description: "An in-depth exploration of the Civil Rights Movement and its lasting impact",
      sessions: 5,
      totalHours: 7.5,
      topics: ["Key Leaders", "Landmark Legislation", "Social Change"]
    }
  ];

  return (
    <ProtectedRoute requiredFeature="view_courses">
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Smart Study</h1>
          <p className="text-muted-foreground mb-8">
            AI-powered study tools and resources tailored to your learning needs.
          </p>
        </motion.div>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="flex">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for study resources, topics, or concepts..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="ml-2">
              Search
            </Button>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="resources" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="resources" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Study Resources
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center">
              <Brain className="mr-2 h-4 w-4" />
              AI Study Plans
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="mr-2 h-4 w-4" />
              Recent Sessions
            </TabsTrigger>
          </TabsList>
          
          {/* Study Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col bg-card shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <Badge className={resource.type === "Interactive" 
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" 
                          : resource.type === "Audio" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }>
                          {resource.type}
                        </Badge>
                      </div>
                      <CardDescription>{resource.subject}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                      <div className="flex justify-between text-xs text-muted-foreground mb-6">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {resource.duration}
                        </div>
                        <div>
                          Difficulty: {resource.difficulty}
                        </div>
                      </div>
                      <div className="mt-auto pt-4">
                        <Button className="w-full">Start Learning</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline">Browse All Resources</Button>
            </div>
          </TabsContent>
          
          {/* AI Study Plans Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="mb-8 bg-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-gold-300" />
                  Create Custom Study Plan
                </CardTitle>
                <CardDescription>
                  Let our AI create a personalized study plan based on your goals and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">What would you like to study?</label>
                    <Input placeholder="e.g., Civil Rights Movement, Black Literature, etc." />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Difficulty Level</label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Time Available (hours/week)</label>
                      <Input type="number" min="1" max="20" defaultValue="5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Any specific learning goals?</label>
                    <Textarea placeholder="Describe what you hope to achieve with this study plan..." />
                  </div>
                  <div className="flex justify-end">
                    <Button>
                      <Brain className="mr-2 h-4 w-4" />
                      Generate Study Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <h3 className="text-xl font-semibold mb-4">Recommended Study Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col bg-card shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg">{plan.title}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="text-sm">
                          <span className="font-medium">Sessions:</span> {plan.sessions}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Total Hours:</span> {plan.totalHours}
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm font-medium">Topics:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {plan.topics.map((topic, index) => (
                            <Badge key={index} variant="outline">{topic}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto pt-4">
                        <Button className="w-full">
                          <BookMarked className="mr-2 h-4 w-4" />
                          Start This Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          {/* Recent Sessions Tab */}
          <TabsContent value="history">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Your Recent Study Sessions</h3>
              {recentSessions.length > 0 ? (
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-card shadow-sm hover:shadow-md transition-all duration-300">
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{session.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{session.duration}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(session.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mr-4">
                              {session.progress}
                            </Badge>
                            <Button variant="outline" size="sm">Resume</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven&apos;t completed any study sessions yet.</p>
                  <Button>Start Your First Session</Button>
                </div>
              )}
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Study Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Study Time</h4>
                      <p className="text-3xl font-bold">1h 15m</p>
                      <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Sessions Completed</h4>
                      <p className="text-3xl font-bold">2</p>
                      <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Avg. Session Length</h4>
                      <p className="text-3xl font-bold">37m</p>
                      <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
