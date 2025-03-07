"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { Heart, BookOpen, Brain, Target } from 'lucide-react';

interface SupportCase {
  id: string;
  studentName: string;
  type: 'academic' | 'behavioral' | 'emotional' | 'career';
  status: 'active' | 'completed' | 'pending';
  priority: 'high' | 'medium' | 'low';
  lastUpdated: Date;
  description: string;
}

export default function StudentSupportPage() {
  const { user, loading } = useAuth();
  const [supportCases, setSupportCases] = useState<SupportCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSupportCases = useCallback(async () => {
    if (!user) return;

    try {
      const casesQuery = query(
        collection(db, 'supportCases'),
        where('counselorId', '==', user.uid),
        orderBy('lastUpdated', 'desc'),
        limit(10)
      );
      
      const snapshot = await getDocs(casesQuery);
      const cases = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SupportCase[];
      
      setSupportCases(cases);
    } catch (error) {
      console.error('Error fetching support cases:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSupportCases();
  }, [fetchSupportCases]);

  if (loading || isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-12">Please log in to view student support cases.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-primary">Student Support</h1>
        <Button className="bg-primary">
          <Heart className="mr-2 h-4 w-4" />
          New Support Case
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <BookOpen className="h-4 w-4 mr-2" />
              Academic Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {supportCases.filter(c => c.type === 'academic').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Target className="h-4 w-4 mr-2" />
              Behavioral Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {supportCases.filter(c => c.type === 'behavioral').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Brain className="h-4 w-4 mr-2" />
              Emotional Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {supportCases.filter(c => c.type === 'emotional').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Target className="h-4 w-4 mr-2" />
              Career Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {supportCases.filter(c => c.type === 'career').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {supportCases.map(supportCase => (
          <Card key={supportCase.id} className="border-primary/20">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">{supportCase.studentName}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  supportCase.priority === 'high' ? 'bg-red-100 text-red-800' :
                  supportCase.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {supportCase.priority.charAt(0).toUpperCase() + supportCase.priority.slice(1)} Priority
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{supportCase.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className={`px-2 py-1 rounded-full ${
                  supportCase.status === 'active' ? 'bg-blue-100 text-blue-800' :
                  supportCase.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {supportCase.status.charAt(0).toUpperCase() + supportCase.status.slice(1)}
                </span>
                <span className="text-muted-foreground">
                  Last updated: {supportCase.lastUpdated.toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
