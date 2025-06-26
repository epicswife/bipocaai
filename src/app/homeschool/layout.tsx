"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Brain, 
  FileQuestion, 
  Download, 
  UserCircle,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export default function HomeschoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"parent" | "student" | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
        
        // For demo purposes, let's determine role based on email
        // In a real app, you would fetch this from your user profile in Firestore
        if (currentUser.email?.includes("parent")) {
          setUserRole("parent");
        } else {
          setUserRole("student");
        }
        
        setLoading(false);
      } else {
        // Redirect to login if not authenticated
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Navigation items
  const navigationItems = [
    {
      name: "Dashboard",
      href: "/homeschool/dashboard",
      icon: BookOpen,
      roles: ["parent", "student"],
    },
    {
      name: "Courses",
      href: "/homeschool/courses",
      icon: GraduationCap,
      roles: ["parent", "student"],
    },
    {
      name: "Calendar",
      href: "/homeschool/calendar",
      icon: Calendar,
      roles: ["parent", "student"],
    },
    {
      name: "AI Planning",
      href: "/homeschool/ai-planning",
      icon: Brain,
      roles: ["parent"],
    },
    {
      name: "Quiz Creation",
      href: "/homeschool/quiz-creation",
      icon: FileQuestion,
      roles: ["parent"],
    },
    {
      name: "Lesson Import",
      href: "/homeschool/lesson-import",
      icon: Download,
      roles: ["parent"],
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = userRole
    ? navigationItems.filter((item) => item.roles.includes(userRole))
    : [];

  // Switch between parent and student views (for demo purposes)
  const toggleRole = () => {
    if (userRole === "parent") {
      setUserRole("student");
      toast.success("Switched to Student View");
    } else {
      setUserRole("parent");
      toast.success("Switched to Parent View");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading homeschool...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-muted/30 border-r border-primary/20 p-4 hidden md:block">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-orbitron font-bold">Homeschool</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleRole}
            className="text-xs"
          >
            <UserCircle className="w-4 h-4 mr-1" />
            {userRole === "parent" ? "Parent" : "Student"}
          </Button>
        </div>
        
        <nav className="space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-teal-500 text-white"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>
        
        <Separator className="my-6" />
        
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground mb-2">Logged in as:</p>
          <p className="text-sm font-medium truncate">{user?.displayName || user?.email}</p>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden w-full border-b border-primary/20 p-4 sticky top-0 bg-background z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-orbitron font-bold">Homeschool</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleRole}
          >
            <UserCircle className="w-4 h-4 mr-1" />
            {userRole === "parent" ? "Parent" : "Student"}
          </Button>
        </div>
        
        <Tabs defaultValue={pathname} className="w-full">
          <TabsList className="w-full bg-muted/20 overflow-x-auto flex-nowrap">
            {filteredNavItems.map((item) => (
              <TabsTrigger 
                key={item.href}
                value={item.href}
                className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                onClick={() => router.push(item.href)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
