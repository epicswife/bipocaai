"use client";

import React from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function StudentQuizzesPage() {
  // Mock quizzes data
  const quizzes = [
    {
      id: 1,
      title: "Black History Month Quiz",
      dueDate: "2025-03-10",
      status: "Available",
      course: "African American Studies 101",
      questions: 15,
      timeLimit: "30 minutes"
    },
    {
      id: 2,
      title: "Civil Rights Leaders",
      dueDate: "2025-03-18",
      status: "Available",
      course: "History of Civil Rights",
      questions: 20,
      timeLimit: "45 minutes"
    },
    {
      id: 3,
      title: "Scientific Contributions",
      dueDate: "2025-03-22",
      status: "Not Available Yet",
      course: "Science and Society",
      questions: 10,
      timeLimit: "20 minutes"
    }
  ];

  return (
    <ProtectedRoute requiredFeature="take_quizzes">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-2">
            My Quizzes
          </h1>
          <p className="text-muted-foreground mb-8">
            Take quizzes and assessments for your courses.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-6">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-card shadow-glow hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex justify-between items-center">
                    <span>{quiz.title}</span>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      quiz.status === "Available" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}>
                      {quiz.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Course:</span> {quiz.course}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Due Date:</span> {quiz.dueDate}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Questions:</span> {quiz.questions}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Time Limit:</span> {quiz.timeLimit}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Button disabled={quiz.status !== "Available"}>
                      {quiz.status === "Available" ? "Start Quiz" : "Not Available"}
                    </Button>
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
