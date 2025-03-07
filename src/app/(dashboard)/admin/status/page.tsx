"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Loader2, 
  Activity, 
  Server, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Clock,
  Users,
  HardDrive
} from "lucide-react";

interface SystemMetrics {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  uptime: number;
  activeConnections: number;
}

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  latency: number;
  lastChecked: string;
}

interface SystemEvent {
  id: string;
  type: "error" | "warning" | "info" | "success";
  message: string;
  timestamp: string;
  service: string;
}

export default function SystemStatus() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 0,
    memory: 0,
    storage: 0,
    network: 0,
    uptime: 0,
    activeConnections: 0,
  });
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [events, setEvents] = useState<SystemEvent[]>([]);
  const [timeRange, setTimeRange] = useState("1h");

  useEffect(() => {
    fetchSystemStatus();
    const interval = setInterval(fetchSystemStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchSystemStatus = async () => {
    try {
      // In a real application, these would come from actual system monitoring
      // For demo purposes, we'll simulate the data
      setMetrics({
        cpu: Math.random() * 30 + 20, // 20-50% CPU usage
        memory: Math.random() * 40 + 30, // 30-70% Memory usage
        storage: Math.random() * 20 + 10, // 10-30% Storage usage
        network: Math.random() * 50 + 40, // 40-90% Network capacity
        uptime: 99.99, // High uptime percentage
        activeConnections: Math.floor(Math.random() * 1000 + 500), // 500-1500 connections
      });

      setServices([
        {
          name: "Authentication",
          status: "operational",
          latency: Math.random() * 100 + 50,
          lastChecked: new Date().toISOString(),
        },
        {
          name: "Database",
          status: "operational",
          latency: Math.random() * 150 + 100,
          lastChecked: new Date().toISOString(),
        },
        {
          name: "Storage",
          status: "operational",
          latency: Math.random() * 200 + 150,
          lastChecked: new Date().toISOString(),
        },
        {
          name: "Live Classes",
          status: Math.random() > 0.9 ? "degraded" : "operational",
          latency: Math.random() * 300 + 200,
          lastChecked: new Date().toISOString(),
        },
      ]);

      // Fetch recent system events from Firestore
      const eventsRef = collection(db, "systemEvents");
      const q = query(
        eventsRef,
        orderBy("timestamp", "desc"),
        limit(10)
      );
      const snapshot = await getDocs(q);
      
      const systemEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as SystemEvent[];

      setEvents(systemEvents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching system status:", error);
      toast.error("Failed to fetch system status");
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500/10 text-green-500";
      case "degraded":
        return "bg-yellow-500/10 text-yellow-500";
      case "down":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
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
        <h1 className="text-3xl font-orbitron font-bold text-primary">System Status</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Last Hour</SelectItem>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">System Load</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>CPU Usage</span>
                  <span>{Math.round(metrics.cpu)}%</span>
                </div>
                <Progress value={metrics.cpu} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Memory Usage</span>
                  <span>{Math.round(metrics.memory)}%</span>
                </div>
                <Progress value={metrics.memory} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Storage Usage</span>
                  <span>{Math.round(metrics.storage)}%</span>
                </div>
                <Progress value={metrics.storage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Network Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Network Load</span>
                  <span>{Math.round(metrics.network)}%</span>
                </div>
                <Progress value={metrics.network} className="h-2" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-sm font-medium">Active Connections</p>
                  <p className="text-2xl font-bold">{metrics.activeConnections}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Uptime</p>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  {metrics.uptime}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Last Backup</p>
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                  2 hours ago
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Security Status</p>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  Protected
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
          <CardDescription>Current status of all system services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Latency: {Math.round(service.latency)}ms
                    </p>
                  </div>
                </div>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Events */}
      <Card>
        <CardHeader>
          <CardTitle>System Events</CardTitle>
          <CardDescription>Recent system events and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-4 p-4 border rounded-lg"
                >
                  {getEventIcon(event.type)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{event.message}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{event.service}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(event.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
