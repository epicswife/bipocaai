"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TeacherSidebar from "./components/TeacherSidebar";

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role="teacher" sidebar={<TeacherSidebar />}>
      {children}
    </DashboardLayout>
  );
}
