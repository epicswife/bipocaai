"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Shield, Lock, Key, UserCheck } from "lucide-react";


interface AccessRule {
  id: string;
  resource: string;
  role: string;
  permissions: string[];
  active: boolean;
}

interface RolePermission {
  role: string;
  permissions: {
    [key: string]: boolean;
  };
}



export default function AccessControl() {
  const [loading, setLoading] = useState(true);
  const [accessRules, setAccessRules] = useState<AccessRule[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("all");

  useEffect(() => {
    fetchAccessRules();
  }, []);

  const fetchAccessRules = async () => {
    try {
      const rulesRef = collection(db, "accessRules");
      const snapshot = await getDocs(rulesRef);
      
      const rules = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AccessRule[];

      // Initialize role permissions
      const roles = ["admin", "teacher", "student", "counselor", "parent"];
      const permissions = roles.map(role => ({
        role,
        permissions: {
          dashboard: true,
          users: role === "admin",
          classes: ["admin", "teacher"].includes(role),
          assignments: ["admin", "teacher"].includes(role),
          achievements: true,
          analytics: role === "admin",
          settings: role === "admin",
        }
      }));

      setAccessRules(rules);
      setRolePermissions(permissions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching access rules:", error);
      toast.error("Failed to load access rules");
      setLoading(false);
    }
  };

  const updatePermission = async (role: string, resource: string, allowed: boolean) => {
    try {
      setRolePermissions(prev => 
        prev.map(rp => 
          rp.role === role 
            ? { ...rp, permissions: { ...rp.permissions, [resource]: allowed } }
            : rp
        )
      );

      // Update in Firestore
      const ruleRef = doc(db, "accessRules", `${role}_${resource}`);
      await updateDoc(ruleRef, { active: allowed });
      
      toast.success("Permission updated successfully");
    } catch (error) {
      console.error("Error updating permission:", error);
      toast.error("Failed to update permission");
    }
  };

  const getResourceIcon = (resource: string) => {
    switch (resource) {
      case "dashboard":
        return <Shield className="h-4 w-4" />;
      case "users":
        return <UserCheck className="h-4 w-4" />;
      case "settings":
        return <Key className="h-4 w-4" />;
      default:
        return <Lock className="h-4 w-4" />;
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
        <h1 className="text-3xl font-orbitron font-bold text-primary">Access Control</h1>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="counselor">Counselor</SelectItem>
            <SelectItem value="parent">Parent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Role-Based Access Control</CardTitle>
            <CardDescription>Manage access permissions for different user roles</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {rolePermissions
                .filter(rp => selectedRole === "all" || rp.role === selectedRole)
                .map(({ role, permissions }) => (
                  <div key={role} className="mb-6">
                    <h3 className="text-lg font-semibold capitalize mb-3">{role}</h3>
                    <div className="space-y-4">
                      {Object.entries(permissions).map(([resource, allowed]) => (
                        <div key={`${role}_${resource}`} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getResourceIcon(resource)}
                            <span className="capitalize">{resource}</span>
                          </div>
                          <Switch
                            checked={allowed}
                            onCheckedChange={(checked) => updatePermission(role, resource, checked)}
                            disabled={role === "admin" && resource === "dashboard"} // Prevent disabling admin dashboard access
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Access Rules</CardTitle>
            <CardDescription>View and manage system-wide access rules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input placeholder="Search rules..." className="flex-1" />
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>
              
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {accessRules.map((rule) => (
                    <Card key={rule.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{rule.resource}</h4>
                            <p className="text-sm text-muted-foreground">
                              Role: {rule.role}
                            </p>
                          </div>
                          <Switch
                            checked={rule.active}
                            onCheckedChange={(checked) => 
                              updatePermission(rule.role, rule.resource, checked)
                            }
                          />
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            Permissions: {rule.permissions.join(", ")}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
