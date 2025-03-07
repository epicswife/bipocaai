"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/ui/charts";
import { Loader2, TrendingUp, Users, BookOpen, Award } from "lucide-react";

interface AnalyticsData {
  userGrowth: {
    labels: string[];
    data: number[];
  };
  classParticipation: {
    labels: string[];
    data: number[];
  };
  achievementDistribution: {
    labels: string[];
    data: number[];
  };
  userActivity: {
    labels: string[];
    data: number[];
  };
}

interface UserMetrics {
  totalUsers: number;
  activeUsers: number;
  newUsersThisWeek: number;
  userRetentionRate: number;
}

interface ClassMetrics {
  totalClasses: number;
  averageAttendance: number;
  completionRate: number;
  studentSatisfaction: number;
}

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    userGrowth: { labels: [], data: [] },
    classParticipation: { labels: [], data: [] },
    achievementDistribution: { labels: [], data: [] },
    userActivity: { labels: [], data: [] },
  });
  const [userMetrics, setUserMetrics] = useState<UserMetrics>({
    totalUsers: 0,
    activeUsers: 0,
    newUsersThisWeek: 0,
    userRetentionRate: 0,
  });
  const [classMetrics, setClassMetrics] = useState<ClassMetrics>({
    totalClasses: 0,
    averageAttendance: 0,
    completionRate: 0,
    studentSatisfaction: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch user growth data
        const usersRef = collection(db, "users");
        const userSnapshot = await getDocs(usersRef);
        
        // Fetch class participation data
        const classesRef = collection(db, "classes");
        const classSnapshot = await getDocs(
          query(classesRef, orderBy("startTime", "desc"))
        );

        // Fetch achievement data
        const achievementsRef = collection(db, "achievements");
        await getDocs(achievementsRef); // We'll use this in the future for actual achievement data

        // Calculate metrics
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const users = userSnapshot.docs.map(doc => ({
          ...doc.data(),
          createdAt: doc.data().metadata?.creationTime,
          lastLogin: doc.data().metadata?.lastSignInTime,
        }));

        const newUsers = users.filter(user => 
          new Date(user.createdAt) > weekAgo
        ).length;

        const activeUsers = users.filter(user =>
          new Date(user.lastLogin) > weekAgo
        ).length;

        const retentionRate = (activeUsers / users.length) * 100;

        // Update user metrics
        setUserMetrics({
          totalUsers: users.length,
          activeUsers,
          newUsersThisWeek: newUsers,
          userRetentionRate: Math.round(retentionRate),
        });

        // Update class metrics
        const classes = classSnapshot.docs.map(doc => doc.data());
        setClassMetrics({
          totalClasses: classes.length,
          averageAttendance: Math.round(
            classes.reduce((acc, curr) => acc + (curr.studentCount || 0), 0) / classes.length
          ),
          completionRate: Math.round(
            (classes.filter(c => c.status === "completed").length / classes.length) * 100
          ),
          studentSatisfaction: 92, // Placeholder - implement actual satisfaction tracking
        });

        // Update analytics data
        setAnalyticsData({
          userGrowth: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            data: [65, 72, 86, 95, 102, 116, 125],
          },
          classParticipation: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            data: [75, 82, 88, 95],
          },
          achievementDistribution: {
            labels: ["Bronze", "Silver", "Gold", "Platinum"],
            data: [45, 30, 15, 10],
          },
          userActivity: {
            labels: ["0-2h", "2-4h", "4-6h", "6-8h", "8+ h"],
            data: [20, 35, 25, 15, 5],
          },
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

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
        <h1 className="text-3xl font-orbitron font-bold text-primary">Analytics Dashboard</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">User Growth</CardTitle>
            <TrendingUp className={userMetrics.newUsersThisWeek > 0 ? "text-green-500" : "text-red-500"} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userMetrics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {userMetrics.newUsersThisWeek} new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userMetrics.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {userMetrics.userRetentionRate}% retention rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Class Completion</CardTitle>
            <BookOpen className="text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classMetrics.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {classMetrics.totalClasses} total classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Student Satisfaction</CardTitle>
            <Award className="text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classMetrics.studentSatisfaction}%</div>
            <p className="text-xs text-muted-foreground">
              Based on {classMetrics.averageAttendance} avg. attendance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  labels={analyticsData.userGrowth.labels}
                  data={analyticsData.userGrowth.data}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Class Participation</CardTitle>
                <CardDescription>Average attendance rate</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  labels={analyticsData.classParticipation.labels}
                  data={analyticsData.classParticipation.data}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Distribution</CardTitle>
              <CardDescription>Daily active time per user</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                labels={analyticsData.userActivity.labels}
                data={analyticsData.userActivity.data}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Performance Metrics</CardTitle>
              <CardDescription>Completion rates and attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                labels={analyticsData.classParticipation.labels}
                data={analyticsData.classParticipation.data}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Distribution</CardTitle>
              <CardDescription>Achievement levels across users</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart
                labels={analyticsData.achievementDistribution.labels}
                data={analyticsData.achievementDistribution.data}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
