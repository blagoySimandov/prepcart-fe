import { User } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { AuthManager } from "./manager";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const authManager = useMemo(() => new AuthManager(), []);

  useEffect(() => {
    const unsubscribe = authManager.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [authManager]);

  const requireSignIn = async () => {
    if (!user) {
      await authManager.signInWithGoogle();
    }
    return user;
  };

  return {
    user,
    loading,
    signInWithGoogle: authManager.signInWithGoogle.bind(authManager),
    signOut: authManager.signOut.bind(authManager),
    isSignedIn: authManager.isSignedIn.bind(authManager),
    requireSignIn,
  };
}
