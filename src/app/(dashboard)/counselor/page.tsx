"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart } from '@/components/ui/charts';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { Calendar, Users, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface CaseStats {
  active: number;
  completed: number;
  pending: number;
  total: number;
}

interface StudentMetrics {
  academicSupport: number;
  behavioralSupport: number;
  socialEmotional: number;
  careerGuidance: number;
}

interface Meeting {
  id: string;
  title: string;
  date: Timestamp;
  studentName: string;
  type: 'academic' | 'behavioral' | 'social' | 'career';
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Alert {
  id: string;
  title: string;
  timestamp: Timestamp;
  type: 'urgent' | 'info' | 'reminder';
  description: string;
  status: 'new' | 'read' | 'archived';
}

type CaseStatus = 'active' | 'completed' | 'pending';
type SupportType = 'academicSupport' | 'behavioralSupport' | 'socialEmotional' | 'careerGuidance';

export default function CounselorDashboard() {
  const { user, loading } = useAuth();
  const [caseStats, setCaseStats] = useState<CaseStats>({
    active: 0,
    completed: 0,
    pending: 0,
    total: 0
  });
  const [studentMetrics, setStudentMetrics] = useState<StudentMetrics>({
    academicSupport: 0,
    behavioralSupport: 0,
    socialEmotional: 0,
    careerGuidance: 0
  });
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);

  const fetchDashboardData = useCallback(async () => {
    try {
      if (!user?.uid) return;

      // Fetch case statistics
      const casesQuery = query(
        collection(db, 'cases'),
        where('counselorId', '==', user.uid)
      );
      const casesSnapshot = await getDocs(casesQuery);
      
      const stats = casesSnapshot.docs.reduce<CaseStats>((acc, doc) => {
        const status = doc.data().status as CaseStatus;
        return {
          ...acc,
          [status]: (acc[status] || 0) + 1,
          total: acc.total + 1
        };
      }, { active: 0, completed: 0, pending: 0, total: 0 });
      
      setCaseStats(stats);

      // Fetch student support metrics
      const metricsQuery = query(
        collection(db, 'studentSupport'),
        where('counselorId', '==', user.uid)
      );
      const metricsSnapshot = await getDocs(metricsQuery);
      
      const metrics = metricsSnapshot.docs.reduce<StudentMetrics>((acc, doc) => {
        const type = doc.data().supportType as SupportType;
        return {
          ...acc,
          [type]: (acc[type] || 0) + 1
        };
      }, { academicSupport: 0, behavioralSupport: 0, socialEmotional: 0, careerGuidance: 0 });
      
      setStudentMetrics(metrics);

      // Fetch upcoming meetings
      const meetingsQuery = query(
        collection(db, 'meetings'),
        where('counselorId', '==', user.uid),
        where('date', '>=', new Date()),
        orderBy('date'),
        limit(5)
      );
      const meetingsSnapshot = await getDocs(meetingsQuery);
      const meetingsData = meetingsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Meeting[];
      setUpcomingMeetings(meetingsData);

      // Fetch recent alerts
      const alertsQuery = query(
        collection(db, 'alerts'),
        where('counselorId', '==', user.uid),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const alertsSnapshot = await getDocs(alertsQuery);
      const alertsData = alertsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Alert[];
      setRecentAlerts(alertsData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-12">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Users className="h-4 w-4 mr-2" />
              Active Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseStats.active}</div>
            <p className="text-xs text-muted-foreground">Out of {caseStats.total} total cases</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingMeetings.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled this week</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseStats.completed}</div>
            <p className="text-xs text-muted-foreground">Successfully resolved</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Clock className="h-4 w-4 mr-2" />
              Pending Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseStats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Support Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={[
                studentMetrics.academicSupport,
                studentMetrics.behavioralSupport,
                studentMetrics.socialEmotional,
                studentMetrics.careerGuidance
              ]}
              labels={[
                'Academic Support',
                'Behavioral Support',
                'Social-Emotional',
                'Career Guidance'
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Case Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={[caseStats.active, caseStats.completed, caseStats.pending]}
              labels={['Active', 'Completed', 'Pending']}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeetings.length > 0 ? (
                upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{meeting.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(meeting.date.seconds * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No upcoming meetings scheduled</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.length > 0 ? (
                recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(alert.timestamp.seconds * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Alert
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No recent alerts</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
