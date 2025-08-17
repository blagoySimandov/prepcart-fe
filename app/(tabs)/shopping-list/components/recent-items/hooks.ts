import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useUserService } from "@/src/user";
import { useCallback, useState, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { fetchRecentItems } from "./query";
import { HAPTIC_TYPES } from "./constants";

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

export const useHapticFeedback = () => {
  const triggerHaptic = useCallback((type: keyof typeof HAPTIC_TYPES) => {
    if (process.env.EXPO_OS === "ios") {
      switch (type) {
        case "light":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case "medium":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case "heavy":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case "selection":
          Haptics.selectionAsync();
          break;
        case "success":
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case "warning":
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case "error":
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        default:
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  }, []);

  return { triggerHaptic };
};

const STORAGE_KEY = "@recent_items_collapsed";

export const useCollapsibleSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const chevronAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadPersistedState = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          const collapsed = JSON.parse(stored);
          setIsCollapsed(collapsed);
          chevronAnim.setValue(collapsed ? 1 : 0);
          opacityAnim.setValue(collapsed ? 0 : 1);
        }
      } catch (error) {
        console.warn("Failed to load collapsed state:", error);
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

    // Animate opacity and height together
    Animated.timing(opacityAnim, {
      toValue: newCollapsed ? 0 : 1,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      useNativeDriver: false, // Required for height animation
    }).start();

    // Animate chevron rotation
    Animated.spring(chevronAnim, {
      toValue: newCollapsed ? 1 : 0,
      tension: 120,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [isCollapsed, persistState, chevronAnim, opacityAnim]);

  const chevronRotation = chevronAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"], // 0deg = down (expanded), -90deg = left (collapsed)
  });

  return {
    isCollapsed,
    toggleCollapsed,
    chevronRotation,
    opacityAnim,
  };
};
