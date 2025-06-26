"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { auth, db, storage } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle, Camera, Loader2 } from "lucide-react";

// Define profile fields that extend AuthUser
interface AdminProfile {
  bio: string;
  department: string;
  adminLevel: "Standard" | "Senior" | "Lead";
  preferredLanguage: string;
  displayName: string;
  name?: string; // For backward compatibility
}

export default function AdminProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  // Hardcode the role as admin since we're in the admin profile page
  const role = "admin";

  const [formData, setFormData] = useState<AdminProfile>({
    displayName: user?.displayName || "",
    bio: "",
    department: "",
    adminLevel: "Standard",
    preferredLanguage: "English"
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load user data when component mounts
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data() as AdminProfile;
          
          setFormData({
            displayName: user.displayName || "",
            bio: userData?.bio || "",
            department: userData?.department || "",
            adminLevel: userData?.adminLevel || "Standard",
            preferredLanguage: userData?.preferredLanguage || "English",
          });
          
          if (user.photoURL) {
            setAvatarPreview(user.photoURL);
          }
        } catch (error) {
          console.error("Error loading user profile:", error);
          toast.error("Failed to load profile data");
        }
      }
    };

    loadUserProfile();
  }, [user]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle avatar upload
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user || !auth.currentUser) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    try {
      setIsSaving(true);
      let photoURL = user.photoURL || "";

      // Upload avatar if changed
      if (avatarFile) {
        const avatarRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(avatarRef, avatarFile);
        photoURL = await getDownloadURL(avatarRef);
      }

      // Update Firebase user profile
      await updateProfile(auth.currentUser, { 
        displayName: formData.displayName,
        photoURL: photoURL,
      });

      // Update Firestore user document
      await updateDoc(doc(db, "users", user.uid), { 
        displayName: formData.displayName,
        bio: formData.bio,
        department: formData.department,
        adminLevel: formData.adminLevel,
        preferredLanguage: formData.preferredLanguage,
        photoURL: photoURL,
        // Preserve existing fields
        role: "admin",
        emailVerified: user.emailVerified,
        metadata: user.metadata,
        providerData: user.providerData
      });

      toast.success("Profile updated successfully!");
      
      // Redirect back to dashboard after save
      setTimeout(() => {
        router.push(`/dashboard/${role}`);
      }, 1500);
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Redirect to login if not authenticated
  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getInitials = (displayName: string | null) => {
    if (!displayName) return "";
    return displayName
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-orbitron font-bold text-primary mb-6">Edit Admin Profile</h1>
      
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Administrator Information</CardTitle>
          <CardDescription>Update your personal details and administrative preferences</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarPreview || ""} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {formData.displayName ? getInitials(formData.displayName) : <UserCircle />}
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-4 w-4" />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange} 
                />
              </label>
            </div>
            <p className="text-sm text-muted-foreground">Click the camera icon to upload a profile picture</p>
          </div>
          
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>
          
          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={3}
            />
          </div>
          
          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Your department"
            />
          </div>
          
          {/* Admin Level */}
          <div className="space-y-2">
            <Label htmlFor="adminLevel">Administrative Level</Label>
            <Select 
              value={formData.adminLevel} 
              onValueChange={(value) => handleSelectChange("adminLevel", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select admin level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Super Admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Language Preference */}
          <div className="space-y-2">
            <Label htmlFor="language">Preferred Language</Label>
            <Select 
              value={formData.preferredLanguage} 
              onValueChange={(value) => handleSelectChange("preferredLanguage", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="German">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/dashboard/${role}`)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
