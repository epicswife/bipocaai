"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { AuthUser } from "@/types/auth";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

// Create a default implementation for the context
const defaultLogout = async () => {
  console.warn("Logout function called outside of AuthProvider");
};

// Create the context with meaningful default values
const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true, 
  logout: defaultLogout
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      // The onAuthStateChanged listener will handle setting user to null
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let unsubscribe: () => void;
    
    const setupAuthListener = async () => {
      try {
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
          try {
            if (firebaseUser) {
              const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser({ 
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  role: userData.role || "student",
                  photoURL: firebaseUser.photoURL,
                  displayName: firebaseUser.displayName,
                  emailVerified: firebaseUser.emailVerified,
                  metadata: {
                    creationTime: firebaseUser.metadata.creationTime || undefined,
                    lastSignInTime: firebaseUser.metadata.lastSignInTime || undefined
                  },
                  providerData: firebaseUser.providerData.map(provider => ({
                    providerId: provider.providerId,
                    uid: provider.uid,
                    displayName: provider.displayName,
                    email: provider.email,
                    photoURL: provider.photoURL
                  })),
                  // Custom fields from Firestore
                  classIds: userData.classIds || [],
                  assignmentIds: userData.assignmentIds || [],
                  achievementIds: userData.achievementIds || [],
                  studentIds: userData.studentIds || [],
                  subjectIds: userData.subjectIds || []
                });
              } else {
                // Create user document if it doesn't exist
                const newUser: AuthUser = {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  role: "student",
                  photoURL: firebaseUser.photoURL,
                  displayName: firebaseUser.displayName,
                  emailVerified: firebaseUser.emailVerified,
                  metadata: {
                    creationTime: firebaseUser.metadata.creationTime || undefined,
                    lastSignInTime: firebaseUser.metadata.lastSignInTime || undefined
                  },
                  providerData: firebaseUser.providerData.map(provider => ({
                    providerId: provider.providerId,
                    uid: provider.uid,
                    displayName: provider.displayName,
                    email: provider.email,
                    photoURL: provider.photoURL
                  })),
                  classIds: [],
                  assignmentIds: [],
                  achievementIds: []
                };
                await setDoc(doc(db, "users", firebaseUser.uid), newUser);
                setUser(newUser);
              }
            } else {
              setUser(null);
            }
          } catch (error) {
            console.error("Error processing auth state change:", error);
            setUser(null);
          } finally {
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error setting up auth listener:", error);
        setLoading(false);
      }
    };

    setupAuthListener();
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Create a stable context value object to prevent unnecessary re-renders
  const contextValue = {
    user,
    loading,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);