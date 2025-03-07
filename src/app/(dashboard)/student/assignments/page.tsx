"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser } from "@/lib/auth";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  QueryConstraint,
  Timestamp,
  getDocs
} from "firebase/firestore";
import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  dueDate: Timestamp;
  status: 'not_started' | 'in_progress' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  submissionUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export default function StudentAssignmentsPage() {
  const { user } = useUser();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAssignments = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const assignmentsRef = collection(db, "assignments");
      const queryConstraints: QueryConstraint[] = [
        where("studentId", "==", user.uid),
        orderBy("dueDate", "asc")
      ];

      const finalQuery = query(assignmentsRef, ...queryConstraints);
      const snapshot = await getDocs(finalQuery);
      const assignmentsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Assignment[];

      setAssignments(assignmentsList);
    } catch (error) {
      console.error("Error loading assignments:", error);
      toast.error("Failed to load assignments");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadAssignments();
    }
  }, [loadAssignments, user]);

  if (!user) {
    return <div className="p-8 text-center">Please log in to view assignments.</div>;
  }

  return (
    <ProtectedRoute requiredFeature="submit_assignments">
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-6">Assignments</h1>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : assignments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No assignments found.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">{assignment.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {assignment.description}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Due Date:</span>
                      <span className="text-sm font-medium">
                        {assignment.dueDate.toDate().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className={`text-sm font-medium ${
                        assignment.status === "not_started"
                          ? "text-red-500"
                          : assignment.status === "in_progress"
                            ? "text-amber-500"
                            : assignment.status === "submitted"
                              ? "text-blue-500"
                              : "text-green-500"
                      }`}>
                        {assignment.status.split("_").map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(" ")}
                      </span>
                    </div>
                    {assignment.grade && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Grade:</span>
                        <span className="text-sm font-medium">
                          {assignment.grade}%
                        </span>
                      </div>
                    )}
                    <div className="pt-4">
                      <Button className="w-full">
                        {assignment.status === "graded" ? "View Feedback" : "View Assignment"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
