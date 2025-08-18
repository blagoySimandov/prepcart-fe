import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useUserService } from "@/src/user";
import { useCallback, useState, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRecentItems } from "./query";

export const useRecentItems = () => {
  const user = useUserService();

  const q = useQuery({
    queryKey: ["recent-items", user?.userId].filter(Boolean) as string[],
    queryFn: fetchRecentItems,
    placeholderData: keepPreviousData,
    enabled: !!user?.userId,
  });

  return {
    recentItems: q.data || [],
    isLoading: q.isLoading,
  };
};

const STORAGE_KEY = "@recent_items_collapsed";

export const useCollapsibleSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const chevronAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current; // Start collapsed by default

  useEffect(() => {
    const loadPersistedState = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          const collapsed = JSON.parse(stored);
          setIsCollapsed(collapsed);
          chevronAnim.setValue(collapsed ? 1 : 0);
          opacityAnim.setValue(collapsed ? 0 : 1);
        } else {
          // No stored state - default to expanded
          setIsCollapsed(false);
          chevronAnim.setValue(0);
          opacityAnim.setValue(1);
        }
      } catch (error) {
        console.warn("Failed to load collapsed state:", error);
        // On error, default to expanded
        setIsCollapsed(false);
        chevronAnim.setValue(0);
        opacityAnim.setValue(1);
      }
    };

    loadPersistedState();
  }, [chevronAnim, opacityAnim]);

  const persistState = useCallback(async (collapsed: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed));
    } catch (error) {
      console.warn("Failed to persist collapsed state:", error);
    }
  }, []);

  const toggleCollapsed = useCallback(() => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    persistState(newCollapsed);

    Animated.timing(opacityAnim, {
      toValue: newCollapsed ? 0 : 1,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      useNativeDriver: false,
    }).start();

    Animated.spring(chevronAnim, {
      toValue: newCollapsed ? 1 : 0,
      tension: 120,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [isCollapsed, persistState, chevronAnim, opacityAnim]);

  const chevronRotation = chevronAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return {
    isCollapsed,
    toggleCollapsed,
    chevronRotation,
    opacityAnim,
  };
};
