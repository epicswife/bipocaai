"use client";

import { useAuth } from "@/lib/auth";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UserRole = "student" | "teacher" | "parent" | "admin" | "counselor" | "social_worker";
interface DashboardContent {
  [key: string]: { title: string; content: React.ReactNode };
  student: { title: string; content: React.ReactNode };
  teacher: { title: string; content: React.ReactNode };
  parent: { title: string; content: React.ReactNode };
  admin: { title: string; content: React.ReactNode };
  counselor: { title: string; content: React.ReactNode };
  social_worker: { title: string; content: React.ReactNode };
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const params = useParams();
  const role = params.role as UserRole;

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Please log in to view your dashboard.</div>;

  const dashboardContent: DashboardContent = {
    student: {
      title: "Student Dashboard",
      content: (
        <>
          <p className="text-gray-700 dark:text-gray-300">Welcome, student! Access your courses and track your progress.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Recent Activity</h3>
            <p className="text-gray-700 dark:text-gray-300">Completed: Black History 101 Quiz</p>
          </div>
        </>
      ),
    },
    teacher: {
      title: "Teacher Dashboard",
      content: (
        <>
          <p className="text-gray-700 dark:text-gray-300">Welcome, teacher! Manage your courses and lessons.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Actions</h3>
            <p className="text-gray-700 dark:text-gray-300">Create a new quiz or lesson plan.</p>
          </div>
        </>
      ),
    },
    parent: {
      title: "Parent Dashboard",
      content: (
        <>
          <p className="text-gray-700 dark:text-gray-300">Welcome, parent! Support your child’s learning.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Child Progress</h3>
            <p className="text-gray-700 dark:text-gray-300">Your child completed 3 lessons this week.</p>
          </div>
        </>
      ),
    },
    admin: {
      title: "District Admin Dashboard",
      content: (
        <>
          <p className="text-gray-700 dark:text-gray-300">Welcome, admin! Manage your district’s analytics.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Status</h3>
            <p className="text-gray-700 dark:text-gray-300">Payment Required to Unlock Full Analytics</p>
          </div>
        </>
      ),
    },
    counselor: {
      title: "Counselor Dashboard",
      content: (
        <>
          <p className="text-gray-700 dark:text-gray-300">Welcome, counselor! Support student mental health.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Student Alerts</h3>
            <p className="text-gray-700 dark:text-gray-300">2 students reported high stress levels.</p>
          </div>
        </>
      ),
    },
    social_worker: {
      title: "Social Worker Dashboard",
      content: (
        <>
          <p className="text-gray-700 dark:text-gray-300">Welcome, social worker! Assist students and parents.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Parent Requests</h3>
            <p className="text-gray-700 dark:text-gray-300">3 parents requested support this week.</p>
          </div>
        </>
      ),
    },
  };

  const content = dashboardContent[role] || dashboardContent.student;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">{content.title}</h1>
      <Card className="bg-white dark:bg-gray-700 border-gold-300 dark:border-teal-700">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">{content.title}</CardTitle>
        </CardHeader>
        <CardContent>{content.content}</CardContent>
      </Card>
    </div>
  );
}