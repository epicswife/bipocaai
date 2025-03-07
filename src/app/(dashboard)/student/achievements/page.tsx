"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Star, Medal, Share, Target, Clock, Bookmark, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { useUser } from "@/lib/auth";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  QueryConstraint,
  Timestamp,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

import ProtectedRoute from "@/components/auth/protected-route";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



const addStyles = (styles: string) => {
  if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
};

// Helper function to get rarity color
const getRarityColor = (rarity?: string) => {
  switch (rarity) {
    case 'Legendary':
      return 'bg-yellow-500 text-black';
    case 'Epic':
      return 'bg-purple-500';
    case 'Rare':
      return 'bg-blue-500';
    case 'Uncommon':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  category: string;
  dateEarned: Timestamp | null;
  isNew: boolean;
  relatedAchievements: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  studentId: string;
  requirements: {
    type: string;
    target: number;
    current: number;
  };
}

interface AchievementStats {
  earned: number;
  totalAchievements: number;
  totalPoints: number;
  level: number;
  nextMilestone: number;
}

const getAchievementIcon = (category: string) => {
  switch (category) {
    case 'Learning':
      return <Trophy className="h-5 w-5 text-amber-500" />;
    case 'Participation':
      return <Star className="h-5 w-5 text-yellow-500" />;
    case 'Excellence':
      return <Medal className="h-5 w-5 text-blue-500" />;
    default:
      return <Trophy className="h-5 w-5 text-amber-500" />;
  }
};

// Add custom animation keyframes
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px) translateX(-50%); }
    to { opacity: 1; transform: translateY(0) translateX(-50%); }
  }

  @keyframes pulse-ring {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }

  .animate-pulse-ring {
    animation: pulse-ring 2s infinite;
  }
`;



export default function AchievementsPage() {
  const { user } = useUser();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [displayStats, setDisplayStats] = useState<AchievementStats>({
    earned: 0,
    totalAchievements: 0,
    totalPoints: 0,
    level: 1,
    nextMilestone: 500
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadAchievements = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const achievementsRef = collection(db, "achievements");
      const queryConstraints: QueryConstraint[] = [
        where("studentId", "==", user.uid),
        orderBy("createdAt", "desc")
      ];

      if (activeTab !== 'all') {
        queryConstraints.push(where("category", "==", activeTab));
      }

      const finalQuery = query(achievementsRef, ...queryConstraints);
      const snapshot = await getDocs(finalQuery);
      const achievementsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Achievement[];

      setAchievements(achievementsList);

      // Calculate stats
      const earnedCount = achievementsList.filter(a => a.progress === 100).length;
      const totalPoints = achievementsList.reduce((sum, a) => 
        a.progress === 100 ? sum + a.points : sum, 0
      );
      const level = Math.floor(totalPoints / 500) + 1;
      const nextMilestone = level * 500;

      setDisplayStats({
        earned: earnedCount,
        totalAchievements: achievementsList.length,
        totalPoints,
        level,
        nextMilestone
      });
    } catch (error) {
      console.error("Error loading achievements:", error);
      toast.error("Failed to load achievements");
    } finally {
      setIsLoading(false);
    }
  }, [user, activeTab]);

  useEffect(() => {
    addStyles(styles);
    if (user) {
      loadAchievements();
    }
  }, [loadAchievements, user]);

  const handleCardClick = (index: number, achievement: Achievement) => {
    setActiveCard(activeCard === index ? null : index);
    setShowTooltip(true);
    if (achievement) {
      setSelectedAchievement(achievement);
      if (achievement.progress === 100 && !achievement.dateEarned) {
        // Show unlock animation and toast
        toast.success(`Achievement Unlocked: ${achievement.title}!`, {
          duration: 4000,
          icon: getAchievementIcon(achievement.category),
        });
      }
    }
    setTimeout(() => setShowTooltip(false), 2000);
  };

  // Achievement level rewards
  const levelRewards = React.useMemo(() => ({
    3: "District recognition certificate",
    5: "Academic excellence medal",
    7: "Leadership program invitation",
    10: "College recommendation letter"
  }), []);

  // District sharing function
  const shareWithDistrict = async (achievementId: string) => {
    if (!user) return;

    try {
      const achievementRef = doc(db, "achievements", achievementId);
      await updateDoc(achievementRef, {
        shared: true,
        sharedAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      toast.success('Achievement shared with district!');
    } catch (error) {
      console.error('Error sharing achievement:', error);
      toast.error('Failed to share achievement. Please try again.');
    }
  };

  // Filter achievements by category
  const filterByCategory = (category: string) => {
    if (category === 'all') return achievements;
    return achievements.filter(a => 
      a.category.toLowerCase() === category.toLowerCase()
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredFeature="track_progress">
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">My Achievements</h1>
          <p className="text-muted-foreground mb-6">Track your progress and earn recognition for your learning journey</p>
        </motion.div>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Achievement Progress</CardTitle>
            <CardDescription>
              Track your learning journey and unlock rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Achievements</p>
                  <h3 className="text-2xl font-bold">{displayStats.earned} / {displayStats.totalAchievements}</h3>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Points</p>
                  <h3 className="text-2xl font-bold">{displayStats.totalPoints}</h3>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Level {displayStats.level}</span>
                  <span>{displayStats.totalPoints} / {displayStats.nextMilestone}</span>
                </div>
                <Progress value={(displayStats.totalPoints / displayStats.nextMilestone) * 100} className="h-2" />
              </div>

              {displayStats.level in levelRewards && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-medium">Next Reward</p>
                  <p className="text-xs text-muted-foreground">
                    {levelRewards[displayStats.level as keyof typeof levelRewards]}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Link to Rewards */}
        <Card className="mb-6 max-w-7xl mx-auto mt-6">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Achievement Rewards</CardTitle>
            <CardDescription>Earn points through achievements and unlock exclusive rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm">You have <span className="font-medium">{displayStats.totalPoints} points</span> available</p>
                <p className="text-xs text-muted-foreground">Next level reward at Level {displayStats.level + 1}</p>
              </div>
              <Button asChild variant="default">
                <Link href="/dashboard/student/achievements/rewards">View Rewards</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 px-2 sm:px-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card 
              className={`rounded-full aspect-square w-[140px] mx-auto transition-all duration-300 ${activeCard === 0 ? 'ring-4 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-primary/50 hover:ring-offset-1'}`}
              onClick={() => handleCardClick(0, achievements[0])}
            >
              <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center text-center relative group cursor-pointer hover:scale-105 transition-all">
                {showTooltip && activeCard === 0 && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs sm:text-sm animate-fade-in">
                    Share your progress!
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                <Trophy className="h-6 w-6 text-amber-500 mb-2" />
                <p className="text-xs text-muted-foreground">Achievements Earned</p>
                <p className="text-xl font-bold">{displayStats.earned}/{displayStats.totalAchievements}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => shareWithDistrict(achievements[0]?.id || '')}
                >
                  <Share className="h-4 w-4 mr-1" /> Share
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card 
              className={`rounded-full aspect-square w-[140px] mx-auto transition-all duration-300 ${activeCard === 1 ? 'ring-4 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-primary/50 hover:ring-offset-1'}`}
              onClick={() => handleCardClick(1, achievements[1])}
            >
              <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center text-center relative group cursor-pointer hover:scale-105 transition-all">
                {showTooltip && activeCard === 1 && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs sm:text-sm animate-fade-in">
                    {displayStats.totalPoints} points earned!
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                <Star className="h-6 w-6 text-yellow-500 mb-2" />
                <p className="text-xs text-muted-foreground">Total Points</p>
                <p className="text-xl font-bold">{displayStats.totalPoints}</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card 
              className={`rounded-full aspect-square w-[140px] mx-auto transition-all duration-300 ${activeCard === 2 ? 'ring-4 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-primary/50 hover:ring-offset-1'}`}
              onClick={() => handleCardClick(2, achievements[2])}
            >
              <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center text-center relative group cursor-pointer hover:scale-105 transition-all">
                {showTooltip && activeCard === 2 && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs sm:text-sm animate-fade-in">
                    Level {displayStats.level} Scholar
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                <Medal className="h-6 w-6 text-blue-500 mb-2" />
                <p className="text-xs text-muted-foreground">Scholar Level</p>
                <p className="text-xl font-bold">{displayStats.level}</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card 
              className={`rounded-full aspect-square w-[140px] mx-auto transition-all duration-300 ${activeCard === 3 ? 'ring-4 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-primary/50 hover:ring-offset-1'}`}
              onClick={() => handleCardClick(3, achievements[3])}
            >
              <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center text-center relative group cursor-pointer hover:scale-105 transition-all">
                {showTooltip && activeCard === 3 && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs sm:text-sm animate-fade-in">
                    Next reward at {displayStats.nextMilestone} pts
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                <Target className="h-6 w-6 text-green-500 mb-2" />
                <p className="text-xs text-muted-foreground">Next Milestone</p>
                <p className="text-xl font-bold">{displayStats.nextMilestone} pts</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Achievement Details Dialog */}
        <Dialog open={selectedAchievement !== null} onOpenChange={() => setSelectedAchievement(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getAchievementIcon(selectedAchievement?.category || '')}
                {selectedAchievement?.title}
              </DialogTitle>
              <DialogDescription>
                {selectedAchievement?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Status</span>
                <Badge variant={selectedAchievement?.progress === 100 ? "default" : "secondary"}>
                  {selectedAchievement?.progress === 100 ? "Completed" : "In Progress"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Points</span>
                <span>{selectedAchievement?.points}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Rarity</span>
                <Badge className={getRarityColor(selectedAchievement?.rarity)}>
                  {selectedAchievement?.rarity}
                </Badge>
              </div>
              <Progress value={selectedAchievement?.progress} className="mt-2" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedAchievement(null)}>Close</Button>
              {selectedAchievement?.progress === 100 && (
                <Button onClick={() => shareWithDistrict(selectedAchievement.id)}>
                  <Share className="w-4 h-4 mr-2" /> Share
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Level Progress */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Level Progress</CardTitle>
            <CardDescription>Earn points to reach the next scholar level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level {displayStats.level}</span>
                <span>Level {displayStats.level + 1}</span>
              </div>
              <Progress value={(displayStats.totalPoints / displayStats.nextMilestone) * 100} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{displayStats.totalPoints} points</span>
                <span>{displayStats.nextMilestone} points needed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All</TabsTrigger>
            <TabsTrigger value="learning" onClick={() => setActiveTab('learning')}>Learning</TabsTrigger>
            <TabsTrigger value="social" onClick={() => setActiveTab('social')}>Social</TabsTrigger>
            <TabsTrigger value="general" onClick={() => setActiveTab('general')}>General</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterByCategory(activeTab).map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className={`h-full hover:shadow-md transition-all duration-300 ${achievement.progress === 100 ? 'border-amber-200' : 'opacity-80'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="mr-3 p-2 rounded-full bg-primary/10">
                            {getAchievementIcon(achievement.category)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg flex items-center">
                              {achievement.title}
                              {achievement.isNew && (
                                <Badge className="ml-2 bg-amber-100 text-amber-800 text-xs">New</Badge>
                              )}
                            </h3>
                            <Badge className={`text-xs mt-1 ${getRarityColor(achievement.rarity)}`}>{achievement.rarity}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-lg">{achievement.points}</span>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-4">{achievement.description}</p>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                      
                      {achievement.dateEarned && (
                        <div className="flex items-center text-xs text-muted-foreground mt-4">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Earned on {achievement.dateEarned?.toDate().toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between mt-4">
                        {achievement.progress === 100 ? (
                          <Button size="sm" variant="outline" className="text-xs" onClick={() => shareWithDistrict(achievement.id)}>
                            <Share className="h-3 w-3 mr-1" /> Share
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="text-xs">
                            <Bookmark className="h-3 w-3 mr-1" /> Set as Goal
                          </Button>
                        )}
                        <Button size="sm" className="text-xs" onClick={() => handleCardClick(index, achievement)}>
                          Details <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}