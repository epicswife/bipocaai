export interface Reward {
  id: number;
  name: string;
  description: string;
  points: number;
  available: boolean;
  redeemed: boolean;
  category: 'Learning' | 'Achievement' | 'Special' | 'Mentorship';
  expiryDate?: string;
  imageUrl?: string;
}

export interface RewardHistory {
  id: number;
  rewardId: number;
  studentId: string;
  redeemedAt: string;
  status: 'pending' | 'completed' | 'expired';
  points: number;
}

export interface RewardCategory {
  id: string;
  name: string;
  description: string;
  minPoints: number;
}
