"use client";

import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, BookOpen, Users, Building2, Heart, Lightbulb } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define types for navigation items
interface NavLinkChild {
  href: string;
  label: string;
  children?: NavLinkChild[];
  icon?: React.ReactNode;
}

interface NavLink {
  href: string;
  label: string;
  variant?: "ghost" | "default";
  icon?: React.ReactNode;
  children?: NavLinkChild[];
  highlight?: boolean;
}

interface NavAction {
  href: string;
  label: string;
  onClick: () => Promise<void>;
  variant: "ghost" | "default";
  icon?: React.ReactNode;
  highlight?: boolean;
}

type NavItem = NavLink | NavAction;

// Type guard to check if the item is a NavAction (has onClick)
const isNavAction = (item: NavItem): item is NavAction => {
  return "onClick" in item;
};

// Type guard to check if the item has children (dropdown)
const hasChildren = (item: NavLink): boolean => {
  return "children" in item && Array.isArray(item.children) && item.children.length > 0;
};

// Type guard to check if a child item has children (nested dropdown)
const hasNestedChildren = (item: NavLinkChild): boolean => {
  return item && "children" in item && Array.isArray(item.children) && item.children.length > 0;
};

// Type guard to check if the item is a NavLink (doesn't have onClick)
const isNavLink = (item: NavItem): item is NavLink => {
  return !isNavAction(item);
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully!");
      router.push("/auth/login");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error signing out";
      toast.error(errorMessage);
    }
  };

  if (!isMounted) {
    // Render a placeholder during SSR
    return (
      <nav className="sticky top-0 z-50 w-full border-b glassmorphism">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span className="text-xl font-orbitron font-bold text-foreground">BIPOCA AI</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" disabled>
              About
            </Button>
            <Button variant="ghost" disabled>
              Courses
            </Button>
            <Button variant="ghost" disabled>
              Log In
            </Button>
            <Button variant="default" disabled>
              Sign Up
            </Button>
          </div>
        </div>
      </nav>
    );
  }

  const navItems: NavItem[] = user
    ? [
        { 
          href: "/about", 
          label: "About", 
          icon: <Users className="h-4 w-4 mr-2" />,
          children: [
            { href: "/about", label: "Our Mission" },
            { href: "/about/team", label: "Leadership Team" },
            { href: "/about/approach", label: "Educational Approach" },
            { href: "/about/technology", label: "Our Technology" },
            { href: "/about/partners", label: "Partners & Investors" },
            { href: "/about/careers", label: "Careers" },
            { href: "/about/press", label: "Press & Media" },
            { href: "/about/contact", label: "Contact Us" },
          ]
        },
        { 
          href: "/courses", 
          label: "Education", 
          icon: <BookOpen className="h-4 w-4 mr-2" />,
          children: [
            { href: "/courses", label: "All Courses" },
            { href: "/courses/featured", label: "Featured Courses" },
            { href: "/courses/my-courses", label: "My Courses" },
            { href: "/courses/certificates", label: "Certificates" },
          ]
        },
        { 
          href: "/learn-more", 
          label: "Learn More", 
          icon: <Lightbulb className="h-4 w-4 mr-2" />,
          highlight: true,
          children: [
            { href: "/learn-more/overview", label: "Overview" },
            { 
              href: "/learn-more/homeschool", 
              label: "Homeschool",
              children: [
                { href: "/learn-more/homeschool/curriculum", label: "Curriculum" },
                { href: "/learn-more/homeschool/features", label: "Features" },
                { href: "/learn-more/homeschool/parent-dashboard", label: "Parent Dashboard" },
                { href: "/learn-more/homeschool/student-experience", label: "Student Experience" },
                { href: "/learn-more/homeschool/ai-planning", label: "AI Lesson Planning" },
                { href: "/learn-more/homeschool/success-stories", label: "Success Stories" },
              ]
            },
            { 
              href: "/learn-more/teachers", 
              label: "For Teachers",
              children: [
                { href: "/learn-more/teachers/classroom-tools", label: "Classroom Tools" },
                { href: "/learn-more/teachers/curriculum-builder", label: "Curriculum Builder" },
                { href: "/learn-more/teachers/assessment-tools", label: "Assessment Tools" },
                { href: "/learn-more/teachers/professional-development", label: "Professional Development" },
                { href: "/learn-more/teachers/community", label: "Teacher Community" },
              ]
            },
            { 
              href: "/learn-more/students", 
              label: "For Students",
              children: [
                { href: "/learn-more/students/learning-paths", label: "Learning Paths" },
                { href: "/learn-more/students/interactive-courses", label: "Interactive Courses" },
                { href: "/learn-more/students/mentorship", label: "Mentorship" },
                { href: "/learn-more/students/certifications", label: "Certifications" },
                { href: "/learn-more/students/community", label: "Student Community" },
              ]
            },
            { 
              href: "/learn-more/parents", 
              label: "For Parents",
              children: [
                { href: "/learn-more/parents/progress-tracking", label: "Progress Tracking" },
                { href: "/learn-more/parents/curriculum-overview", label: "Curriculum Overview" },
                { href: "/learn-more/parents/support-resources", label: "Support Resources" },
                { href: "/learn-more/parents/family-plans", label: "Family Plans" },
              ]
            },
            { 
              href: "/learn-more/institutions", 
              label: "For Institutions",
              children: [
                { href: "/learn-more/institutions/school-integration", label: "School Integration" },
                { href: "/learn-more/institutions/district-solutions", label: "District Solutions" },
                { href: "/learn-more/institutions/higher-education", label: "Higher Education" },
                { href: "/learn-more/institutions/enterprise", label: "Enterprise Solutions" },
                { href: "/learn-more/institutions/case-studies", label: "Case Studies" },
              ]
            },
            { href: "/learn-more/community", label: "Community" },
            { href: "/learn-more/pricing", label: "Pricing & Plans" },
          ]
        },
        { 
          href: "/mental-health", 
          label: "Mental Health", 
          icon: <Heart className="h-4 w-4 mr-2" />,
          children: [
            { href: "/mental-health", label: "Resources" },
            { href: "/mental-health/journal", label: "Journal" },
            { href: "/mental-health/exercises", label: "Exercises" },
            { href: "/mental-health/support", label: "Support" },
          ]
        },
        { href: "/dashboard", label: "Dashboard", icon: <Building2 className="h-4 w-4 mr-2" /> },
        { href: "#", label: "Sign Out", onClick: handleSignOut, variant: "ghost" },
      ]
    : [
        { 
          href: "/about", 
          label: "About", 
          icon: <Users className="h-4 w-4 mr-2" />,
          children: [
            { href: "/about", label: "Our Mission" },
            { href: "/about/team", label: "Leadership Team" },
            { href: "/about/approach", label: "Educational Approach" },
            { href: "/about/technology", label: "Our Technology" },
            { href: "/about/partners", label: "Partners & Investors" },
            { href: "/about/careers", label: "Careers" },
            { href: "/about/press", label: "Press & Media" },
            { href: "/about/contact", label: "Contact Us" },
          ]
        },
        { 
          href: "/courses", 
          label: "Education", 
          icon: <BookOpen className="h-4 w-4 mr-2" />,
          children: [
            { href: "/courses", label: "All Courses" },
            { href: "/courses/featured", label: "Featured Courses" },
            { href: "/courses/k12", label: "K-12 Programs" },
            { href: "/courses/stem", label: "STEM Excellence" },
            { href: "/courses/arts", label: "Arts & Humanities" },
            { href: "/courses/languages", label: "Language Learning" },
            { href: "/courses/certificates", label: "Certification Tracks" },
            { href: "/courses/educators", label: "For Educators" },
          ]
        },
        { 
          href: "/learn-more", 
          label: "Learn More", 
          icon: <Lightbulb className="h-4 w-4 mr-2" />,
          highlight: true,
          children: [
            { href: "/learn-more/overview", label: "Overview" },
            { 
              href: "/learn-more/homeschool", 
              label: "Homeschool",
              children: [
                { href: "/learn-more/homeschool/curriculum", label: "Curriculum" },
                { href: "/learn-more/homeschool/features", label: "Features" },
                { href: "/learn-more/homeschool/parent-dashboard", label: "Parent Dashboard" },
                { href: "/learn-more/homeschool/student-experience", label: "Student Experience" },
                { href: "/learn-more/homeschool/ai-planning", label: "AI Lesson Planning" },
                { href: "/learn-more/homeschool/success-stories", label: "Success Stories" },
              ]
            },
            { 
              href: "/learn-more/teachers", 
              label: "For Teachers",
              children: [
                { href: "/learn-more/teachers/classroom-tools", label: "Classroom Tools" },
                { href: "/learn-more/teachers/curriculum-builder", label: "Curriculum Builder" },
                { href: "/learn-more/teachers/assessment-tools", label: "Assessment Tools" },
                { href: "/learn-more/teachers/professional-development", label: "Professional Development" },
                { href: "/learn-more/teachers/community", label: "Teacher Community" },
              ]
            },
            { 
              href: "/learn-more/students", 
              label: "For Students",
              children: [
                { href: "/learn-more/students/learning-paths", label: "Learning Paths" },
                { href: "/learn-more/students/interactive-courses", label: "Interactive Courses" },
                { href: "/learn-more/students/mentorship", label: "Mentorship" },
                { href: "/learn-more/students/certifications", label: "Certifications" },
                { href: "/learn-more/students/community", label: "Student Community" },
              ]
            },
            { 
              href: "/learn-more/parents", 
              label: "For Parents",
              children: [
                { href: "/learn-more/parents/progress-tracking", label: "Progress Tracking" },
                { href: "/learn-more/parents/curriculum-overview", label: "Curriculum Overview" },
                { href: "/learn-more/parents/support-resources", label: "Support Resources" },
                { href: "/learn-more/parents/family-plans", label: "Family Plans" },
              ]
            },
            { 
              href: "/learn-more/institutions", 
              label: "For Institutions",
              children: [
                { href: "/learn-more/institutions/school-integration", label: "School Integration" },
                { href: "/learn-more/institutions/district-solutions", label: "District Solutions" },
                { href: "/learn-more/institutions/higher-education", label: "Higher Education" },
                { href: "/learn-more/institutions/enterprise", label: "Enterprise Solutions" },
                { href: "/learn-more/institutions/case-studies", label: "Case Studies" },
              ]
            },
            { href: "/learn-more/community", label: "Community" },
            { href: "/learn-more/pricing", label: "Pricing & Plans" },
            { href: "/auth/signup", label: "Sign Up" },
          ]
        },
        { 
          href: "/mental-health", 
          label: "Mental Health", 
          icon: <Heart className="h-4 w-4 mr-2" />,
          children: [
            { href: "/mental-health", label: "Resources" },
            { href: "/mental-health/exercises", label: "Exercises" },
            { href: "/mental-health/assessment", label: "Self-Assessment Tools" },
            { href: "/mental-health/counseling", label: "Counseling Services" },
            { href: "/mental-health/mindfulness", label: "Mindfulness Programs" },
            { href: "/mental-health/parents", label: "For Parents" },
            { href: "/mental-health/educators", label: "For Educators" },
          ]
        },
        { href: "/auth/login", label: "Log In", variant: "ghost" },
        { href: "/auth/signup", label: "Sign Up", variant: "default", highlight: true },
      ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b shadow-sm glassmorphism dark:glassmorphism">
      {/* Pan-African color stripe at the top */}
      <div className="absolute h-1.5 bg-gradient-to-r from-[var(--color-pan-green)] via-[var(--color-pan-amber)] to-[var(--color-pan-red)] top-0 left-0 right-0 animate-gradient-x"></div>
      
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center space-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--color-pan-green)] to-[var(--color-pan-amber)] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-pan-green)] via-[var(--color-pan-amber)] to-[var(--color-pan-red)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <span className="text-lg font-bold text-white">B</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-orbitron font-bold text-foreground">BIPOCA AI</span>
            <span className="text-xs text-[var(--color-pan-amber)] dark:text-[var(--color-pan-amber)] font-medium">Education Reimagined</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item, index) => {
            if (isNavAction(item)) {
              return (
                <Button
                  key={index}
                  variant={item.variant || "ghost"}
                  onClick={item.onClick}
                  className={`text-base flex items-center transition-all duration-300 ${
                    item.variant === "default"
                      ? "bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-md hover:shadow-lg"
                      : "text-foreground hover:bg-[var(--color-pan-amber)]/10 dark:hover:bg-[var(--color-pan-amber)]/20"
                  } ${item.highlight ? "ring-2 ring-[var(--color-pan-amber)] dark:ring-[var(--color-pan-amber)] ring-offset-2 hover:ring-[var(--color-pan-green)] dark:hover:ring-[var(--color-pan-green)] hover:scale-105" : ""}`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Button>
              );
            } else if (isNavLink(item) && hasChildren(item)) {
              return (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant={item.variant || "ghost"} 
                      className="text-base flex items-center hover:bg-[var(--color-pan-amber)]/10 dark:hover:bg-[var(--color-pan-amber)]/20 transition-all duration-300 group"
                    >
                      {item.icon}
                      <span className="font-medium group-hover:text-[var(--color-pan-green)] dark:group-hover:text-[var(--color-pan-amber)] transition-colors duration-300">{item.label}</span>
                      <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:rotate-180 group-hover:text-[var(--color-pan-amber)] dark:group-hover:text-[var(--color-pan-green)]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-4 shadow-lg border border-[var(--color-pan-amber)]/20 rounded-lg backdrop-blur-sm">
                    <DropdownMenuLabel className="font-bold text-lg text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">{item.label}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-2 bg-gradient-to-r from-[var(--color-pan-green)] to-[var(--color-pan-amber)] h-0.5" />
                    <div className="grid grid-cols-1 gap-2">
                      {item.children?.map((child, childIndex) => (
                        hasNestedChildren(child) ? (
                          <div key={childIndex} className="relative group">
                            <DropdownMenuItem className="py-3 px-3 rounded-md hover:bg-[var(--color-pan-amber)]/10 dark:hover:bg-[var(--color-pan-amber)]/20 transition-all duration-200">
                              <div className="w-full flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                                    {child.icon ? (
                                      React.cloneElement(child.icon as React.ReactElement, { 
                                        className: "w-4 h-4 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" 
                                      } as React.HTMLAttributes<HTMLElement>)
                                    ) : (
                                      <div className="w-2 h-2 rounded-full bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] group-hover:scale-125 transition-transform duration-200"></div>
                                    )}
                                  </div>
                                  <span className="group-hover:text-[var(--color-pan-green)] dark:group-hover:text-[var(--color-pan-amber)] transition-colors duration-200 font-medium">{child.label}</span>
                                  {childIndex === 0 && <span className="ml-2 text-xs font-semibold bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/20 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] px-2 py-0.5 rounded-full">Popular</span>}
                                </div>
                                <ChevronDown className="h-3 w-3 ml-2 rotate-[-90deg] text-[var(--color-pan-amber)] dark:text-[var(--color-pan-green)]" />
                              </div>
                            </DropdownMenuItem>
                            <div className="absolute left-full top-0 invisible group-hover:visible min-w-[220px] bg-background border border-[var(--color-pan-amber)]/20 shadow-lg rounded-md p-2 -mt-3 ml-1 z-50">
                              {child.children?.map((nestedChild, nestedIndex) => (
                                <DropdownMenuItem key={nestedIndex} asChild className="py-2 px-3 rounded-md hover:bg-[var(--color-pan-amber)]/10 dark:hover:bg-[var(--color-pan-amber)]/20 transition-all duration-200">
                                  <Link href={nestedChild.href} className="w-full flex items-center group">
                                    <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] group-hover:scale-125 transition-transform duration-200"></div>
                                    </div>
                                    <span className="text-sm group-hover:text-[var(--color-pan-green)] dark:group-hover:text-[var(--color-pan-amber)] transition-colors duration-200">{nestedChild.label}</span>
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <DropdownMenuItem key={childIndex} asChild className="py-3 px-3 rounded-md hover:bg-[var(--color-pan-amber)]/10 dark:hover:bg-[var(--color-pan-amber)]/20 transition-all duration-200">
                            <Link href={child.href} className="w-full flex items-center group">
                              <div className="w-8 h-8 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                                <div className="w-2 h-2 rounded-full bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] group-hover:scale-125 transition-transform duration-200"></div>
                              </div>
                              <span className="group-hover:text-[var(--color-pan-green)] dark:group-hover:text-[var(--color-pan-amber)] transition-colors duration-200">{child.label}</span>
                              {childIndex === 0 && <span className="ml-2 text-xs font-semibold bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/20 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] px-2 py-0.5 rounded-full">Popular</span>}
                            </Link>
                          </DropdownMenuItem>
                        )
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            } else {
              return (
                <Button
                  key={index}
                  variant={item.variant || "ghost"}
                  asChild
                  className={`text-base flex items-center ${
                    item.variant === "default"
                      ? "bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  <Link href={item.href} className="flex items-center">
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            }
          })}
          <ModeToggle />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className="hover:bg-[var(--color-pan-amber)]/10 dark:hover:bg-[var(--color-pan-amber)]/20 transition-all duration-300">
              {isOpen ? <X className="size-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" /> : <Menu className="size-6 text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background overflow-y-auto max-h-screen border-l border-[var(--color-pan-amber)]/20 fixed" style={{ zIndex: 9999 }}>
            <div className="flex items-center justify-center mb-6 mt-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--color-pan-green)] to-[var(--color-pan-amber)] flex items-center justify-center shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-pan-green)] via-[var(--color-pan-amber)] to-[var(--color-pan-red)] opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
                <span className="text-xl font-bold text-white">B</span>
              </div>
              <div className="ml-3">
                <h2 className="text-xl font-orbitron font-bold">BIPOCA AI</h2>
                <p className="text-xs text-[var(--color-pan-amber)] font-medium">Education Reimagined</p>
              </div>
            </div>
            <div className="h-0.5 w-full bg-gradient-to-r from-[var(--color-pan-green)] via-[var(--color-pan-amber)] to-[var(--color-pan-red)] mb-6 animate-gradient-x"></div>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => {
                if (isNavAction(item)) {
                  return (
                    <SheetClose asChild key={index}>
                      <Button
                        variant={item.variant || "ghost"}
                        onClick={item.onClick}
                        className={`w-full justify-start text-base flex items-center transition-all duration-300 ${
                          item.variant === "default"
                            ? "bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-md hover:shadow-lg"
                            : "text-foreground hover:bg-[var(--color-pan-amber)]/10 dark:hover:bg-[var(--color-pan-amber)]/20"
                        } ${item.highlight ? "ring-2 ring-[var(--color-pan-amber)] dark:ring-[var(--color-pan-amber)]" : ""}`}
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </Button>
                    </SheetClose>
                  );
                } else if (isNavLink(item) && hasChildren(item)) {
                  return (
                    <div key={index} className="space-y-2 py-2">
                      <div className="px-4 py-2 font-medium flex items-center text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)] border-l-2 border-[var(--color-pan-green)] dark:border-[var(--color-pan-amber)] pl-3 ml-1 mb-2">
                        {item.icon}
                        <span className="font-semibold">{item.label}</span>
                      </div>
                      <div className="pl-4 border-l-2 border-[var(--color-pan-amber)] ml-4 space-y-1">
                        {item.children?.map((child, childIndex) => (
                          hasNestedChildren(child) ? (
                            <div key={childIndex} className="pl-2 space-y-1 mb-3">
                              <div className="px-2 py-1 font-medium flex items-center text-[var(--color-pan-green)] dark:text-[var(--color-pan-amber)]">
                                <div className="w-6 h-6 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-2">
                                  <div className="w-2 h-2 rounded-full bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)]"></div>
                                </div>
                                <span className="font-medium">{child.label}</span>
                              </div>
                              <div className="pl-4 border-l border-[var(--color-pan-amber)]/50 ml-1 space-y-1">
                                {child.children?.map((nestedChild: NavLinkChild, nestedIndex: number) => (
                                  <SheetClose asChild key={nestedIndex}>
                                    <Button
                                      variant="ghost"
                                      asChild
                                      className="w-full justify-start h-8 hover:bg-[var(--color-pan-amber)]/10 dark:hover:bg-[var(--color-pan-amber)]/20 transition-all duration-200 text-sm"
                                    >
                                      <Link href={nestedChild.href} className="flex items-center">
                                        <div className="w-5 h-5 rounded-full bg-[var(--color-pan-green)]/10 dark:bg-[var(--color-pan-amber)]/10 flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                                          <div className="w-1 h-1 rounded-full bg-[var(--color-pan-green)]/70 dark:bg-[var(--color-pan-amber)]/70 group-hover:scale-125 transition-transform duration-200"></div>
                                        </div>
                                        <span className="hover:text-[var(--color-pan-green)] dark:hover:text-[var(--color-pan-amber)] transition-colors duration-200">{nestedChild.label}</span>
                                      </Link>
                                    </Button>
                                  </SheetClose>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <SheetClose asChild key={childIndex}>
                              <Button
                                variant="ghost"
                                asChild
                                className="w-full justify-start h-9 hover:bg-[var(--color-pan-amber)]/10 dark:hover:bg-[var(--color-pan-amber)]/20 transition-all duration-200"
                              >
                                <Link href={child.href} className="flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-pan-green)] dark:bg-[var(--color-pan-amber)] mr-2"></div>
                                  <span className="hover:text-[var(--color-pan-green)] dark:hover:text-[var(--color-pan-amber)] transition-colors duration-200">{child.label}</span>
                                </Link>
                              </Button>
                            </SheetClose>
                          )
                        ))}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <SheetClose asChild key={index}>
                      <Button
                        variant={item.variant || "ghost"}
                        asChild
                        className={`w-full justify-start text-base flex items-center transition-all duration-300 ${
                          item.variant === "default"
                            ? "bg-[var(--color-pan-green)] hover:bg-[var(--color-pan-green)]/90 dark:bg-[var(--color-pan-amber)] dark:hover:bg-[var(--color-pan-amber)]/90 text-white shadow-md hover:shadow-lg"
                            : "text-foreground hover:bg-[var(--color-pan-amber)]/10 dark:hover:bg-[var(--color-pan-amber)]/20"
                        }`}
                      >
                        <Link href={item.href} className="flex items-center">
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </Button>
                    </SheetClose>
                  );
                }
              })}
              <div className="flex justify-center mt-6 mb-2">
                <ModeToggle />
              </div>
              <div className="text-center text-xs text-muted-foreground mt-4 pt-4 border-t border-[var(--color-pan-amber)]/20">
                <p>© 2025 BIPOCA AI</p>
                <p className="mt-1">Education Reimagined</p>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}