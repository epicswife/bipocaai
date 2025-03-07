"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CounselorSidebar from "./components/CounselorSidebar";

export default function CounselorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role="counselor" sidebar={<CounselorSidebar user={null} />}>
      {children}
    </DashboardLayout>
  );
}
