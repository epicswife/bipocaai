"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { KeyRound, ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      toast.success("Password reset email sent!");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send reset email";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
            <CardTitle className="text-3xl font-orbitron font-bold text-foreground">Reset Password</CardTitle>
            <CardDescription className="text-muted-foreground">
              {emailSent 
                ? "Check your email for reset instructions" 
                : "Enter your email to receive a password reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {emailSent ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 dark:bg-secondary/20 flex items-center justify-center">
                    <KeyRound className="h-8 w-8 text-primary dark:text-secondary" />
                  </div>
                </div>
                <p className="text-foreground">
                  We&apos;ve sent a password reset link to <span className="font-semibold">{email}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  If you don&apos;t see it in your inbox, please check your spam folder
                </p>
                <Button
                  onClick={() => setEmailSent(false)}
                  variant="outline"
                  className="mt-4"
                >
                  Try another email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="bg-background text-foreground border-border"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <KeyRound className="mr-2 h-5 w-5" />
                      <span>Send Reset Link</span>
                    </div>
                  )}
                </Button>
              </form>
            )}
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
