import { auth } from "@/firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { UserService } from "../user/service";
import { authenticate } from "./authenticate";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userService = new UserService(user.uid);
        await userService.createUserProfileIfNotExists({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      return await authenticate();
    } catch (error) {
      console.error("Error during sign in with Google:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error during sign out:", error);
      throw error;
    }
  };

  const isSignedIn = () => {
    return !!auth.currentUser;
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
    isSignedIn,
  };
}
