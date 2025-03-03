"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

export default function ProfilesPage() {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    if (!user || !auth.currentUser) return;

    try {
      // Update Firebase user profile
      await updateProfile(auth.currentUser, { displayName: name });

      // Update Firestore user document
      await updateDoc(doc(db, "users", auth.currentUser.uid), { name });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error updating profile";
      toast.error(errorMessage);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Redirect to login if not authenticated
  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  // Show loading state
  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <Card className="bg-white dark:bg-gray-700 border-purple-400 dark:border-blue-400 shadow-glow">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-orbitron font-bold text-black dark:text-white">
            Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-black dark:text-white">Name</label>
                <Input
                  value={name}
                  onChange={handleNameChange}
                  className="mt-1 border-teal-300 dark:border-cyan-600"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-amber-400 text-black hover:bg-gold-300 dark:bg-amber-600 dark:hover:bg-gold-500">
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-orange-400">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-black dark:text-white"><strong>Name:</strong> {user?.name}</p>
              <p className="text-black dark:text-white"><strong>Role:</strong> {user?.role}</p>
              <p className="text-black dark:text-white"><strong>Email:</strong> {user?.email}</p>
              <Button 
                onClick={() => { 
                  setIsEditing(true); 
                  if (user) setName(user.name); 
                }} 
                className="bg-green-300 text-black hover:bg-yellow-300 dark:bg-green-300 dark:hover:bg-yellow-300"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}