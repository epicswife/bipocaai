"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart, LineChart } from '@/components/ui/charts';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Download, Calendar, TrendingUp, Users, FileText } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InterventionMetrics {
  academic: number;
  behavioral: number;
  social: number;
  career: number;
}

interface TimelineData {
  labels: string[];
  values: number[];
}

interface StudentProgress {
  improved: number;
  stable: number;
  needsAttention: number;
}

export default function ReportsPage() {
  const { user, loading } = useAuth();
  const [timeRange, setTimeRange] = useState('month');
  const [interventionMetrics, setInterventionMetrics] = useState<InterventionMetrics>({
    academic: 0,
    behavioral: 0,
    social: 0,
    career: 0
  });
  const [meetingsTimeline, setMeetingsTimeline] = useState<TimelineData>({
    labels: [],
    values: []
  });
  const [studentProgress, setStudentProgress] = useState<StudentProgress>({
    improved: 0,
    stable: 0,
    needsAttention: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const getTimeRangeStart = useCallback(() => {
    const now = new Date();
    switch (timeRange) {
      case 'week':
        return new Date(now.setDate(now.getDate() - 7));
      case 'month':
        return new Date(now.setMonth(now.getMonth() - 1));
      case 'quarter':
        return new Date(now.setMonth(now.getMonth() - 3));
      case 'year':
        return new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return new Date(now.setMonth(now.getMonth() - 1));
    }
  }, [timeRange]);

  const fetchReportData = useCallback(async () => {
    if (!user) return;

    try {
      // Fetch intervention metrics
      const interventionsQuery = query(
        collection(db, 'interventions'),
        where('counselorId', '==', user.uid),
        where('timestamp', '>=', getTimeRangeStart())
      );
      
      const interventionsSnapshot = await getDocs(interventionsQuery);
      const metrics = interventionsSnapshot.docs.reduce((acc, doc) => {
        const type = doc.data().type as keyof InterventionMetrics;
        return {
          ...acc,
          [type]: (acc[type] || 0) + 1
        };
      }, { academic: 0, behavioral: 0, social: 0, career: 0 });
      
      setInterventionMetrics(metrics);

      // Fetch meetings timeline data
      const meetingsQuery = query(
        collection(db, 'meetings'),
        where('counselorId', '==', user.uid),
        where('date', '>=', getTimeRangeStart()),
        orderBy('date', 'asc')
      );
      
      const meetingsSnapshot = await getDocs(meetingsQuery);
      const timelineData = processTimelineData(meetingsSnapshot.docs);
      setMeetingsTimeline(timelineData);

      // Fetch student progress data
      const progressQuery = query(
        collection(db, 'studentProgress'),
        where('counselorId', '==', user.uid),
        where('timestamp', '>=', getTimeRangeStart())
      );
      
      const progressSnapshot = await getDocs(progressQuery);
      const progress = progressSnapshot.docs.reduce((acc, doc) => {
        const status = doc.data().status as keyof StudentProgress;
        return {
          ...acc,
          [status]: (acc[status] || 0) + 1
        };
      }, { improved: 0, stable: 0, needsAttention: 0 });
      
      setStudentProgress(progress);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, getTimeRangeStart]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  const processTimelineData = (docs: QueryDocumentSnapshot<DocumentData>[]) => {
    const data: { [key: string]: number } = {};
    
    docs.forEach(doc => {
      const date = new Date(doc.data().date.seconds * 1000);
      const key = date.toLocaleDateString();
      data[key] = (data[key] || 0) + 1;
    });

    return {
      labels: Object.keys(data),
      values: Object.values(data)
    };
  };

  if (loading || isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-primary">Counseling Reports</h1>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="quarter">Past Quarter</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Users className="h-4 w-4 mr-2" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studentProgress.improved + studentProgress.stable + studentProgress.needsAttention}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Calendar className="h-4 w-4 mr-2" />
              Total Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {meetingsTimeline.values.reduce((a, b) => a + b, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <TrendingUp className="h-4 w-4 mr-2" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((studentProgress.improved / 
                (studentProgress.improved + studentProgress.stable + studentProgress.needsAttention)) * 100)}%
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <FileText className="h-4 w-4 mr-2" />
              Total Interventions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(interventionMetrics).reduce((a, b) => a + b, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Intervention Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={[
                interventionMetrics.academic,
                interventionMetrics.behavioral,
                interventionMetrics.social,
                interventionMetrics.career
              ]}
              labels={[
                'Academic',
                'Behavioral',
                'Social',
                'Career'
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Student Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={[
                studentProgress.improved,
                studentProgress.stable,
                studentProgress.needsAttention
              ]}
              labels={['Improved', 'Stable', 'Needs Attention']}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Timeline Chart */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Meetings Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={meetingsTimeline.values}
            labels={meetingsTimeline.labels}
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  );
}
