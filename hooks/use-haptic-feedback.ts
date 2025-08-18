import { useCallback } from "react";
import * as Haptics from "expo-haptics";

export const HAPTIC_TYPES = {
  light: "light" as const,
  medium: "medium" as const,
  heavy: "heavy" as const,
  selection: "selection" as const,
  success: "success" as const,
  warning: "warning" as const,
  error: "error" as const,
} as const;

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
