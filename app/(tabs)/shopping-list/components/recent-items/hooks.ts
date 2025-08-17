import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useUserService } from "@/src/user";
import { useCallback } from "react";
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
    if (process.env.EXPO_OS === 'ios') {
      switch (type) {
        case 'light':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'selection':
          Haptics.selectionAsync();
          break;
        case 'success':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'warning':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case 'error':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        default:
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  }, []);

  return { triggerHaptic };
};
