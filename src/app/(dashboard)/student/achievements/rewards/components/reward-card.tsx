/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { type Reward } from "../types";

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (reward: Reward) => void;
}

export function RewardCard({ reward, userPoints, onRedeem }: RewardCardProps) {
  const isAvailable = userPoints >= reward.points && !reward.redeemed;
  const daysUntilExpiry = reward.expiryDate 
    ? Math.ceil((new Date(reward.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
    : null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`h-full ${!isAvailable ? 'opacity-60' : ''}`}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{reward.name}</CardTitle>
            <Badge variant={isAvailable ? "default" : "secondary"}>
              {reward.points} pts
            </Badge>
          </div>
          <CardDescription>{reward.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {reward.imageUrl && (
            <div className="relative w-full h-32 mb-4 rounded-md overflow-hidden">
              <img 
                src={reward.imageUrl} 
                alt={reward.name}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          {daysUntilExpiry && daysUntilExpiry > 0 && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              Expires in {daysUntilExpiry} days
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full"
            onClick={() => onRedeem(reward)}
            disabled={!isAvailable}
          >
            <Gift className="h-4 w-4 mr-2" />
            {reward.redeemed ? 'Redeemed' : isAvailable ? 'Redeem Reward' : 'Not Enough Points'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
