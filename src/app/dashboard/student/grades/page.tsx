"use client";

import React from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function StudentGradesPage() {
  // Mock grades data
  const courses = [
    {
      id: 1,
      name: "African American Studies 101",
      grade: "A-",
      percentage: 91,
      assignments: [
        { name: "Black History Essay", grade: "B+", percentage: 87 },
        { name: "Cultural Impact Analysis", grade: "A", percentage: 95 },
        { name: "Black History Month Quiz", grade: "A-", percentage: 92 },
      ]
    },
    {
      id: 2,
      name: "History of Civil Rights",
      grade: "A",
      percentage: 94,
      assignments: [
        { name: "Civil Rights Movement Timeline", grade: "A", percentage: 96 },
        { name: "Civil Rights Leaders", grade: "A-", percentage: 92 },
      ]
    },
    {
      id: 3,
      name: "Science and Society",
      grade: "B+",
      percentage: 88,
      assignments: [
        { name: "Famous Black Scientists Report", grade: "B+", percentage: 88 },
        { name: "Scientific Contributions", grade: "Not Graded", percentage: null },
      ]
    }
  ];

  return (
    <ProtectedRoute requiredFeature="view_grades">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-foreground mb-2">
            My Grades
          </h1>
          <p className="text-muted-foreground mb-8">
            View your grades and feedback for all courses.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-8">
          {courses.map((course, courseIndex) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: courseIndex * 0.1 }}
            >
              <Card className="bg-card shadow-glow hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex justify-between items-center">
                    <span>{course.name}</span>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      course.percentage >= 90 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : course.percentage >= 80
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                    }`}>
                      Overall: {course.grade} ({course.percentage}%)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assignment</TableHead>
                        <TableHead className="text-right">Grade</TableHead>
                        <TableHead className="text-right">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {course.assignments.map((assignment, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{assignment.name}</TableCell>
                          <TableCell className="text-right">{assignment.grade}</TableCell>
                          <TableCell className="text-right">{assignment.percentage ? `${assignment.percentage}%` : "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
