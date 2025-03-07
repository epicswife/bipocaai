"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { Award, Star, Trophy, Target, Medal, Heart } from 'lucide-react';

interface Achievement {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  description: string;
  category: 'academic' | 'behavioral' | 'emotional' | 'leadership';
  date: Timestamp;
  level: 'bronze' | 'silver' | 'gold';
  criteria: string[];
}

interface AchievementStats {
  academic: number;
  behavioral: number;
  emotional: number;
  leadership: number;
}

export default function AchievementsPage() {
  const { user, loading } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<AchievementStats>({
    academic: 0,
    behavioral: 0,
    emotional: 0,
    leadership: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchAchievements = useCallback(async () => {
    if (!user) return;

    try {
      const achievementsQuery = query(
        collection(db, 'achievements'),
        where('counselorId', '==', user.uid),
        orderBy('date', 'desc')
      );
      
      const snapshot = await getDocs(achievementsQuery);
      const achievementsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Achievement[];
      
      setAchievements(achievementsData);

      // Calculate stats
      const newStats = achievementsData.reduce((acc, achievement) => ({
        ...acc,
        [achievement.category]: acc[achievement.category as keyof AchievementStats] + 1
      }), {
        academic: 0,
        behavioral: 0,
        emotional: 0,
        leadership: 0
      });
      
      setStats(newStats);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const getLevelIcon = (level: Achievement['level']) => {
    switch (level) {
      case 'gold':
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 'silver':
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 'bronze':
        return <Award className="h-5 w-5 text-amber-700" />;
    }
  };

  if (loading || isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-12">Please log in to view achievements.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-primary">Student Achievements</h1>
        <Button className="bg-primary">
          <Award className="mr-2 h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Star className="h-4 w-4 mr-2" />
              Academic Excellence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.academic}</div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Target className="h-4 w-4 mr-2" />
              Behavioral Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.behavioral}</div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Heart className="h-4 w-4 mr-2" />
              Emotional Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.emotional}</div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-primary">
              <Trophy className="h-4 w-4 mr-2" />
              Leadership Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leadership}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {achievements.map(achievement => (
          <Card key={achievement.id} className="border-primary/20">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  {getLevelIcon(achievement.level)}
                  {achievement.title}
                </CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  achievement.category === 'academic' ? 'bg-blue-100 text-blue-800' :
                  achievement.category === 'behavioral' ? 'bg-green-100 text-green-800' :
                  achievement.category === 'emotional' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
              <div className="flex flex-wrap gap-2">
                {achievement.criteria.map((criterion, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {criterion}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Awarded to: {achievement.studentName} on {new Date(achievement.date.seconds * 1000).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
