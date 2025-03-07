import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export type UserRole = 'student' | 'teacher' | 'admin' | 'counselor' | 'social_worker' | 'parent';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
  photoURL?: string;
  createdAt: number;
  lastLogin: number;
}

export interface AuthUser extends User {
  role?: UserRole;
  profile?: UserProfile;
}


export const signUp = async (email: string, password: string, role: UserRole, displayName?: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create user profile in Firestore
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email!,
    role,
    displayName: displayName || user.email!.split('@')[0],
    photoURL: user.photoURL || undefined,
    createdAt: Date.now(),
    lastLogin: Date.now(),
  };

  await setDoc(doc(db, 'users', user.uid), userProfile);
  return { ...user, role, profile: userProfile };
};

export const logIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update last login time
  const userDoc = doc(db, 'users', user.uid);
  await updateDoc(userDoc, { lastLogin: Date.now() });

  // Get user profile
  const profile = await getDoc(userDoc);
  if (!profile.exists()) {
    throw new Error('User profile not found');
  }

  return { ...user, ...profile.data() } as AuthUser;
};

export const logOut = async () => {
  await signOut(auth);
};

export const useUser = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              const profile = userDoc.data() as UserProfile;
              setUser({ ...firebaseUser, role: profile.role, profile });
            } else {
              setUser(firebaseUser as AuthUser);
            }
          } catch (err) {
            console.error('Error fetching user profile:', err);
            setUser(firebaseUser as AuthUser);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
};

// Helper function to check if user has required role
export const hasRole = (user: AuthUser | null, requiredRole: UserRole): boolean => {
  return user?.role === requiredRole;
};

// Helper function to check if user has one of required roles
export const hasAnyRole = (user: AuthUser | null, requiredRoles: UserRole[]): boolean => {
  return user?.role ? requiredRoles.includes(user.role) : false;
};