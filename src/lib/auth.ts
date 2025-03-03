import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const signUp = async (email: string, password: string, role: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // Optionally save role to Firestore here (post-MVP)
  return userCredential.user;
};

export const logIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logOut = async () => {
  await signOut(auth);
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
};