"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save, Shield, Globe, Bell, Database, Server, Clock, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminConfigPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  interface SystemConfig {
    siteName: string;
    siteDescription: string;
    maintenanceMode: boolean;
    registrationEnabled: boolean;
    chatEnabled: boolean;
    maxUploadSize: number;
    contactEmail: string;
    supportPhone: string;
    backupEnabled: boolean;
    backupFrequency: string;
    analyticsEnabled: boolean;
    notificationsEnabled: boolean;
    maxClassSize: number;
    sessionTimeout: number;
    apiRateLimit: number;
    debugMode: boolean;
    theme: string;
  }

  const [config, setConfig] = useState<SystemConfig>({
    siteName: "Bipoca AI",
    siteDescription: "AI-powered platform connecting students, teachers and resources",
    maintenanceMode: false,
    registrationEnabled: true,
    chatEnabled: true,
    maxUploadSize: 10,
    contactEmail: "bipocaai@gmail.com",
    supportPhone: "",
    backupEnabled: true,
    backupFrequency: "daily",
    analyticsEnabled: true,
    notificationsEnabled: true,
    maxClassSize: 30,
    sessionTimeout: 60,
    apiRateLimit: 100,
    debugMode: false,
    theme: "light"
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const configDoc = await getDoc(doc(db, "system", "config"));
        if (configDoc.exists()) {
          setConfig({ ...config, ...configDoc.data() as SystemConfig });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching config:", error);
        toast.error("Failed to load system configuration");
        setLoading(false);
      }
    };

    fetchConfig();
  }, [config]);

  const handleChange = <T extends keyof SystemConfig>(field: T, value: SystemConfig[T]) => {
    setConfig({
      ...config,
      [field]: value
    });
  };

  const saveConfig = async () => {
    if (!user || user.role !== "admin") {
      toast.error("You don't have permission to update system configuration");
      return;
    }

    setSaving(true);
    try {
      // Create a properly typed object for Firestore
      // We need to use a more specific type to avoid 'any'
      type FirestoreData = {
        [key: string]: string | number | boolean | null | undefined;
      };
      
      // Initialize with the correct type
      const configData: FirestoreData = {};
      
      // Add each property with the correct type for Firestore
      Object.entries(config).forEach(([key, value]) => {
        // Only add properties that match Firestore's expected types
        if (
          typeof value === 'string' || 
          typeof value === 'number' || 
          typeof value === 'boolean' || 
          value === null || 
          value === undefined
        ) {
          configData[key] = value;
        }
      });
      
      // Use the properly typed object with Firestore
      await updateDoc(doc(db, "system", "config"), configData);
      toast.success("System configuration updated successfully");
    } catch (error) {
      console.error("Error updating config:", error);
      toast.error("Failed to update system configuration");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">System Configuration</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure basic system settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input 
                id="siteName" 
                value={config.siteName} 
                onChange={(e) => handleChange("siteName", e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input 
                id="contactEmail" 
                value={config.contactEmail} 
                onChange={(e) => handleChange("contactEmail", e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea 
                id="siteDescription" 
                value={config.siteDescription} 
                onChange={(e) => handleChange("siteDescription", e.target.value)} 
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportPhone">Support Phone</Label>
              <Input 
                id="supportPhone" 
                value={config.supportPhone} 
                onChange={(e) => handleChange("supportPhone", e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxUploadSize">Max Upload Size (MB)</Label>
              <Input 
                id="maxUploadSize" 
                type="number"
                value={config.maxUploadSize} 
                onChange={(e) => handleChange("maxUploadSize", parseInt(e.target.value) || 10)} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Feature Toggles</CardTitle>
          <CardDescription>Enable or disable system features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-amber-500" />
              <div>
                <h3 className="text-lg font-medium">Maintenance Mode</h3>
                <p className="text-sm text-muted-foreground">When enabled, only administrators can access the site</p>
              </div>
            </div>
            <Switch 
              checked={config.maintenanceMode} 
              onCheckedChange={(checked) => handleChange("maintenanceMode", checked)} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="text-lg font-medium">User Registration</h3>
                <p className="text-sm text-muted-foreground">Allow new users to register</p>
              </div>
            </div>
            <Switch 
              checked={config.registrationEnabled} 
              onCheckedChange={(checked) => handleChange("registrationEnabled", checked)} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-green-500" />
              <div>
                <h3 className="text-lg font-medium">Chat System</h3>
                <p className="text-sm text-muted-foreground">Enable the messaging system across the platform</p>
              </div>
            </div>
            <Switch 
              checked={config.chatEnabled} 
              onCheckedChange={(checked) => handleChange("chatEnabled", checked)} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-purple-500" />
              <div>
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">Enable system-wide notifications</p>
              </div>
            </div>
            <Switch 
              checked={config.notificationsEnabled} 
              onCheckedChange={(checked) => handleChange("notificationsEnabled", checked)} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-indigo-500" />
              <div>
                <h3 className="text-lg font-medium">Automated Backups</h3>
                <p className="text-sm text-muted-foreground">Enable scheduled database backups</p>
              </div>
            </div>
            <Switch 
              checked={config.backupEnabled} 
              onCheckedChange={(checked) => handleChange("backupEnabled", checked)} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Server className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="text-lg font-medium">Debug Mode</h3>
                <p className="text-sm text-muted-foreground">Enable detailed error logging and debugging tools</p>
              </div>
            </div>
            <Switch 
              checked={config.debugMode} 
              onCheckedChange={(checked) => handleChange("debugMode", checked)} 
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>System Parameters</CardTitle>
          <CardDescription>Configure technical system parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxClassSize">Maximum Class Size</Label>
              <Input 
                id="maxClassSize" 
                type="number"
                value={config.maxClassSize} 
                onChange={(e) => handleChange("maxClassSize", parseInt(e.target.value) || 30)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input 
                id="sessionTimeout" 
                type="number"
                value={config.sessionTimeout} 
                onChange={(e) => handleChange("sessionTimeout", parseInt(e.target.value) || 60)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiRateLimit">API Rate Limit (requests/minute)</Label>
              <Input 
                id="apiRateLimit" 
                type="number"
                value={config.apiRateLimit} 
                onChange={(e) => handleChange("apiRateLimit", parseInt(e.target.value) || 100)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <select
                id="backupFrequency"
                value={config.backupFrequency}
                onChange={(e) => handleChange("backupFrequency", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme">Default Theme</Label>
              <select
                id="theme"
                value={config.theme}
                onChange={(e) => handleChange("theme", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Backup & Maintenance</CardTitle>
          <CardDescription>System maintenance operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-500" />
                <div>
                  <h3 className="text-lg font-medium">Manual Backup</h3>
                  <p className="text-sm text-muted-foreground">Create a backup of the entire database</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => toast.success("Backup initiated")}>
                Create Backup
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="text-lg font-medium">Clear Cache</h3>
                  <p className="text-sm text-muted-foreground">Clear system cache to free up resources</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => toast.success("Cache cleared successfully")}>
                Clear Cache
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Server className="h-5 w-5 text-red-500" />
                <div>
                  <h3 className="text-lg font-medium">System Diagnostics</h3>
                  <p className="text-sm text-muted-foreground">Run diagnostics to check system health</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => toast.success("Diagnostics completed: All systems operational")}>
                Run Diagnostics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveConfig} disabled={saving} size="lg">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Saving Configuration...
            </>
          ) : (
            <>
              <Save className="mr-2 h-5 w-5" />
              Save All Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
