"use client";

import React from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, Trophy, BookOpen, CheckCircle2 } from "lucide-react";

export default function StudentGoalsPage() {
  // Mock goals data
  const goals = [
    {
      id: 1,
      title: "Complete African American History Course",
      description: "Finish all lectures and assignments for African American Studies 101",
      progress: 65,
      deadline: "2025-05-15",
      category: "Academic",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Read 5 Books by Black Authors",
      description: "Expand knowledge through literature by prominent Black writers",
      progress: 40,
      deadline: "2025-06-30",
      category: "Personal",
      status: "In Progress"
    },
    {
      id: 3,
      title: "Complete Civil Rights Research Project",
      description: "Finish research and presentation on Civil Rights Movement leaders",
      progress: 90,
      deadline: "2025-04-10",
      category: "Academic",
      status: "Almost Complete"
    },
    {
      id: 4,
      title: "Attend 3 Cultural Events",
      description: "Participate in cultural events to broaden understanding",
      progress: 33,
      deadline: "2025-07-31",
      category: "Cultural",
      status: "In Progress"
    }
  ];

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "Perfect Attendance",
      description: "Attended all scheduled classes for a month",
      date: "2025-02-28",
      icon: <CheckCircle2 className="h-8 w-8 text-green-500" />
    },
    {
      id: 2,
      title: "Research Excellence",
      description: "Received an A on your Black Scientists research paper",
      date: "2025-02-15",
      icon: <Trophy className="h-8 w-8 text-gold-300" />
    }
  ];

  return (
    <ProtectedRoute requiredFeature="track_progress">
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Goals & Targets</h1>
          <p className="text-muted-foreground mb-8">
            Track your progress and set new goals for your educational journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-cyan-400" />
                Goals Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Goals</span>
                  <span className="text-2xl font-bold">{goals.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">In Progress</span>
                  <span className="text-xl font-semibold text-amber-500">
                    {goals.filter(g => g.status === "In Progress").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Almost Complete</span>
                  <span className="text-xl font-semibold text-green-500">
                    {goals.filter(g => g.status === "Almost Complete").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Completed</span>
                  <span className="text-xl font-semibold text-blue-500">
                    {goals.filter(g => g.status === "Completed").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-gold-300" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start space-x-4 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Achieved on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div className="text-center mt-4">
                  <Button variant="outline" size="sm">View All Achievements</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">My Goals</h2>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Add New Goal
          </Button>
        </div>

        <div className="space-y-6">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-card shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium mb-1">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                    <Badge 
                      className={`mt-2 sm:mt-0 ${goal.progress >= 90 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : goal.progress >= 50 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}
                    >
                      {goal.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Deadline: {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Category: {goal.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button size="sm">Update Progress</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}