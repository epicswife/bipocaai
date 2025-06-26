"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { Target, TrendingUp, ArrowUp, ArrowDown, Minus } from 'lucide-react';


interface ProgressRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: Timestamp;
  academicScore: number;
  behavioralScore: number;
  emotionalScore: number;
  notes: string;
  trend: 'improving' | 'declining' | 'stable';
}

interface Student {
  id: string;
  name: string;
}

export default function ProgressTrackingPage() {
  const { user, loading } = useAuth();
  const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;

    try {
      // Fetch students
      const studentsQuery = query(
        collection(db, 'students'),
        where('counselorId', '==', user.uid)
      );
      const studentsSnapshot = await getDocs(studentsQuery);
      const studentsData = studentsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));
      setStudents(studentsData);

      // Fetch progress records
      const progressQuery = query(
        collection(db, 'progress'),
        where('counselorId', '==', user.uid),
        orderBy('date', 'desc')
      );
      const progressSnapshot = await getDocs(progressQuery);
      const progressData = progressSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProgressRecord[];
      setProgressRecords(progressData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getTrendIcon = (trend: ProgressRecord['trend']) => {
    switch (trend) {
      case 'improving':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'declining':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  if (loading || isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-12">Please log in to view progress tracking.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-primary">Progress Tracking</h1>
        <Button className="bg-primary">
          <Target className="mr-2 h-4 w-4" />
          New Progress Entry
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <TrendingUp className="h-4 w-4 mr-2" />
              Improving Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progressRecords.filter(r => r.trend === 'improving').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Target className="h-4 w-4 mr-2" />
              Stable Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progressRecords.filter(r => r.trend === 'stable').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Target className="h-4 w-4 mr-2" />
              Needs Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progressRecords.filter(r => r.trend === 'declining').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {students.map(student => {
          const studentRecords = progressRecords.filter(r => r.studentId === student.id);
          if (studentRecords.length === 0) return null;

          const latestRecord = studentRecords[0];
          return (
            <Card key={student.id} className="border-primary/20">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    {student.name}
                    {getTrendIcon(latestRecord.trend)}
                  </CardTitle>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Academic Progress</p>
                    <p className="text-lg font-semibold">{latestRecord.academicScore}/10</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Behavioral Progress</p>
                    <p className="text-lg font-semibold">{latestRecord.behavioralScore}/10</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Emotional Progress</p>
                    <p className="text-lg font-semibold">{latestRecord.emotionalScore}/10</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{latestRecord.notes}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
