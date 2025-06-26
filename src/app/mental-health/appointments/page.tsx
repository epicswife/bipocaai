"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, X, Filter, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { collection, addDoc, query, where, orderBy, onSnapshot, updateDoc, doc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Type definitions
interface Appointment {
  id: string;
  userId: string;
  counselorId?: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  reason: string;
  preferredCounselorType?: string;
  userName?: string;
  userEmail?: string;
  counselorName?: string;
}

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role?: string;
}

export default function MentalHealthAppointmentsPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
    notes: "",
    preferredCounselorType: "any"
  });
  const router = useRouter();

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
      } else {
        router.push("/auth/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch appointments
  useEffect(() => {
    if (!user) return;

    const appointmentsQuery = query(
      collection(db, "appointments"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(appointmentsQuery, (snapshot) => {
      const appointmentList: Appointment[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        appointmentList.push({
          id: doc.id,
          userId: data.userId,
          counselorId: data.counselorId,
          date: data.date.toDate(),
          time: data.time,
          status: data.status,
          notes: data.notes,
          reason: data.reason,
          preferredCounselorType: data.preferredCounselorType,
          userName: data.userName,
          userEmail: data.userEmail,
          counselorName: data.counselorName
        });
      });
      setAppointments(appointmentList);
      setFilteredAppointments(appointmentList);
    }, (error) => {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    });

    return () => unsubscribe();
  }, [user]);

  // Filter appointments when statusFilter changes
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter(appointment => appointment.status === statusFilter)
      );
    }
  }, [statusFilter, appointments]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (!formData.date || !formData.time || !formData.reason) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      setLoading(true);
      
      // Create appointment in Firestore
      await addDoc(collection(db, "appointments"), {
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userEmail: user.email,
        date: Timestamp.fromDate(new Date(formData.date)),
        time: formData.time,
        reason: formData.reason,
        notes: formData.notes,
        preferredCounselorType: formData.preferredCounselorType,
        status: "pending",
        createdAt: Timestamp.now()
      });
      
      toast.success("Appointment request submitted successfully");
      setIsDialogOpen(false);
      setFormData({
        date: "",
        time: "",
        reason: "",
        notes: "",
        preferredCounselorType: "any"
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to submit appointment request");
    } finally {
      setLoading(false);
    }
  };

  // Cancel appointment
  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await updateDoc(doc(db, "appointments", appointmentId), {
        status: "cancelled",
        updatedAt: Timestamp.now()
      });
      
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-gold-cyan dark:bg-gradient-gold-cyan">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center bg-gradient-gold-cyan dark:bg-gradient-gold-cyan visionease:bg-gradient-gray-dark high-contrast:bg-gradient-gray-dark">
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <Calendar className="h-16 w-16 mx-auto mb-6 text-teal-500" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl dark:text-gray-800 font-orbitron font-bold text-foreground mb-6">
            Mental Health Appointments
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto dark:text-gray-700">
            Schedule and manage your counseling sessions
          </p>
          <Link href="/mental-health">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Mental Health Resources
            </Button>
          </Link>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full h-24 text-background dark:text-background visionease:text-background high-contrast:text-background"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C360 50 1080 50 1440 100 L1440 100 L0 100 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Your Appointments</h2>
              <p className="text-muted-foreground">Manage your scheduled counseling sessions</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Appointments</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground">
                    <Plus className="h-5 w-5 mr-2" />
                    Request Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Request Appointment</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to request a mental health counseling appointment.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={format(new Date(), "yyyy-MM-dd")}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Time <span className="text-red-500">*</span></Label>
                        <Input
                          id="time"
                          name="time"
                          type="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preferredCounselorType">Preferred Counselor Type</Label>
                      <Select
                        value={formData.preferredCounselorType}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, preferredCounselorType: value }))}
                      >
                        <SelectTrigger id="preferredCounselorType">
                          <SelectValue placeholder="Select preferred counselor type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">No Preference</SelectItem>
                          <SelectItem value="academic">Academic Counselor</SelectItem>
                          <SelectItem value="mental-health">Mental Health Specialist</SelectItem>
                          <SelectItem value="career">Career Counselor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Appointment <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        placeholder="Briefly describe why you're seeking an appointment"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any additional information you'd like to share"
                      />
                    </div>
                    
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="mt-2 sm:mt-0"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground mt-2 sm:mt-0"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit Request"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Appointments List */}
          {filteredAppointments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No appointments found</h3>
              <p className="text-muted-foreground mb-6">
                {statusFilter === "all"
                  ? "You don't have any appointments yet."
                  : `You don't have any ${statusFilter} appointments.`}
              </p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-primary-foreground"
              >
                <Plus className="h-5 w-5 mr-2" />
                Request Appointment
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full border-primary/20 dark:border-secondary/20 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-bold text-foreground">
                            {format(appointment.date, "MMMM d, yyyy")}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            <div className="flex items-center mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.time}
                            </div>
                          </CardDescription>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Reason</h4>
                        <p className="text-foreground">{appointment.reason}</p>
                      </div>
                      
                      {appointment.counselorName && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Counselor</h4>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-foreground">{appointment.counselorName}</span>
                          </div>
                        </div>
                      )}
                      
                      {appointment.preferredCounselorType && appointment.preferredCounselorType !== "any" && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Preferred Counselor</h4>
                          <p className="text-foreground capitalize">
                            {appointment.preferredCounselorType.replace("-", " ")}
                          </p>
                        </div>
                      )}
                      
                      {appointment.notes && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Notes</h4>
                          <p className="text-foreground text-sm">{appointment.notes}</p>
                        </div>
                      )}
                    </CardContent>
                    
                    {appointment.status === "pending" && (
                      <CardFooter>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel Appointment
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
