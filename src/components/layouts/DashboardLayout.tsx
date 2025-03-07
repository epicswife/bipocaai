"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "teacher" | "admin" | "counselor" | "parent";
  sidebar: React.ReactNode;
  allowFullAccess?: boolean;
}

export default function DashboardLayout({
  children,
  role,
  sidebar,
  allowFullAccess = false,
}: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Allow admin access to all dashboards if allowFullAccess is true
  if (!loading && (!user || (user.role !== role && !(allowFullAccess && user.role === "admin")))) {
    router.push("/login");
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {sidebar}
      <div className="flex-grow transition-all duration-300 ease-in-out">
        <motion.main
          className="min-h-screen overflow-x-hidden overflow-y-auto md:pl-0 pl-0 md:pt-0 pt-14 md:pb-0 pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
