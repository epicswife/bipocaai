"use client";

import React from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/protected-route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { RewardCard } from "./components/reward-card";
import { RewardHistoryList } from "./components/reward-history";
import { type Reward, type RewardHistory } from "./types";

// Mock data - replace with actual API calls
const mockRewards: Reward[] = [
  {
    id: 1,
    name: "Free Tutoring Session",
    description: "One-on-one tutoring session with a subject expert of your choice",
    points: 500,
    available: true,
    redeemed: false,
    category: "Learning",
    imageUrl: "/images/tutoring.jpg"
  },
  {
    id: 2,
    name: "College Prep Workshop",
    description: "Access to exclusive college preparation workshop and materials",
    points: 1000,
    available: true,
    redeemed: false,
    category: "Learning",
    imageUrl: "/images/college-prep.jpg"
  },
  {
    id: 3,
    name: "Mentorship Program",
    description: "Three-month mentorship program with an industry professional",
    points: 2000,
    available: false,
    redeemed: false,
    category: "Mentorship",
    imageUrl: "/images/mentorship.jpg"
  },
  {
    id: 4,
    name: "Summer Program Scholarship",
    description: "Partial scholarship for summer enrichment program",
    points: 3000,
    available: false,
    redeemed: false,
    category: "Special",
    expiryDate: "2025-08-31",
    imageUrl: "/images/scholarship.jpg"
  }
];

const mockHistory: RewardHistory[] = [
  {
    id: 1,
    rewardId: 1,
    studentId: "student-1",
    redeemedAt: "2025-02-15T10:30:00Z",
    status: "completed",
    points: 500
  },
  {
    id: 2,
    rewardId: 2,
    studentId: "student-1",
    redeemedAt: "2025-03-01T15:45:00Z",
    status: "pending",
    points: 1000
  }
];

export default function RewardsPage() {
  const [userPoints, setUserPoints] = React.useState(1500);
  const [currentTab, setCurrentTab] = React.useState("available");
  const nextMilestone = Math.ceil(userPoints / 500) * 500 + 500;
  const progress = Math.round((userPoints / nextMilestone) * 100);

  const handleRedeemReward = async (reward: Reward) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUserPoints(prev => prev - reward.points);
      toast.success(`Successfully redeemed: ${reward.name}`);
    } catch (error) {
      toast.error("Failed to redeem reward. Please try again.");
    }
  };

  function setActiveTab(value: string): void {
    setCurrentTab(value);
  }
  return (
    <ProtectedRoute requiredFeature="track_progress">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <Link 
            href="/dashboard/student/achievements" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Achievements
          </Link>
        </div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">My Rewards</h1>
          <p className="text-muted-foreground mb-6">
            Redeem your achievement points for exclusive rewards and opportunities
          </p>
        </motion.div>

        {/* Points Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Trophy className="h-6 w-6 text-amber-500" />
              Available Points
            </CardTitle>
            <CardDescription>
              You have {userPoints} points available to redeem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next reward tier</span>
                <span>{userPoints} / {nextMilestone} points</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Rewards Tabs */}
        <Tabs defaultValue="available" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="available">Available Rewards</TabsTrigger>
            <TabsTrigger value="history">Reward History</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockRewards.map(reward => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  userPoints={userPoints}
                  onRedeem={handleRedeemReward}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <RewardHistoryList history={mockHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
