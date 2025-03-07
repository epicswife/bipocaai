"use client";

import { useAuth } from "@/context/AuthContext";
import { hasAccess } from "@/lib/permissions";
import { FeatureId } from "@/lib/permissions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredFeature: FeatureId;
  fallbackPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredFeature,
  fallbackPath = "/dashboard" 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user && !hasAccess(user.role, requiredFeature)) {
        router.push(fallbackPath);
      } else {
        setAuthorized(true);
      }
    }
  }, [user, loading, requiredFeature, router, fallbackPath]);

  // Show loading state
  if (loading || authorized === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show unauthorized message (this should not be visible as we redirect)
  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-center mb-6">
          You don&apos;t have permission to access this page.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Show the protected content
  return <>{children}</>;
}
