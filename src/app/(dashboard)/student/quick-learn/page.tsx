"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Rocket, Clock, BookOpen, Star, CheckCircle2, BarChart3, Zap } from "lucide-react";

export default function QuickLearnPage() {
  const setActiveTab = useState("flashcards")[1];
  
  // Mock quick learn modules
  const quickLearnModules = [
    {
      id: 1,
      title: "Civil Rights Leaders",
      description: "Learn about key figures in the Civil Rights Movement",
      type: "Flashcards",
      cards: 15,
      estimatedTime: "10 mins",
      progress: 0,
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Black History Timeline",
      description: "Key events in Black history from 1619 to present",
      type: "Quiz",
      questions: 12,
      estimatedTime: "15 mins",
      progress: 33,
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "African American Literature",
      description: "Major works and authors in African American literature",
      type: "Flashcards",
      cards: 20,
      estimatedTime: "12 mins",
      progress: 75,
      difficulty: "Intermediate"
    },
    {
      id: 4,
      title: "Black Scientists and Inventors",
      description: "Contributions of Black scientists throughout history",
      type: "Quiz",
      questions: 10,
      estimatedTime: "8 mins",
      progress: 100,
      difficulty: "Beginner",
      completed: true
    }
  ];
  
  // Filter modules by type
  const flashcards = quickLearnModules.filter(module => module.type === "Flashcards");
  const quizzes = quickLearnModules.filter(module => module.type === "Quiz");
  
  // Mock learning stats
  const learningStats = {
    totalModulesCompleted: 3,
    totalTimeSpent: "45 mins",
    averageScore: "85%",
    streakDays: 4
  };

  return (
    <ProtectedRoute requiredFeature="access_gamification">
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-2">
            <Rocket className="mr-3 h-6 w-6 text-sidebar-accent" />
            <h1 className="text-3xl font-bold text-foreground">Quick Learn</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Fast, focused learning modules to build your knowledge in bite-sized sessions.
          </p>
        </motion.div>
        
        {/* Learning Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-cyan-400/10 p-3 mr-4">
                <CheckCircle2 className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Modules Completed</p>
                <p className="text-2xl font-bold">{learningStats.totalModulesCompleted}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-gold-300/10 p-3 mr-4">
                <Clock className="h-6 w-6 text-gold-300" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Spent</p>
                <p className="text-2xl font-bold">{learningStats.totalTimeSpent}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-green-400/10 p-3 mr-4">
                <BarChart3 className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">{learningStats.averageScore}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-amber-400/10 p-3 mr-4">
                <Zap className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
                <p className="text-2xl font-bold">{learningStats.streakDays}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recommended Module */}
        <Card className="mb-8 bg-muted/30 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5 text-gold-300" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-medium">Harlem Renaissance</h3>
                <p className="text-muted-foreground mt-1">
                  Learn about the cultural revival of African American arts in the 1920s
                </p>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Badge className="mr-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    New
                  </Badge>
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="mr-3">15 mins</span>
                  <BookOpen className="h-3 w-3 mr-1" />
                  <span>Intermediate</span>
                </div>
              </div>
              <Button className="md:w-auto">
                Start Learning
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="flashcards" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="flashcards" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Quizzes
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          {/* Flashcards Tab */}
          <TabsContent value="flashcards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcards.map((module) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col bg-card shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pt-2">
                      <div className="flex justify-between text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {module.cards} cards
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {module.estimatedTime}
                        </div>
                      </div>
                      
                      {module.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="mt-auto pt-4">
                        <Button className="w-full" variant={module.completed ? "outline" : "default"}>
                          {module.completed ? "Review Again" : module.progress > 0 ? "Continue" : "Start"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((module) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col bg-card shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pt-2">
                      <div className="flex justify-between text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {module.questions} questions
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {module.estimatedTime}
                        </div>
                      </div>
                      
                      {module.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="mt-auto pt-4">
                        <Button className="w-full" variant={module.completed ? "outline" : "default"}>
                          {module.completed ? "Take Again" : module.progress > 0 ? "Continue" : "Start Quiz"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
