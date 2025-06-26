"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { collection, query, getDocs, doc, updateDoc, orderBy, limit, where } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Loader2, 
  Bell, 
  Users, 
  Shield, 
  AlertTriangle, 
  Info,
  Settings,
  Clock,
  Filter
} from "lucide-react";

interface Notification {
  id: string;
  type: "system" | "security" | "user" | "class";
  priority: "high" | "medium" | "low";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
}

interface NotificationPreferences {
  systemNotifications: boolean;
  securityAlerts: boolean;
  userActivity: boolean;
  classUpdates: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export default function NotificationCenter() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    systemNotifications: true,
    securityAlerts: true,
    userActivity: true,
    classUpdates: true,
    emailNotifications: true,
    pushNotifications: false,
  });
  const [activeTab, setActiveTab] = useState("all");
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      const notificationsRef = collection(db, "notifications");
      let q = query(
        notificationsRef,
        orderBy("timestamp", "desc"),
        limit(50)
      );

      if (activeTab !== "all") {
        q = query(
          notificationsRef,
          where("type", "==", activeTab),
          orderBy("timestamp", "desc"),
          limit(50)
        );
      }

      const snapshot = await getDocs(q);
      const fetchedNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];

      setNotifications(fetchedNotifications);
      setUnreadCount(fetchedNotifications.filter(n => !n.read).length);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to load notifications");
      setLoading(false);
    }
  }, [activeTab]);
  
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (notificationId: string) => {
    try {
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, { read: true });
      
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount(prev => prev - 1);
      
      toast.success("Marked as read");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to update notification");
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      
      await Promise.all(
        unreadNotifications.map(n => 
          updateDoc(doc(db, "notifications", n.id), { read: true })
        )
      );
      
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to update notifications");
    }
  };

  const updatePreferences = async (key: keyof NotificationPreferences, value: boolean) => {
    try {
      setPreferences(prev => ({ ...prev, [key]: value }));
      
      // In a real app, save to user preferences in Firestore
      toast.success("Preferences updated");
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Failed to update preferences");
    }
  };

  const getNotificationIcon = (type: string, priority: string) => {
    switch (type) {
      case "system":
        return <Info className={`h-5 w-5 ${getPriorityColor(priority)}`} />;
      case "security":
        return <Shield className={`h-5 w-5 ${getPriorityColor(priority)}`} />;
      case "user":
        return <Users className={`h-5 w-5 ${getPriorityColor(priority)}`} />;
      case "class":
        return <Clock className={`h-5 w-5 ${getPriorityColor(priority)}`} />;
      default:
        return <Bell className={`h-5 w-5 ${getPriorityColor(priority)}`} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-primary">Notification Center</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount} unread notifications
          </p>
        </div>
        <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
          Mark All as Read
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle>Notifications</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="user">Users</TabsTrigger>
                  <TabsTrigger value="class">Classes</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 rounded-lg border transition-colors",
                        !notification.read && "bg-accent/5"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          {getNotificationIcon(notification.type, notification.priority)}
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{notification.title}</h3>
                              {!notification.read && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary">
                                  New
                                </Badge>
                              )}
                              {notification.actionRequired && (
                                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                                  Action Required
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {new Date(notification.timestamp).toLocaleString()}
                              </span>
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Mark as read
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">System Notifications</label>
                    <p className="text-xs text-muted-foreground">
                      Updates about system status and maintenance
                    </p>
                  </div>
                  <Switch
                    checked={preferences.systemNotifications}
                    onCheckedChange={(checked) => 
                      updatePreferences("systemNotifications", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Security Alerts</label>
                    <p className="text-xs text-muted-foreground">
                      Important security-related notifications
                    </p>
                  </div>
                  <Switch
                    checked={preferences.securityAlerts}
                    onCheckedChange={(checked) => 
                      updatePreferences("securityAlerts", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">User Activity</label>
                    <p className="text-xs text-muted-foreground">
                      Notifications about user actions
                    </p>
                  </div>
                  <Switch
                    checked={preferences.userActivity}
                    onCheckedChange={(checked) => 
                      updatePreferences("userActivity", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Class Updates</label>
                    <p className="text-xs text-muted-foreground">
                      Updates about classes and assignments
                    </p>
                  </div>
                  <Switch
                    checked={preferences.classUpdates}
                    onCheckedChange={(checked) => 
                      updatePreferences("classUpdates", checked)
                    }
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Email Notifications</label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => 
                      updatePreferences("emailNotifications", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Push Notifications</label>
                    <p className="text-xs text-muted-foreground">
                      Receive push notifications
                    </p>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => 
                      updatePreferences("pushNotifications", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common notification actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Mute All Notifications
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Advanced Settings
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Clear All History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
