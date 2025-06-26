import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Type-safe admin initialization
const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Initialize Firebase Admin only if it hasn't been initialized
const adminApp = !getApps().length 
  ? initializeApp({
      credential: cert(firebaseAdminConfig),
      projectId: process.env.FIREBASE_PROJECT_ID,
    })
  : getApps()[0];

// Export server-side Firebase instances
export const adminDb = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);

// Type-safe exports
export type { UserRecord } from 'firebase-admin/auth';
export type { Timestamp, DocumentData } from 'firebase-admin/firestore';
