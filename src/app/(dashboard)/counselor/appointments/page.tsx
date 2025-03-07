"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { Calendar, Clock, User, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Appointment {
  id: string;
  studentName: string;
  date: Timestamp;
  type: 'academic' | 'behavioral' | 'emotional' | 'career';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  duration: number; // in minutes
}

export default function AppointmentsPage() {
  const { user, loading } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    if (!user) return;

    try {
      const now = new Date();
      let appointmentsQuery = query(
        collection(db, 'appointments'),
        where('counselorId', '==', user.uid),
        orderBy('date', filter === 'past' ? 'desc' : 'asc')
      );

      if (filter !== 'all') {
        appointmentsQuery = query(
          appointmentsQuery,
          where('date', filter === 'upcoming' ? '>=' : '<', now)
        );
      }

      const snapshot = await getDocs(appointmentsQuery);
      const appointmentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];

      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, filter]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  if (loading || isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-12">Please log in to view appointments.</div>;
  }

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Appointment['type']) => {
    switch (type) {
      case 'academic':
        return <Calendar className="h-4 w-4" />;
      case 'behavioral':
        return <AlertCircle className="h-4 w-4" />;
      case 'emotional':
        return <User className="h-4 w-4" />;
      case 'career':
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-primary">Appointments</h1>
        <div className="flex gap-4">
          <Select value={filter} onValueChange={(value: 'upcoming' | 'past' | 'all') => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter appointments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="past">Past</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary">
            <Calendar className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Calendar className="h-4 w-4 mr-2" />
              Today&apos;s Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter(a => 
                new Date(a.date.seconds * 1000).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Clock className="h-4 w-4 mr-2" />
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter(a => 
                new Date(a.date.seconds * 1000) > new Date() && 
                a.status === 'scheduled'
              ).length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <User className="h-4 w-4 mr-2" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter(a => a.status === 'completed').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <AlertCircle className="h-4 w-4 mr-2" />
              Cancelled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter(a => a.status === 'cancelled').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {appointments.map(appointment => (
          <Card key={appointment.id} className="border-primary/20">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  {getTypeIcon(appointment.type)}
                  {appointment.studentName}
                </CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(appointment.date.seconds * 1000).toLocaleDateString()} at{' '}
                    {new Date(appointment.date.seconds * 1000).toLocaleTimeString()}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {appointment.duration} minutes
                </span>
              </div>
              {appointment.notes && (
                <p className="text-sm text-muted-foreground mt-2">{appointment.notes}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
