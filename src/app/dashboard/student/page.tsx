"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Trophy,
  Calendar,
  LogOut,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // Redirect if not authenticated after loading completes
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Mock data - replace with real data from your backend
  const learningProgress = {
    daily: 85,
    weekly: 92,
    monthly: 78,
  };

  const upcomingClasses = [
    {
      id: 1,
      subject: "African American History",
      time: "2:30 PM",
      teacher: "Dr. Johnson",
      topic: "The Harlem Renaissance",
    },
    {
      id: 2,
      subject: "Literature",
      time: "4:00 PM",
      teacher: "Ms. Williams",
      topic: "Maya Angelou's Poetry",
    },
  ];

  const achievements = [
    { id: 1, title: "Fast Learner", progress: 80 },
    { id: 2, title: "Knowledge Seeker", progress: 65 },
    { id: 3, title: "Team Player", progress: 90 },
  ];

  const studyStats = {
    hoursStudied: 24,
    lessonsCompleted: 15,
    currentStreak: 7,
  };

  // Show loading state while authentication is being checked
  if (loading || !isClient) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#12122E]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-white">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Ensure user is authenticated
  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section with 3D Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 p-8 text-white shadow-xl"
      >
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Scholar'}!</h1>
              <p className="text-purple-100">Your learning adventure continues...</p>
            </div>
            <Button 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 text-white" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
          
          {/* Daily Progress Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">{studyStats.hoursStudied}h</div>
              <div className="text-sm text-purple-200">Study Time</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">{studyStats.lessonsCompleted}</div>
              <div className="text-sm text-purple-200">Lessons Done</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">{studyStats.currentStreak} days</div>
              <div className="text-sm text-purple-200">Current Streak</div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </motion.div>

      {/* Learning Progress and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 lg:col-span-2"
        >
          <Card className="bg-[#12122E] border-[#2A2A5A] text-white h-full">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Brain className="mr-2 text-blue-400" /> Learning Progress
              </h2>
              <div className="space-y-4">
                {Object.entries(learningProgress).map(([period, value]) => (
                  <div key={period}>
                    <div className="flex justify-between mb-2">
                      <span>{period.charAt(0).toUpperCase() + period.slice(1)} {period === 'daily' ? 'Goal' : period === 'weekly' ? 'Progress' : 'Target'}</span>
                      <span>{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-[#12122E] border-[#2A2A5A] text-white h-full">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Trophy className="mr-2 text-yellow-400" /> Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id}>
                    <div className="flex justify-between mb-2">
                      <span>{achievement.title}</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Classes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-[#12122E] border-[#2A2A5A] text-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Calendar className="mr-2 text-pink-400" /> Today&apos;s Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingClasses.map((class_) => (
                <div
                  key={class_.id}
                  className="bg-[#2A2A5A] rounded-lg p-4 hover:bg-[#3A3A7A] transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{class_.subject}</h3>
                    <span className="text-sm text-blue-400">{class_.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">with {class_.teacher}</p>
                  <p className="text-sm text-purple-400">{class_.topic}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
