"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Search, UserPlus, Shield, ShieldAlert, ShieldCheck, UserCog } from "lucide-react";
import type { AuthUser } from "@/types/auth";

interface ExtendedUser extends AuthUser {
  lastActive?: string;
  status: "active" | "inactive" | "suspended";
  accountType: "standard" | "premium";
  createdAt: string;
}

interface UserFilters {
  role: string;
  status: string;
  accountType: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<UserFilters>({
    role: "all",
    status: "all",
    accountType: "all",
  });
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("metadata.creationTime", "desc"));
      const snapshot = await getDocs(q);
      
      const fetchedUsers = snapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id,
        status: doc.data().status || "active",
        accountType: doc.data().accountType || "standard",
        createdAt: doc.data().metadata?.creationTime || "",
        lastActive: doc.data().metadata?.lastSignInTime || "",
      })) as ExtendedUser[];

      setUsers(fetchedUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: "bg-red-500/10 text-red-500",
      teacher: "bg-blue-500/10 text-blue-500",
      student: "bg-green-500/10 text-green-500",
      counselor: "bg-purple-500/10 text-purple-500",
      parent: "bg-orange-500/10 text-orange-500",
    };
    return colors[role as keyof typeof colors] || "bg-gray-500/10 text-gray-500";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <ShieldCheck className="h-4 w-4 text-green-500" />;
      case "inactive":
        return <Shield className="h-4 w-4 text-yellow-500" />;
      case "suspended":
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const updateUserStatus = async (userId: string, newStatus: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { status: newStatus });
      
      setUsers(users.map(user => 
        user.uid === userId ? { ...user, status: newStatus as "active" | "inactive" | "suspended" } : user
      ));
      
      toast.success("User status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { role: newRole });
      
      setUsers(users.map(user => 
        user.uid === userId ? { ...user, role: newRole as AuthUser["role"] } : user
      ));
      
      toast.success("User role updated successfully");
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.displayName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = filters.role === "all" || user.role === filters.role;
    const matchesStatus = filters.status === "all" || user.status === filters.status;
    const matchesAccountType = filters.accountType === "all" || user.accountType === filters.accountType;

    return matchesSearch && matchesRole && matchesStatus && matchesAccountType;
  });

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
        <h1 className="text-3xl font-orbitron font-bold text-primary">User Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select
              value={filters.role}
              onValueChange={(value) => setFilters({ ...filters, role: value })}
            >
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
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px] rounded-md border">
            <div className="p-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.uid}
                  className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-accent/5 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.displayName || "No Name"}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className={getRoleBadgeColor(user.role)}>
                          {user.role}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          {getStatusIcon(user.status)}
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedUser(user)}
                      >
                        <UserCog className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User Settings</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Role</label>
                          <Select
                            value={selectedUser?.role}
                            onValueChange={(value) => selectedUser && updateUserRole(selectedUser.uid, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="counselor">Counselor</SelectItem>
                              <SelectItem value="parent">Parent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Status</label>
                          <Select
                            value={selectedUser?.status}
                            onValueChange={(value) => selectedUser && updateUserStatus(selectedUser.uid, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
