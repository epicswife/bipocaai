"use client";

import { useState, useEffect, JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, UserRole } from "@/lib/types";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Mock user data; replace with Firebase fetch later
    setUser({ role: "student", name: "Jane Doe", email: "jane.doe@example.com" });
  }, []);

  if (!isMounted || !user) return null;

  const dashboardContent: Record<UserRole, JSX.Element> = {
    student: (
      <div className="space-y-6">
        <Card className="bg-white dark:bg-gray-700 border-purple-400 dark:border-blue-400 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">You’re enrolled in 3 courses!</p>
            <Link href="/courses">
              <Button className="mt-4 bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
                View Courses
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-700 border-green-300 dark:border-yellow-300 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">Gamification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">You’ve earned 5 badges!</p>
            <Link href="/dashboard/gamification">
              <Button className="mt-4 bg-green-300 text-black hover:bg-yellow-300 dark:bg-green-300 dark:hover:bg-yellow-300">
                View Badges
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    ),
    teacher: (
      <div className="space-y-6">
        <Card className="bg-white dark:bg-gray-700 border-teal-300 dark:border-cyan-600 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">Teaching Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">Create a new quiz or lesson plan.</p>
            <div className="flex gap-2 mt-4">
              <Link href="/teacher/quiz-creation">
                <Button className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
                  Create Quiz
                </Button>
              </Link>
              <Link href="/teacher/ai-planning">
                <Button className="bg-teal-300 text-black hover:bg-cyan-400 dark:bg-teal-300 dark:hover:bg-cyan-400">
                  AI Planning
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    ),
    parent: (
      <div className="space-y-6">
        <Card className="bg-white dark:bg-gray-700 border-green-300 dark:border-yellow-300 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">Homeschool Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">Manage your child’s learning.</p>
            <Link href="/homeschool/dashboard">
              <Button className="mt-4 bg-green-300 text-black hover:bg-yellow-300 dark:bg-green-300 dark:hover:bg-yellow-300">
                Homeschool Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    ),
    admin: (
      <div className="space-y-6">
        <Card className="bg-white dark:bg-gray-700 border-red-400 dark:border-red-400 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">District Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">View student progress (mock paid status).</p>
            <Link href="/districts/dashboard">
              <Button className="mt-4 bg-red-400 text-black hover:bg-orange-400 dark:bg-red-400 dark:hover:bg-orange-400">
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    ),
    counselor: (
      <div className="space-y-6">
        <Card className="bg-white dark:bg-gray-700 border-blue-400 dark:border-purple-400 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">Student Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">Access student mental health records.</p>
            <Link href="/mental-health/counselor">
              <Button className="mt-4 bg-blue-400 text-black hover:bg-purple-400 dark:bg-blue-400 dark:hover:bg-purple-400">
                Support Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    ),
    social_worker: (
      <div className="space-y-6">
        <Card className="bg-white dark:bg-gray-700 border-blue-400 dark:border-purple-400 shadow-glow">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-black dark:text-white">Family Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">Provide resources for families.</p>
            <Link href="/mental-health/counselor">
              <Button className="mt-4 bg-blue-400 text-black hover:bg-purple-400 dark:bg-blue-400 dark:hover:bg-purple-400">
                Support Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    ),
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-black dark:text-white mb-8">
        Welcome, {user.name}!
      </h1>
      {dashboardContent[user.role]}
    </div>
  );
}