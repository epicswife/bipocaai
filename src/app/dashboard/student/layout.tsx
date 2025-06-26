"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StudentSidebar from "./components/StudentSidebar";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role="student" sidebar={<StudentSidebar />}>
      {children}
    </DashboardLayout>
  );
}