"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Eye,
  Monitor,
  Languages,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StudentSettings() {
  // Mock settings state
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    darkMode: false,
    highContrast: false,
    visionEase: false,
    studyReminders: true,
    language: "english",
    fontSize: "medium",
  });

  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-2xl font-bold text-white mb-6">Personalize Your Learning Experience</h1>

        {/* Accessibility Settings */}
        <Card className="bg-[#12122E] border-[#2A2A5A] text-white mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Eye className="mr-2 text-purple-400" /> Accessibility
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">High Contrast Mode</div>
                  <div className="text-sm text-gray-400">
                    Enhance visibility with maximum contrast
                  </div>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(checked) =>
                    handleSettingChange("highContrast", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">VisionEase Mode</div>
                  <div className="text-sm text-gray-400">
                    Colorblind-friendly display settings
                  </div>
                </div>
                <Switch
                  checked={settings.visionEase}
                  onCheckedChange={(checked) =>
                    handleSettingChange("visionEase", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Font Size</div>
                  <div className="text-sm text-gray-400">
                    Adjust text size for better readability
                  </div>
                </div>
                <Select
                  value={settings.fontSize}
                  onValueChange={(value) => handleSettingChange("fontSize", value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-[#12122E] border-[#2A2A5A] text-white mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Bell className="mr-2 text-blue-400" /> Notifications
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-gray-400">
                    Get updates about your courses
                  </div>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) =>
                    handleSettingChange("notifications", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Study Reminders</div>
                  <div className="text-sm text-gray-400">
                    Daily reminders to maintain your streak
                  </div>
                </div>
                <Switch
                  checked={settings.studyReminders}
                  onCheckedChange={(checked) =>
                    handleSettingChange("studyReminders", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="bg-[#12122E] border-[#2A2A5A] text-white mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Monitor className="mr-2 text-green-400" /> Display
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-gray-400">
                    Switch between light and dark themes
                  </div>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) =>
                    handleSettingChange("darkMode", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Sound Effects</div>
                  <div className="text-sm text-gray-400">
                    Enable sound feedback for interactions
                  </div>
                </div>
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={(checked) =>
                    handleSettingChange("soundEffects", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="bg-[#12122E] border-[#2A2A5A] text-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Languages className="mr-2 text-yellow-400" /> Language
            </h2>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">Interface Language</div>
                <div className="text-sm text-gray-400">
                  Choose your preferred language
                </div>
              </div>
              <Select
                value={settings.language}
                onValueChange={(value) => handleSettingChange("language", value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-6 space-x-4">
          <Button variant="outline" className="text-white border-[#2A2A5A]">
            Reset to Defaults
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
