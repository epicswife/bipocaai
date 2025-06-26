"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { db, storage } from '@/lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Settings, Bell, Shield, User, Key } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  messageAlerts: boolean;
  appointmentReminders: boolean;
  studentUpdates: boolean;
}

interface PrivacySettings {
  showOnlineStatus: boolean;
  allowMessaging: boolean;
  publicProfile: boolean;
}

interface CounselorProfile {
  displayName: string;
  title: string;
  bio: string;
  specializations: string[];
  contactEmail: string;
  phoneNumber: string;
  avatarUrl: string;
  notificationSettings: NotificationSettings;
  privacySettings: PrivacySettings;
}

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<CounselorProfile>({
    displayName: '',
    title: '',
    bio: '',
    specializations: [],
    contactEmail: '',
    phoneNumber: '',
    avatarUrl: '',
    notificationSettings: {
      emailNotifications: true,
      pushNotifications: true,
      messageAlerts: true,
      appointmentReminders: true,
      studentUpdates: true
    },
    privacySettings: {
      showOnlineStatus: true,
      allowMessaging: true,
      publicProfile: false
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) return;

    try {
      const profileDoc = await getDoc(doc(db, 'counselors', user.uid));
      if (profileDoc.exists()) {
        setProfile(profileDoc.data() as CounselorProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile settings');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const uploadAvatar = async (): Promise<string> => {
    if (!user || !avatarFile) return profile.avatarUrl;

    const avatarRef = ref(storage, `avatars/${user.uid}/${avatarFile.name}`);
    await uploadBytes(avatarRef, avatarFile);
    return getDownloadURL(avatarRef);
  };

  const saveSettings = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const updatedProfile = { ...profile };

      if (avatarFile) {
        const avatarUrl = await uploadAvatar();
        updatedProfile.avatarUrl = avatarUrl;
      }

      await updateDoc(doc(db, 'counselors', user.uid), updatedProfile);
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-12">Please log in to view settings.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-primary">Settings</h1>
        <Button 
          className="bg-primary" 
          onClick={saveSettings}
          disabled={isSaving}
        >
          <Settings className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Display Name</label>
                <Input
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  placeholder="Your display name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  placeholder="Your professional title"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Bio</label>
              <textarea
                className="w-full p-2 rounded-md border border-border bg-background"
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Tell us about yourself"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Avatar</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(profile.notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </label>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      notificationSettings: {
                        ...profile.notificationSettings,
                        [key]: checked
                      }
                    })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(profile.privacySettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </label>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) =>
                    setProfile({
                      ...profile,
                      privacySettings: {
                        ...profile.privacySettings,
                        [key]: checked
                      }
                    })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            <Button variant="outline" className="w-full">
              Enable Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full text-destructive">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
