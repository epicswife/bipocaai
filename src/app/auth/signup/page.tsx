"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { UserRole } from "@/lib/types";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Preselect role from query param
  useEffect(() => {
    const roleParam = searchParams.get("role") as UserRole;
    if (roleParam && ["student", "teacher", "parent", "admin", "counselor", "social_worker", "homeschool"].includes(roleParam)) {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock invite-only validation (replace with real logic later)
    if (inviteCode !== "bipoca2025") {
      toast.error("Invalid invite code. Please use a valid invite code to sign up.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update Firebase user profile with name
      await updateProfile(firebaseUser, { displayName: name });

      // Save user data to Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), {
        name,
        role,
        email,
      });

      toast.success("Account created successfully!");
      router.push("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-md mx-auto">
      <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-black dark:text-white mb-8 text-center">
        Sign Up
      </h1>
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="text-black dark:text-white">Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 border-teal-300 dark:border-cyan-600"
            required
          />
        </div>
        <div>
          <label className="text-black dark:text-white">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 border-teal-300 dark:border-cyan-600"
            required
          />
        </div>
        <div>
          <label className="text-black dark:text-white">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 border-teal-300 dark:border-cyan-600"
            required
          />
        </div>
        <div>
          <label className="text-black dark:text-white">Role</label>
          <Select onValueChange={(value: UserRole) => setRole(value)} value={role}>
            <SelectTrigger className="mt-1 border-teal-300 dark:border-cyan-600">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="parent">Parent</SelectItem>
              <SelectItem value="admin">District Admin</SelectItem>
              <SelectItem value="counselor">Counselor</SelectItem>
              <SelectItem value="social_worker">Social Worker</SelectItem>
              <SelectItem value="homeschool">Homeschool</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-black dark:text-white">Invite Code</label>
          <Input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="mt-1 border-teal-300 dark:border-cyan-600"
            required
          />
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            Use code: <strong>bipoca2025</strong>
          </p>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}