"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  X,
  Shield,
  BarChart,
  Bell,
  UserCog,
  School,
  BookOpen,
  FileText,
  Users,
  Award,
  Target,
  Activity,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { AuthUser } from "@/types/auth";

type MenuItem = {
  title: string;
  icon: React.ElementType;
  path: string;
  color?: string;
}

type SidebarProps = {
  user: AuthUser | null;
};

type MenuCategories = {
  overview: MenuItem[];
  management: MenuItem[];
  monitoring: MenuItem[];
  content: MenuItem[];
  dashboards: MenuItem[];
  settings: MenuItem[];
};

type CategoryLabels = {
  overview: string;
  management: string;
  monitoring: string;
  content: string;
  dashboards: string;
  settings: string;
};

export default function AdminSidebar({ user: propUser }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const user = propUser;

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setExpanded(!isMobileView);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setExpanded(prev => !prev);
  const closeSidebar = () => setExpanded(false);

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isMobile) {
      closeSidebar();
    }
    
    router.push(path);
  };

  const menuCategories: MenuCategories = {
    overview: [
      { title: "Admin Dashboard", icon: BarChart, path: "/dashboard/admin", color: "text-sidebar-primary" },
      { title: "Analytics", icon: Target, path: "/dashboard/admin/analytics", color: "text-sidebar-accent" },
      { title: "System Status", icon: Activity, path: "/dashboard/admin/status", color: "text-gold-300" },
    ],
    management: [
      { title: "User Management", icon: Users, path: "/dashboard/admin/users", color: "text-cyan-400" },
      { title: "Role Control", icon: Shield, path: "/dashboard/admin/roles", color: "text-red-400" },
      { title: "System Config", icon: Settings, path: "/dashboard/admin/config", color: "text-sidebar-primary" },
    ],
    dashboards: [
      { title: "Teacher Dashboard", icon: School, path: "/dashboard/teacher", color: "text-sidebar-primary" },
      { title: "Parent Dashboard", icon: Users, path: "/dashboard/parent", color: "text-sidebar-accent" },
      { title: "Student Dashboard", icon: BookOpen, path: "/dashboard/student", color: "text-gold-300" },
      { title: "Counselor Dashboard", icon: MessageSquare, path: "/dashboard/counselor", color: "text-cyan-400" },
    ],
    monitoring: [
      { title: "Live Classes", icon: BookOpen, path: "/dashboard/admin/live-classes", color: "text-gold-300" },
      { title: "User Activity", icon: Activity, path: "/dashboard/admin/activity", color: "text-cyan-400" },
      { title: "System Logs", icon: FileText, path: "/dashboard/admin/logs", color: "text-sidebar-primary" },
    ],
    content: [
      { title: "Classes", icon: School, path: "/dashboard/admin/classes", color: "text-sidebar-primary" },
      { title: "Assignments", icon: FileText, path: "/dashboard/admin/assignments", color: "text-sidebar-accent" },
      { title: "Achievements", icon: Award, path: "/dashboard/admin/achievements", color: "text-gold-300" },
    ],
    settings: [
      { title: "Admin Settings", icon: Settings, path: "/dashboard/admin/settings", color: "text-sidebar-accent" },
      { title: "Profile", icon: UserCog, path: "/dashboard/admin/profile", color: "text-gold-300" },
      { title: "Notifications", icon: Bell, path: "/dashboard/admin/notifications", color: "text-cyan-400" },
    ],
  };

  const categoryLabels: CategoryLabels = {
    overview: "System Overview",
    management: "System Management",
    dashboards: "All Dashboards",
    monitoring: "Monitoring",
    content: "Content Management",
    settings: "Settings",
  };

  return (
    <>
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={closeSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      {isMobile && !expanded && (
        <button
          onClick={toggleSidebar}
          className="fixed top-20 left-4 z-50 p-3 rounded-full bg-gold-300 text-foreground shadow-lg shadow-gold-300/20"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      )}

      <div
        className={cn(
          isMobile ? "fixed inset-y-0 left-0 z-40" : "relative h-screen",
          "bg-background border-r border-border",
          "transition-all duration-300 ease-in-out",
          "flex flex-col overflow-hidden",
          expanded ? (isMobile ? "w-[85vw]" : "w-64") : (isMobile ? "-translate-x-full" : "w-[70px]")
        )}
      >
        {isMobile && expanded && (
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 z-[60] p-2 rounded-full bg-gold-300 text-foreground shadow-md"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}

        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={cn(
              "absolute top-8 rounded-full p-1.5",
              expanded ? "-right-3" : "right-0 -translate-x-1/2",
              "bg-cyan-400/10 hover:bg-cyan-400/20",
              "text-foreground/60 hover:text-foreground",
              "transition-all duration-200 shadow-md z-50"
            )}
            aria-label="Toggle sidebar"
          >
            {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        )}

        <div className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
          {(Object.keys(menuCategories) as Array<keyof MenuCategories>).map((category) => (
            <div key={category} className="flex flex-col gap-1">
              {expanded && (
                <h2 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mt-2 mb-1">
                  {categoryLabels[category]}
                </h2>
              )}
              {menuCategories[category].map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleNavigation(e, item.path)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
                      "hover:bg-accent/10",
                      isActive ? "bg-accent/20" : "transparent",
                      !expanded && "justify-center"
                    )}
                  >
                    <item.icon
                      size={20}
                      className={cn(
                        item.color || "text-foreground/60",
                        isActive && "text-accent-foreground"
                      )}
                    />
                    {expanded && (
                      <span
                        className={cn(
                          "text-sm",
                          isActive ? "text-accent-foreground" : "text-foreground/60"
                        )}
                      >
                        {item.title}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {expanded && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={user?.photoURL || undefined} />
                <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.displayName || user?.email}</p>
                <p className="text-xs text-foreground/60 truncate">Administrator</p>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors w-full"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
