"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-md mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
        Log In
      </h1>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="text-gray-900 dark:text-gray-100 font-medium block mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 border-teal-300 dark:border-cyan-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="text-gray-900 dark:text-gray-100 font-medium block mb-1">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 border-teal-300 dark:border-cyan-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-400 text-gray-900 hover:bg-gold-300 dark:bg-amber-400 dark:text-gray-900 dark:hover:bg-gold-300 font-medium"
        >
          {loading ? "Logging In..." : "Log In"}
        </Button>
      </form>
    </div>
  );
}