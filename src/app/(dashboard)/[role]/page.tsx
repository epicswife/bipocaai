"use client";

import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile } from "@/types/user-profile";

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
  const [userProfile, setUserProfile] = useState<Partial<UserProfile> | null>(null);
  
  // Fetch user profile data from Firestore
  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as Partial<UserProfile>);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      
      fetchUserProfile();
    }
  }, [user]);
  const params = useParams();
  const router = useRouter();
  const role = params.role as UserRole;

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Please log in to view your dashboard.</div>;

  const dashboardContent: DashboardContent = {
    student: {
      title: "Student Dashboard",
      content: (
        <>
          <p className="text-muted-foreground">Welcome, student! Access your courses and track your progress.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary">Recent Activity</h3>
            <p className="text-muted-foreground">Completed: Black History 101 Quiz</p>
          </div>
        </>
      ),
    },
    teacher: {
      title: "Teacher Dashboard",
      content: (
        <>
          <p className="text-muted-foreground">Welcome, teacher! Manage your courses and lessons.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary">Actions</h3>
            <p className="text-muted-foreground">Create a new quiz or lesson plan.</p>
          </div>
        </>
      ),
    },
    parent: {
      title: "Parent Dashboard",
      content: (
        <>
          <p className="text-muted-foreground">Welcome, parent! Support your child&apos;s learning.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary">Child Progress</h3>
            <p className="text-muted-foreground">Your child completed 3 lessons this week.</p>
          </div>
        </>
      ),
    },
    admin: {
      title: "District Admin Dashboard",
      content: (
        <>
          <p className="text-muted-foreground">Welcome, administrator! Manage district resources and users.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary">District Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Active Users</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Total Students: 1,234</p>
                  <p>Total Teachers: 89</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">System Status</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>All systems operational</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ),
    },
    counselor: {
      title: "Counselor Dashboard",
      content: (
        <>
          <p className="text-muted-foreground">Welcome, counselor! Support student well-being.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary">Today&apos;s Schedule</h3>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Upcoming IEP Meetings</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>No meetings scheduled for today</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ),
    },
    social_worker: {
      title: "Social Worker Dashboard",
      content: (
        <>
          <p className="text-muted-foreground">Welcome! Access student support resources.</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary">Support Cases</h3>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary">Active Cases</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>No active cases</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ),
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-orbitron font-bold text-primary mb-8">{dashboardContent[role].title}</h1>
      
      {/* User Profile Card */}
      <Card className="border-primary/20 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <UserCircle className="mr-2 h-5 w-5" />
            My Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="font-medium">{userProfile?.name || user?.displayName || "User"}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="text-sm text-muted-foreground capitalize">Role: {user?.role}</p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0"
              onClick={() => router.push(`/dashboard/${role}/profile`)}
            >
              <Settings className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">{dashboardContent[role].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardContent[role].content}
        </CardContent>
      </Card>
    </div>
  );
}