"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { PlusCircle, BookOpen, BarChart, Calendar, Users, GraduationCap, Award } from "lucide-react";
import Link from "next/link";
import { HomeschoolStudent } from "@/types/homeschool";
import { getStudentsByParentId, addStudent, deleteStudent, isQueryError } from "@/queries/homeschool";

export default function HomeschoolParentDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<HomeschoolStudent[]>([]);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    gradeLevel: "",
    age: "",
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [subjectProgress] = useState({
    math: { completed: 45, total: 100 },
    reading: { completed: 32, total: 100 },
    science: { completed: 18, total: 100 },
    socialStudies: { completed: 27, total: 100 },
    language: { completed: 15, total: 100 },
  });

  const fetchStudents = useCallback(async () => {
    if (!user?.uid) return;
    
    setLoading(true);
    const result = await getStudentsByParentId(user.uid);
    
    if (isQueryError(result)) {
      console.error("Error fetching students:", result.message);
      toast.error(result.message);
    } else {
      setStudents(result);
    }
    
    setLoading(false);
  }, [user, setLoading, setStudents]);
  
  useEffect(() => {
    if (user) {
      fetchStudents();
    } else {
      setLoading(false);
    }
  }, [user, fetchStudents]);

  const handleAddStudent = async () => {
    if (!user) {
      toast.error("You must be logged in to add a student");
      return;
    }

    if (!newStudent.name || !newStudent.gradeLevel) {
      toast.error("Please fill in all required fields");
      return;
    }

    const studentData = {
      name: newStudent.name,
      gradeLevel: newStudent.gradeLevel,
      age: newStudent.age,
      parentId: user.uid,
      parentName: user.displayName || "Parent",
    };

    const result = await addStudent(studentData);
    
    if (isQueryError(result)) {
      console.error("Error adding student:", result.message);
      toast.error(result.message);
    } else {
      setNewStudent({
        name: "",
        gradeLevel: "",
        age: "",
      });
      
      setAddStudentOpen(false);
      toast.success("Student added successfully");
      fetchStudents();
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    const result = await deleteStudent(studentId);
    
    if (isQueryError(result)) {
      console.error("Error removing student:", result.message);
      toast.error(result.message);
    } else {
      toast.success("Student removed successfully");
      fetchStudents();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Homeschool Parent Dashboard</h1>
          <p className="text-muted-foreground">Manage your homeschool curriculum and student progress</p>
        </div>
        <Dialog open={addStudentOpen} onOpenChange={setAddStudentOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0" variant="default">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Student</DialogTitle>
              <DialogDescription>
                Add your child&apos;s information to manage their homeschool curriculum.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">
                  Grade Level
                </Label>
                <Select
                  value={newStudent.gradeLevel}
                  onValueChange={(value) => setNewStudent({ ...newStudent, gradeLevel: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pre-K">Pre-K</SelectItem>
                    <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                    <SelectItem value="1st Grade">1st Grade</SelectItem>
                    <SelectItem value="2nd Grade">2nd Grade</SelectItem>
                    <SelectItem value="3rd Grade">3rd Grade</SelectItem>
                    <SelectItem value="4th Grade">4th Grade</SelectItem>
                    <SelectItem value="5th Grade">5th Grade</SelectItem>
                    <SelectItem value="6th Grade">6th Grade</SelectItem>
                    <SelectItem value="7th Grade">7th Grade</SelectItem>
                    <SelectItem value="8th Grade">8th Grade</SelectItem>
                    <SelectItem value="9th Grade">9th Grade</SelectItem>
                    <SelectItem value="10th Grade">10th Grade</SelectItem>
                    <SelectItem value="11th Grade">11th Grade</SelectItem>
                    <SelectItem value="12th Grade">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input
                  id="age"
                  value={newStudent.age}
                  onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                  className="col-span-3"
                  type="number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddStudentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="calendar" className="hidden md:block">Calendar</TabsTrigger>
          <TabsTrigger value="resources" className="hidden md:block">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Students</CardTitle>
                <CardDescription>Manage your homeschool students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{students.length}</div>
                <p className="text-xs text-muted-foreground">
                  {students.length === 1 ? "Student" : "Students"} registered
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("students")}>
                  <Users className="mr-2 h-4 w-4" />
                  View Students
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Subjects</CardTitle>
                <CardDescription>Curriculum progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Core subjects in progress
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("curriculum")}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Curriculum
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Upcoming</CardTitle>
                <CardDescription>Scheduled lessons and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Activities scheduled this week
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("calendar")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
                <CardDescription>Overall progress across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Mathematics</Label>
                      <span className="text-sm text-muted-foreground">
                        {subjectProgress.math.completed}%
                      </span>
                    </div>
                    <Progress value={subjectProgress.math.completed} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Reading & Literature</Label>
                      <span className="text-sm text-muted-foreground">
                        {subjectProgress.reading.completed}%
                      </span>
                    </div>
                    <Progress value={subjectProgress.reading.completed} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Science</Label>
                      <span className="text-sm text-muted-foreground">
                        {subjectProgress.science.completed}%
                      </span>
                    </div>
                    <Progress value={subjectProgress.science.completed} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Social Studies</Label>
                      <span className="text-sm text-muted-foreground">
                        {subjectProgress.socialStudies.completed}%
                      </span>
                    </div>
                    <Progress value={subjectProgress.socialStudies.completed} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Language Arts</Label>
                      <span className="text-sm text-muted-foreground">
                        {subjectProgress.language.completed}%
                      </span>
                    </div>
                    <Progress value={subjectProgress.language.completed} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setActiveTab("progress")}>
                  <BarChart className="mr-2 h-4 w-4" />
                  View Detailed Progress
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Students</CardTitle>
              <CardDescription>
                Add, edit, or remove students from your homeschool program
              </CardDescription>
            </CardHeader>
            <CardContent>
              {students.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map((student) => (
                    <Card key={student.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/50 pb-2">
                        <CardTitle className="text-lg font-medium flex items-center">
                          <GraduationCap className="mr-2 h-5 w-5" />
                          {student.name}
                        </CardTitle>
                        <CardDescription>{student.gradeLevel}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Age:</span>
                            <span className="text-sm">{student.age || "Not specified"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Subjects:</span>
                            <span className="text-sm">5</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Progress:</span>
                            <span className="text-sm">32%</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-3">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/homeschool/student/${student.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleRemoveStudent(student.id)}
                        >
                          Remove
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No Students Added</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You haven&apos;t added any students to your homeschool program yet.
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setAddStudentOpen(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Student
                  </Button>
                </div>
              )}
            </CardContent>
            {students.length > 0 && (
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={() => setAddStudentOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Another Student
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="curriculum" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Management</CardTitle>
              <CardDescription>
                Browse and manage your homeschool curriculum by subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Mathematics", icon: <Award className="h-8 w-8" />, color: "bg-blue-100 dark:bg-blue-900", progress: 45 },
                  { name: "Reading & Literature", icon: <BookOpen className="h-8 w-8" />, color: "bg-green-100 dark:bg-green-900", progress: 32 },
                  { name: "Science", icon: <Award className="h-8 w-8" />, color: "bg-purple-100 dark:bg-purple-900", progress: 18 },
                  { name: "Social Studies", icon: <Users className="h-8 w-8" />, color: "bg-orange-100 dark:bg-orange-900", progress: 27 },
                  { name: "Language Arts", icon: <Award className="h-8 w-8" />, color: "bg-pink-100 dark:bg-pink-900", progress: 15 },
                  { name: "Add New Subject", icon: <PlusCircle className="h-8 w-8" />, color: "bg-gray-100 dark:bg-gray-800", progress: 0 },
                ].map((subject, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className={`${subject.color} pb-2`}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-medium">{subject.name}</CardTitle>
                        {subject.icon}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      {subject.name !== "Add New Subject" ? (
                        <>
                          <div className="mb-2">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm">{subject.progress}%</span>
                            </div>
                            <Progress value={subject.progress} className="h-2" />
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Units:</span>
                              <span>8</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Lessons:</span>
                              <span>24</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Activities:</span>
                              <span>36</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground">
                            Add a custom subject to your curriculum
                          </p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t px-6 py-3">
                      <Button 
                        variant={subject.name === "Add New Subject" ? "default" : "ghost"} 
                        size="sm" 
                        className="w-full"
                      >
                        {subject.name === "Add New Subject" ? "Add Subject" : "View Lessons"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your students&apos; progress across all subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {students.length > 0 ? (
                <div className="space-y-8">
                  {students.map((student) => (
                    <div key={student.id} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <span className="text-sm text-muted-foreground">({student.gradeLevel})</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Mathematics</Label>
                            <span className="text-sm text-muted-foreground">
                              45%
                            </span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Reading & Literature</Label>
                            <span className="text-sm text-muted-foreground">
                              32%
                            </span>
                          </div>
                          <Progress value={32} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Science</Label>
                            <span className="text-sm text-muted-foreground">
                              18%
                            </span>
                          </div>
                          <Progress value={18} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Social Studies</Label>
                            <span className="text-sm text-muted-foreground">
                              27%
                            </span>
                          </div>
                          <Progress value={27} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Language Arts</Label>
                            <span className="text-sm text-muted-foreground">
                              15%
                            </span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/homeschool/student/${student.id}`}>
                            View Detailed Report
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No Students to Track</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add students to start tracking their progress.
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={() => setAddStudentOpen(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Student
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Educational Resources</CardTitle>
              <CardDescription>
                Access teaching materials and external resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Lesson Plans", description: "Access ready-made lesson plans for all subjects" },
                  { name: "Printable Worksheets", description: "Download and print worksheets for practice" },
                  { name: "Educational Videos", description: "Video lessons for visual learners" },
                  { name: "Interactive Activities", description: "Engaging online activities for students" },
                  { name: "Assessment Tools", description: "Tools to evaluate student progress" },
                  { name: "Parent Resources", description: "Guides and tips for homeschool parents" },
                ].map((resource, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">{resource.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {resource.description}
                      </p>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-3">
                      <Button variant="ghost" size="sm" className="w-full">
                        Browse Resources
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
