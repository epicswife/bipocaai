"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ParentSidebar from "./components/ParentSidebar";

export default function ParentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role="parent" sidebar={<ParentSidebar />}>
      {children}
    </DashboardLayout>
  );
}
