"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminSidebar from "./components/AdminSidebar";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only check for admin role, as admins have full access
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Allow access if user is an admin
  if (!user || user.role !== "admin") {
    return null;
  }

  // Grant full access to all dashboard features
  return (
    <DashboardLayout 
      role="admin" 
      sidebar={<AdminSidebar user={user} />}
      allowFullAccess={true} // Enable access to all dashboard features
    >
      {children}
    </DashboardLayout>
  );
}
