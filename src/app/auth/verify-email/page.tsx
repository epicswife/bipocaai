"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle, MailCheck, RefreshCw, ArrowLeft } from "lucide-react";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  
  const updateUserVerificationStatus = useCallback(async (uid: string) => {
    try {
      await updateDoc(doc(db, "users", uid), {
        isVerified: true
      });
      
      // Get user role from Firestore or use default
      const userRole = user?.role || "student"; // Default to student if role not found
      
      toast.success("Email verified successfully!");
      router.push(`/dashboard/${userRole}`);
    } catch (error) {
      console.error("Error updating verification status:", error);
    }
  }, [user, router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (!currentUser) {
        // If no user is logged in, redirect to login
        router.push("/auth/login");
      } else if (currentUser.emailVerified) {
        // If email is already verified, update Firestore and redirect to dashboard
        updateUserVerificationStatus(currentUser.uid);
      }
    });
    
    return () => unsubscribe();
  }, [router, updateUserVerificationStatus]);



  const handleResendVerification = async () => {
    if (!user) return;
    
    try {
      await sendEmailVerification(user);
      toast.success("Verification email sent!");
      
      // Disable resend button for 60 seconds
      setResendDisabled(true);
      setCountdown(60);
      
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send verification email";
      toast.error(errorMessage);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    
    // Reload the current user to check if email has been verified
    auth.currentUser?.reload()
      .then(() => {
        setUser(auth.currentUser);
        
        if (auth.currentUser?.emailVerified) {
          updateUserVerificationStatus(auth.currentUser.uid);
        } else {
          toast.info("Email not verified yet. Please check your inbox.");
        }
      })
      .catch((error) => {
        console.error("Error refreshing user:", error);
        toast.error("Failed to refresh verification status");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-secondary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan">
        <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-orbitron font-bold text-foreground">Session Expired</CardTitle>
            <CardDescription className="text-muted-foreground">
              Please log in to verify your email
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/auth/login">
              <Button className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-3xl font-orbitron font-bold text-foreground">Email Verified!</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your email has been successfully verified
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-foreground">
                You can now access all features of BIPOCA AI.
              </p>
              <Link href="/dashboard">
                <Button className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground">
                  Go to Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card border-primary dark:border-secondary shadow-glow glassmorphism">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 dark:bg-secondary/20 flex items-center justify-center mb-4">
              <MailCheck className="h-10 w-10 text-primary dark:text-secondary" />
            </div>
            <CardTitle className="text-3xl font-orbitron font-bold text-foreground">Verify Your Email</CardTitle>
            <CardDescription className="text-muted-foreground">
              We&apos;ve sent a verification email to {user.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-foreground">
              <p className="mb-2">Please check your inbox and click the verification link to continue.</p>
              <p className="text-sm text-muted-foreground">
                If you don&apos;t see the email, check your spam folder.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleRefresh}
                className="bg-secondary hover:bg-primary dark:bg-primary dark:hover:bg-secondary text-secondary-foreground"
                disabled={loading}
              >
                <RefreshCw className={`mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh Status</span>
              </Button>
              
              <Button
                onClick={handleResendVerification}
                variant="outline"
                className="border-primary dark:border-secondary text-foreground"
                disabled={resendDisabled}
              >
                {resendDisabled ? (
                  <span>Resend in {countdown}s</span>
                ) : (
                  <>
                    <MailCheck className="mr-2 h-5 w-5" />
                    <span>Resend Email</span>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <Link 
                href="/auth/login" 
                className="text-primary hover:text-secondary dark:text-secondary dark:hover:text-primary transition-colors font-semibold flex items-center justify-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
