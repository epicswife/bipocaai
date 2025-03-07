"use client";

import React, { useState, useEffect, JSX } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  Trophy,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  Brain,
  Target,
  GraduationCap,
  LineChart,
  Clock,
  Lightbulb,
  Rocket,
  History,
  X,
  UserCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type MenuItem = {
  title: string;
  icon: React.ElementType;
  path: string;
  color?: string;
};

type MenuCategories = {
  [key: string]: MenuItem[];
};

type CategoryLabels = {
  [key: string]: string;
};

export default function StudentSidebar(): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setExpanded(!isMobileView); // Expand on desktop, collapse on mobile
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setExpanded((prev) => {
      console.log("Toggling sidebar, new state:", !prev);
      return !prev;
    });
  };

  const closeSidebar = () => {
    console.log("Closing sidebar");
    setExpanded(false);
  };

  // Properly handle navigation with both Link and programmatic navigation as fallback
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault(); // Prevent default Link behavior
    e.stopPropagation(); // Stop event propagation
    
    if (isMobile) {
      closeSidebar();
    }
    
    // Use Next.js Router for programmatic navigation
    router.push(path);
  };

  const menuCategories: MenuCategories = {
    main: [
      { title: "My Learning Hub", icon: BookOpen, path: "/dashboard/student", color: "text-gold-300" },
      { title: "Live Classes", icon: Clock, path: "/dashboard/student/live-classes", color: "text-cyan-400" },
      { title: "Study Groups", icon: Users, path: "/dashboard/student/study-groups", color: "text-cyan-400" },
      { title: "Achievements", icon: Trophy, path: "/dashboard/student/achievements", color: "text-gold-300" },
    ],
    progress: [
      { title: "Progress Tracking", icon: LineChart, path: "/dashboard/student/progress", color: "text-cyan-400" },
      { title: "Goals & Targets", icon: Target, path: "/dashboard/student/goals", color: "text-sidebar-primary" },
    ],
    schedule: [
      { title: "Schedule", icon: Calendar, path: "/dashboard/student/schedule", color: "text-sidebar-accent" },
      { title: "Tutoring", icon: GraduationCap, path: "/dashboard/student/tutoring", color: "text-sidebar-primary" },
    ],
    learning: [
      { title: "Assignments", icon: BookOpen, path: "/dashboard/student/assignments", color: "text-gold-300" },
      { title: "Quizzes", icon: GraduationCap, path: "/dashboard/student/quizzes", color: "text-cyan-400" },
      { title: "Grades", icon: LineChart, path: "/dashboard/student/grades", color: "text-sidebar-primary" },
    ],
    communication: [
      { title: "Chat", icon: MessageSquare, path: "/dashboard/student/chat", color: "text-sidebar-accent" },
    ],
    aiFeatures: [
      { title: "AI Assistant", icon: Brain, path: "/dashboard/student/ai-assistant", color: "text-sidebar-primary" },
      { title: "Smart Study", icon: Lightbulb, path: "/dashboard/student/smart-study", color: "text-sidebar-accent" },
      { title: "Quick Learn", icon: Rocket, path: "/dashboard/student/quick-learn", color: "text-sidebar-primary" },
    ],
    legacy: [
      { title: "Legacy Content", icon: History, path: "/legacy", color: "text-sidebar-accent/80" },
    ],
  };

  const categoryLabels: CategoryLabels = {
    main: "Main",
    progress: "Progress & Goals",
    schedule: "Schedule & Tutoring",
    learning: "Learning",
    communication: "Communication",
    aiFeatures: "AI Features",
    legacy: "Legacy",
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={(e) => {
            e.stopPropagation();
            closeSidebar();
          }}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Mobile menu toggle button - only shown when sidebar is closed */}
      {isMobile && !expanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
          className="fixed top-20 left-4 z-50 p-3 rounded-full bg-gold-300 text-foreground shadow-lg shadow-gold-300/20"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          isMobile ? "fixed inset-y-0 left-0 z-40" : "relative h-screen",
          "bg-background border-r border-border",
          "transition-all duration-300 ease-in-out",
          "flex flex-col overflow-hidden",
          expanded ? (isMobile ? "w-[85vw]" : "w-64") : (isMobile ? "-translate-x-full" : "w-[70px]")
        )}
      >
        {/* Mobile close button */}
        {isMobile && expanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeSidebar();
            }}
            className="absolute top-4 right-4 z-[60] p-2 rounded-full bg-gold-300 text-foreground shadow-md"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}

        {/* Desktop toggle button */}
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

        {/* User Profile */}
        <div className="mb-8 mt-4 px-3 flex-shrink-0">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/default.png" />
              <AvatarFallback>{user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            {expanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold truncate">{user?.name}</h2>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-2 py-1">
          <div className="space-y-6 pb-20">
            {Object.entries(menuCategories).map(([category, items]) => (
              <div key={category} className="space-y-2">
                {expanded && (
                  <h3 className="text-xs uppercase text-foreground/60 font-semibold px-2 mb-2">
                    {categoryLabels[category]}
                  </h3>
                )}
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = 
                    item.path === "/dashboard/student" 
                      ? pathname === "/dashboard/student" || pathname === "/dashboard/student/"
                      : pathname.startsWith(item.path);
                
                  return (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      onClick={(e) => handleNavigation(e, item.path)}
                      className="block" // Ensure link takes full width
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start transition-colors",
                          isActive
                            ? "bg-sidebar-primary/10 text-sidebar-primary"
                            : "text-foreground/60 hover:text-sidebar-primary hover:bg-sidebar-accent/10",
                          !expanded && "px-2"
                        )}
                        type="button" // Ensure it doesn't submit forms
                      >
                        <Icon className={`h-5 w-5 ${item.color}`} />
                        {expanded && <span className="ml-3 text-sm">{item.title}</span>}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </nav>

        {/* Settings and Logout */}
        <div className="pt-4 mt-2 border-t border-border space-y-2 px-2 flex-shrink-0 mb-6">
          <Link 
            href="/dashboard/student/profile"
            onClick={(e) => handleNavigation(e, "/dashboard/student/profile")}
            className="block"
          >
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                "text-foreground/60 hover:text-gold-300 hover:bg-cyan-400/10",
                !expanded && "px-2"
              )}
              type="button"
            >
              <UserCircle className="h-5 w-5 text-foreground/60" />
              {expanded && <span className="ml-3 text-sm">My Profile</span>}
            </Button>
          </Link>
          
          <Link 
            href="/dashboard/student/settings"
            onClick={(e) => handleNavigation(e, "/dashboard/student/settings")}
            className="block"
          >
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                "text-foreground/60 hover:text-gold-300 hover:bg-cyan-400/10",
                !expanded && "px-2"
              )}
              type="button"
            >
              <Settings className="h-5 w-5 text-foreground/60" />
              {expanded && <span className="ml-3 text-sm">Settings</span>}
            </Button>
          </Link>
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              "text-foreground/60 hover:text-gold-300 hover:bg-cyan-400/10",
              !expanded && "px-2"
            )}
            onClick={() => {
              if (logout) logout();
              router.push('/login'); // Redirect to login after logout
            }}
            type="button"
          >
            <LogOut className="h-5 w-5 text-foreground/60" />
            {expanded && <span className="ml-3 text-sm">Logout</span>}
          </Button>
        </div>
      </div>
    </>
  );
}