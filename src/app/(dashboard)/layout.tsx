'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Fixed import path
import Link from "next/link";
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState<string>("student"); // Default role
  const [roleLoading, setRoleLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login page if user is not authenticated
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch user role from Firestore when user is available
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role || "student");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        } finally {
          setRoleLoading(false);
        }
      }
    };

    if (user) {
      fetchUserRole();
    } else {
      setRoleLoading(false);
    }
  }, [user]);

  if (loading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  const sidebarLinks = [
    { href: "/dashboard", label: "Overview" },
    ...(userRole === "student" ? [
      { href: "/dashboard/courses", label: "My Courses" },
      { href: "/legacy", label: "Legacy" } // Updated path to the legacy section
    ] : []),
    ...(userRole === "teacher" ? [
      { href: "/teacher/dashboard", label: "Teach" },
      { href: "/teacher/quiz-creation", label: "Create Quiz" },
      { href: "/teacher/ai-planning", label: "AI Planning" },
    ] : []),
    ...(userRole === "parent" ? [
      { href: "/homeschool/dashboard", label: "Homeschool" },
      { href: "/iep-meetings", label: "IEP & Meetings" },
    ] : []),
    ...(userRole === "admin" ? [
      { href: "/districts/dashboard", label: "District Analytics" },
      { href: "/districts/field-trips", label: "Field Trips" },
    ] : []),
    ...(userRole === "counselor" || userRole === "social_worker" ? [
      { href: "/mental-health/counselor", label: "Support" },
    ] : []),
  ];

  return (
    <div className="dashboard-layout">
      <div className="dashboard-sidebar">
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
}