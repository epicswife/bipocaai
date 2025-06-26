"use client";

import { ReactNode } from "react";

interface MentalHealthLayoutProps {
  children: ReactNode;
}

export default function MentalHealthLayout({ children }: MentalHealthLayoutProps) {
  return (
    <div className="mental-health-layout">
      {children}
    </div>
  );
}
