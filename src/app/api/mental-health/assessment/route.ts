import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

// Initialize Firebase Admin if not already initialized
try {
  admin.app();
} catch {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

// Get Firestore instance
const db = admin.firestore();

// Type definitions for mental health assessment
interface MentalHealthAssessment {
  userId: string;
  userName?: string | null;
  userEmail?: string | null;
  anonymous: boolean;
  answers: Record<string, number | string | string[]>;
  score: {
    anxiety: number;
    depression: number;
    stress: number;
    wellbeing: number;
  };
  recommendedResources: string[];
  timestamp: Timestamp;
  createdAt: Timestamp;
}

// POST handler for creating a new assessment
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.userId || !data.answers || !data.score || !data.recommendedResources) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Add server timestamps
    const assessmentData: MentalHealthAssessment = {
      ...data,
      createdAt: admin.firestore.Timestamp.now(),
      timestamp: admin.firestore.Timestamp.now()
    };
    
    // Save to Firestore
    const docRef = await db.collection('mentalHealthAssessments').add(assessmentData);
    
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating assessment:', error);
    return NextResponse.json(
      { error: 'Failed to create assessment' },
      { status: 500 }
    );
  }
}

// GET handler for retrieving assessments by user ID
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const snapshot = await db
      .collection('mentalHealthAssessments')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .get();
    
    const assessments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json({ assessments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assessments' },
      { status: 500 }
    );
  }
}
