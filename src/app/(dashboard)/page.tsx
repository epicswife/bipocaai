"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only run this effect when we have user data or know there's no user
    if (!loading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push("/login");
      } else {
        // Automatically redirect to role-specific dashboard
        if (user.role === "student") {
          router.push("/dashboard/student");
        } else if (user.role === "teacher") {
          router.push("/dashboard/teacher");
        } else if (user.role === "parent") {
          router.push("/dashboard/parent");
        } else if (user.role === "admin") {
          router.push("/dashboard/admin");
        } else if (user.role === "counselor" || user.role === "social_worker") {
          router.push("/dashboard/counselor");
        } else {
          // Default dashboard for unknown roles
          router.push("/dashboard/student");
        }
      }
    }
  }, [user, loading, router]);

  // Show loading state while redirecting
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}