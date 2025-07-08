import { UserStatistics } from "@/app/(tabs)/profile/types";
import { db } from "@/firebaseConfig";
import { doc, onSnapshot } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { useUserService } from "./context";
import { ShoppingItem } from "./shopping-list/types";
import { calculateSavingsFromItems } from "./util";

type useUserStatisticsReturn = {
  stats: UserStatistics | null;
  loading: boolean;
};

function createInitialState() {
  return {
    basicStats: { totalDiscoveredDiscounts: 0 } as Partial<UserStatistics>,
    activeItems: [] as ShoppingItem[],
    historyItems: [] as ShoppingItem[],
    activeItemsLoading: true,
    historyLoading: true,
    statsLoading: true,
  };
}

function calculateTotalSavings(
  activeItems: ShoppingItem[],
  historyItems: ShoppingItem[],
): Record<string, number> {
  const completedItemsSavings = calculateSavingsFromItems(
    activeItems.filter((i) => i.completed),
  );
  const historySavings = calculateSavingsFromItems(historyItems);

  const totalSavings: Record<string, number> = {};
  Object.keys({ ...completedItemsSavings, ...historySavings }).forEach(
    (currency) => {
      totalSavings[currency] =
        (completedItemsSavings[currency] || 0) +
        (historySavings[currency] || 0);
    },
  );

  return totalSavings;
}

function createUserStatistics(
  basicStats: Partial<UserStatistics>,
  totalSavings: Record<string, number>,
): UserStatistics {
  return {
    totalDiscoveredDiscounts: basicStats.totalDiscoveredDiscounts || 0,
    totalSavings: totalSavings,
  };
}

function isAllDataLoaded(
  activeItemsLoading: boolean,
  historyLoading: boolean,
  statsLoading: boolean,
): boolean {
  return !activeItemsLoading && !historyLoading && !statsLoading;
}

function setupStatsListener(
  userService: any,
  state: ReturnType<typeof createInitialState>,
  recompute: () => void,
) {
  const userDocRef = doc(db, "users", userService.userId);
  return onSnapshot(userDocRef, (doc) => {
    state.statsLoading = false;
    if (doc.exists()) {
      const data = doc.data();
      if (data && data.statistics) {
        state.basicStats = data.statistics;
      }
    }
    recompute();
  });
}

function setupActiveItemsListener(
  userService: any,
  state: ReturnType<typeof createInitialState>,
  recompute: () => void,
) {
  return userService.shoppingList.onListUpdate((items: ShoppingItem[]) => {
    state.activeItemsLoading = false;
    state.activeItems = items;
    recompute();
  });
}

function setupHistoryListener(
  userService: any,
  state: ReturnType<typeof createInitialState>,
  recompute: () => void,
) {
  return userService.shoppingList.onHistoryUpdate((items: ShoppingItem[]) => {
    state.historyLoading = false;
    state.historyItems = items;
    recompute();
  });
}

function createRecomputeFunction(
  state: ReturnType<typeof createInitialState>,
  setStats: (stats: UserStatistics | null) => void,
  setLoading: (loading: boolean) => void,
) {
  return () => {
    if (
      !isAllDataLoaded(
        state.activeItemsLoading,
        state.historyLoading,
        state.statsLoading,
      )
    ) {
      setLoading(true);
      return;
    }

    const totalSavings = calculateTotalSavings(
      state.activeItems,
      state.historyItems,
    );
    const userStats = createUserStatistics(state.basicStats, totalSavings);

    setStats(userStats);
    setLoading(false);
  };
}

/**
 * A hook that retrieves and provides real-time updates for the user's statistics.
 *
 * @returns {{ stats: UserStatistics | null, loading: boolean }}
 */
export function useUserStatistics(): useUserStatisticsReturn {
  const userService = useUserService();
  const [stats, setStats] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userService) {
      setLoading(false);
      setStats(null);
      return;
    }

    const state = createInitialState();
    const recompute = createRecomputeFunction(state, setStats, setLoading);

    const unsubStats = setupStatsListener(userService, state, recompute);
    const unsubActiveList = setupActiveItemsListener(
      userService,
      state,
      recompute,
    );
    const unsubHistory = setupHistoryListener(userService, state, recompute);

    return () => {
      unsubStats();
      unsubActiveList();
      unsubHistory();
    };
  }, [userService]);

  return { stats, loading };
}
