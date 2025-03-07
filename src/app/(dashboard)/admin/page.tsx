"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Users, BookOpen, Award, Activity, Bell } from "lucide-react";
import type { AuthUser } from "@/types/auth";

interface LiveClass {
  id: string;
  title: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  startTime: Date;
  status: "scheduled" | "live" | "completed";
  studentCount: number;
}

interface SystemStats {
  totalUsers: number;
  activeClasses: number;
  completedAssignments: number;
  achievements: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    activeClasses: 0,
    completedAssignments: 0,
    achievements: 0
  });
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [recentUsers, setRecentUsers] = useState<AuthUser[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        // Get total users count
        const usersQuery = query(collection(db, "users"));
        const usersSnapshot = await getDocs(usersQuery);
        
        // Get active classes
        const classesQuery = query(
          collection(db, "classes"),
          where("status", "==", "live")
        );
        const classesSnapshot = await getDocs(classesQuery);
        
        // Get completed assignments
        const assignmentsQuery = query(
          collection(db, "assignments"),
          where("status", "==", "completed")
        );
        const assignmentsSnapshot = await getDocs(assignmentsQuery);
        
        // Get total achievements
        const achievementsQuery = query(collection(db, "achievements"));
        const achievementsSnapshot = await getDocs(achievementsQuery);

        setStats({
          totalUsers: usersSnapshot.size,
          activeClasses: classesSnapshot.size,
          completedAssignments: assignmentsSnapshot.size,
          achievements: achievementsSnapshot.size
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    // Subscribe to live classes
    const liveClassesQuery = query(
      collection(db, "classes"),
      where("status", "in", ["scheduled", "live"]),
      orderBy("startTime", "desc")
    );

    const unsubscribeLiveClasses = onSnapshot(liveClassesQuery, (snapshot) => {
      const classes: LiveClass[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        classes.push({
          id: doc.id,
          title: data.title,
          teacherId: data.teacherId,
          teacherName: data.teacherName,
          subject: data.subject,
          startTime: data.startTime.toDate(),
          status: data.status,
          studentCount: data.studentCount || 0
        });
      });
      setLiveClasses(classes);
    });

    // Subscribe to recent users
    const recentUsersQuery = query(
      collection(db, "users"),
      orderBy("metadata.lastSignInTime", "desc")
    );

    const unsubscribeRecentUsers = onSnapshot(recentUsersQuery, (snapshot) => {
      const users: AuthUser[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          uid: doc.id,
          email: data.email,
          role: data.role,
          displayName: data.displayName,
          photoURL: data.photoURL,
          emailVerified: data.emailVerified,
          metadata: data.metadata,
          providerData: data.providerData
        });
      });
      setRecentUsers(users.slice(0, 5));
    });

    fetchStats();
    setLoading(false);

    return () => {
      unsubscribeLiveClasses();
      unsubscribeRecentUsers();
    };
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-orbitron font-bold text-primary">Admin Dashboard</h1>
        <Button variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClasses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedAssignments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.achievements}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Live Classes</CardTitle>
            <CardDescription>Currently active and upcoming classes</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {liveClasses.map((liveClass) => (
                <div
                  key={liveClass.id}
                  className="flex items-center justify-between p-4 border rounded-lg mb-2"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{liveClass.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {liveClass.teacherName} · {liveClass.subject}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={liveClass.status === "live" ? "default" : "secondary"}
                    >
                      {liveClass.status === "live" ? "Live" : "Scheduled"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {liveClass.studentCount} students
                    </span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest user activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {recentUsers.map((recentUser) => (
                <div
                  key={recentUser.uid}
                  className="flex items-center gap-4 p-4 border rounded-lg mb-2"
                >
                  <Avatar>
                    <AvatarImage src={recentUser.photoURL || undefined} />
                    <AvatarFallback>
                      {recentUser.displayName?.[0] || recentUser.email?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {recentUser.displayName || recentUser.email}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {recentUser.role}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {recentUser.emailVerified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
