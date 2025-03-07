"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProfileRedirectPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Redirect to the role-specific profile page
      router.push(`/dashboard/${user.role.toLowerCase()}/profile`);
    } else if (!loading && !user) {
      // If not logged in, redirect to login
      router.push('/login');
    }
  }, [user, loading, router]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Redirecting to your profile...</p>
    </div>
  );
}