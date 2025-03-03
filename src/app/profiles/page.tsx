"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/types";

export default function ProfilesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Mock user data; replace with Firebase fetch later
    setUser({ name: "Jane Doe", role: "student", email: "jane.doe@example.com" });
    setName("Jane Doe");
  }, []);

  const handleSave = () => {
    if (user) {
      setUser({ ...user, name });
      setIsEditing(false);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  if (!isMounted || !user) return null;

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
              <p className="text-black dark:text-white"><strong>Name:</strong> {user.name}</p>
              <p className="text-black dark:text-white"><strong>Role:</strong> {user.role}</p>
              <p className="text-black dark:text-white"><strong>Email:</strong> {user.email}</p>
              <Button onClick={() => setIsEditing(true)} className="bg-green-300 text-black hover:bg-yellow-300 dark:bg-green-300 dark:hover:bg-yellow-300">
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}