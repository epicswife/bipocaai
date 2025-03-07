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
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";



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

interface NewAssignmentForm {
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
}

const initialFormState: NewAssignmentForm = {
  title: "",
  description: "",
  courseId: "",
  dueDate: ""
};

export default function TeacherAssignmentsPage() {
  const { user } = useUser();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<NewAssignmentForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [courses, setCourses] = useState<{ id: string; name: string; }[]>([]);

  const loadCourses = useCallback(async () => {
    if (!user) return;

    try {
      const coursesRef = collection(db, "courses");
      const queryConstraints: QueryConstraint[] = [
        where("teacherId", "==", user.uid)
      ];

      const finalQuery = query(coursesRef, ...queryConstraints);
      const snapshot = await getDocs(finalQuery);
      const coursesList = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));

      setCourses(coursesList);
    } catch (error) {
      console.error("Error loading courses:", error);
      toast.error("Failed to load courses");
    }
  }, [user]);

  const loadAssignments = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const assignmentsRef = collection(db, "assignments");
      const queryConstraints: QueryConstraint[] = [
        where("teacherId", "==", user.uid)
      ];

      if (activeTab === "pending") {
        queryConstraints.push(
          where("status", "in", ["not_started", "in_progress"])
        );
      } else if (activeTab === "submitted") {
        queryConstraints.push(
          where("status", "==", "submitted")
        );
      } else if (activeTab === "graded") {
        queryConstraints.push(
          where("status", "==", "graded")
        );
      }

      queryConstraints.push(orderBy("dueDate", "asc"));

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
  }, [user, activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const selectedCourse = courses.find(course => course.id === formData.courseId);
      if (!selectedCourse) throw new Error("Course not found");

      const dueDateTimestamp = Timestamp.fromDate(new Date(formData.dueDate));
      const now = Timestamp.now();

      const newAssignment = {
        title: formData.title,
        description: formData.description,
        courseId: formData.courseId,
        courseName: selectedCourse.name,
        teacherId: user.uid,
        teacherName: user.displayName || 'Teacher',
        dueDate: dueDateTimestamp,
        status: "not_started" as const,
        createdAt: now,
        updatedAt: now
      };

      await addDoc(collection(db, "assignments"), newAssignment);
      toast.success("Assignment created successfully!");
      setFormData(initialFormState);
      setIsDialogOpen(false);
      loadAssignments();
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast.error("Failed to create assignment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const gradeAssignment = async (assignmentId: string, grade: number, feedback: string) => {
    if (!user) return;

    try {
      const assignmentRef = doc(db, "assignments", assignmentId);
      await updateDoc(assignmentRef, {
        status: "graded",
        grade,
        feedback,
        updatedAt: Timestamp.now()
      });
      toast.success("Assignment graded successfully!");
      loadAssignments();
    } catch (error) {
      console.error("Error grading assignment:", error);
      toast.error("Failed to grade assignment");
    }
  };

  useEffect(() => {
    if (user) {
      loadCourses();
      loadAssignments();
    }
  }, [loadCourses, loadAssignments, user]);

  if (!user) {
    return <div className="p-8 text-center">Please log in to manage assignments.</div>;
  }

  return (
    <ProtectedRoute requiredFeature="grade_assignments">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Assignments</h1>
            <p className="text-muted-foreground">
              Create and manage assignments for your courses.
            </p>
          </motion.div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="courseId">Course</Label>
                  <Select
                    value={formData.courseId}
                    onValueChange={(value) => setFormData({ ...formData, courseId: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="datetime-local"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Assignment"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : assignments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No {activeTab} assignments found.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                      <Button 
                        className="w-full" 
                        onClick={() => assignment.status === "submitted" ? 
                          gradeAssignment(assignment.id, 0, "") : 
                          null
                        }
                      >
                        {assignment.status === "submitted" ? "Grade Assignment" : "View Details"}
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
