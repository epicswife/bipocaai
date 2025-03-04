"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ModeToggle } from "./mode-toggle";

// Define types for navigation items
interface NavLink {
  href: string;
  label: string;
  variant?: "ghost" | "default";
}

interface NavAction {
  href: string;
  label: string;
  onClick: () => Promise<void>;
  variant: "ghost" | "default";
}

type NavItem = NavLink | NavAction;

// Type guard to check if the item is a NavAction (has onClick)
const isNavAction = (item: NavItem): item is NavAction => {
  return "onClick" in item;
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
      router.push("/login");
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
        { href: "/about", label: "About" },
        { href: "/courses", label: "Courses" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "#", label: "Sign Out", onClick: handleSignOut, variant: "ghost" },
      ]
    : [
        { href: "/about", label: "About" },
        { href: "/courses", label: "Courses" },
        { href: "/login", label: "Log In", variant: "ghost" },
        { href: "/signup", label: "Sign Up", variant: "default" },
      ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b glassmorphism dark:glassmorphism high-contrast:glassmorphism visionease:glassmorphism">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="text-xl font-orbitron font-bold text-foreground">BIPOCA AI</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant={item.variant || "ghost"}
              onClick={isNavAction(item) ? item.onClick : undefined}
              asChild={!isNavAction(item)}
              className={`text-base ${
                item.variant === "default"
                  ? "bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground"
                  : "text-foreground"
              }`}
            >
              {isNavAction(item) ? (
                <span>{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </Button>
          ))}
          <ModeToggle />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <SheetClose asChild key={index}>
                  <Button
                    variant={item.variant || "ghost"}
                    onClick={isNavAction(item) ? item.onClick : undefined}
                    asChild={!isNavAction(item)}
                    className={`w-full justify-start text-base ${
                      item.variant === "default"
                        ? "bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary visionease:bg-primary visionease:hover:bg-secondary high-contrast:bg-primary high-contrast:hover:bg-primary text-primary-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {isNavAction(item) ? (
                      <span>{item.label}</span>
                    ) : (
                      <Link href={item.href}>{item.label}</Link>
                    )}
                  </Button>
                </SheetClose>
              ))}
              <ModeToggle />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}