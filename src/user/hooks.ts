import { UserStatistics } from "@/app/(tabs)/profile/types";
import { db } from "@/firebaseConfig";
import { doc, onSnapshot } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { useUserService } from "./context";
import { ShoppingItem } from "./shopping-list/types";

const calculateSavingsFromItems = (
  items: ShoppingItem[]
): Record<string, number> => {
  const savings: Record<string, number> = {};

  items.forEach((item) => {
    if (item.detectedDiscounts && item.detectedDiscounts.length > 0) {
      const bestDiscount = item.detectedDiscounts.reduce((best, current) =>
        current.discount_percent > best.discount_percent ? current : best
      );
      const itemSaving =
        bestDiscount.price_before_discount_local *
        (bestDiscount.discount_percent / 100);
      const currency = bestDiscount.currency_local || "EUR"; // Default currency

      savings[currency] = (savings[currency] || 0) + itemSaving;
    }
  });

  return savings;
};

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
    if (!userService) {
      setLoading(false);
      setStats(null);
      return;
    }

    let basicStats: Partial<UserStatistics> = {
      totalDiscoveredDiscounts: 0,
    };
    let activeItems: ShoppingItem[] = [];
    let historyItems: ShoppingItem[] = [];
    let activeItemsLoading = true;
    let historyLoading = true;
    let statsLoading = true;

    const recompute = () => {
      if (activeItemsLoading || historyLoading || statsLoading) {
        setLoading(true);
        return;
      }

      const completedItemsSavings = calculateSavingsFromItems(
        activeItems.filter((i) => i.completed)
      );
      const historySavings = calculateSavingsFromItems(historyItems);

      const totalSavings: Record<string, number> = {};

      Object.keys({ ...completedItemsSavings, ...historySavings }).forEach(
        (currency) => {
          totalSavings[currency] =
            (completedItemsSavings[currency] || 0) +
            (historySavings[currency] || 0);
        }
      );

      setStats({
        totalDiscoveredDiscounts: basicStats.totalDiscoveredDiscounts || 0,
        totalSavings: totalSavings,
      });
      setLoading(false);
    };

    const userDocRef = doc(db, "users", userService.userId);
    const unsubStats = onSnapshot(userDocRef, (doc) => {
      statsLoading = false;
      if (doc.exists()) {
        const data = doc.data();
        if (data && data.statistics) {
          basicStats = data.statistics;
        }
      }
      recompute();
    });

    const unsubActiveList = userService.shoppingList.onListUpdate((items) => {
      activeItemsLoading = false;
      activeItems = items;
      recompute();
    });

    const unsubHistory = userService.shoppingList.onHistoryUpdate((items) => {
      historyLoading = false;
      historyItems = items;
      recompute();
    });

    return () => {
      unsubStats();
      unsubActiveList();
      unsubHistory();
    };
  }, [userService]); // userService is now stable due to the context

  return { stats, loading };
}
