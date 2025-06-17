import { db } from "@/firebaseConfig";
import { useAuth } from "@/src/auth/hooks";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserService } from "./service";

export interface UserStatistics {
  totalDiscoveredDiscounts: number;
  totalSavings: Record<string, number>;
}

/**
 * A hook that provides an instance of the UserService
 * for the currently authenticated user.
 *
 * @returns {UserService | null} An instance of UserService, or null if the user is not authenticated.
 */
export function useUserService(): UserService | null {
  const { user } = useAuth();
  const [userService, setUserService] = useState<UserService | null>(null);

  useEffect(() => {
    if (user) {
      setUserService(new UserService(user.uid));
    } else {
      setUserService(null);
    }
  }, [user]);

  return userService;
}

/**
 * A hook that retrieves and provides real-time updates for the user's statistics.
 *
 * @returns {{ stats: UserStatistics | null, loading: boolean }}
 */
export function useUserStatistics(): {
  stats: UserStatistics | null;
  loading: boolean;
} {
  const userService = useUserService();
  const [stats, setStats] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userService) {
      setLoading(true);
      const userDocRef = doc(db, "users", userService.userId);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data.statistics) {
            setStats(data.statistics as UserStatistics);
          }
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setStats(null);
      setLoading(false);
    }
  }, [userService]);

  return { stats, loading };
}
