"use client";

import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!user) return <div className="text-center py-12">Please log in to view your profile.</div>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-orbitron font-bold text-black dark:text-white mb-8">Your Profile</h1>
      <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-glow">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
          <Input value={user.email || ""} readOnly className="mt-1 bg-gray-100 dark:bg-gray-600" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Role</label>
          <Input value="Student" readOnly className="mt-1 bg-gray-100 dark:bg-gray-600" /> {/* Mock role */}
        </div>
        <Button className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
          Save Changes
        </Button>
      </div>
    </div>
  );
}