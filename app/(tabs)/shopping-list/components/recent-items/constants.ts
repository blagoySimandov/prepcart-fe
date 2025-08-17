export const CARD_DIMENSIONS = {
  width: 140,
  height: 80,
  borderRadius: 16,
  padding: 16,
  margin: 8,
} as const;

export const ANIMATION_CONFIG = {
  spring: {
    damping: 15,
    mass: 1,
    stiffness: 120,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
  press: {
    scale: 0.95,
    duration: 150,
  },
  hover: {
    scale: 1.02,
    duration: 200,
  },
  fadeIn: {
    duration: 300,
    delay: 100,
  },
} as const;

export const SHADOWS = {
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  pressed: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },
  floating: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
} as const;

export const TYPOGRAPHY = {
  itemName: {
    fontSize: 15,
    fontWeight: "600" as const,
    lineHeight: 20,
  },
  itemDetails: {
    fontSize: 13,
    fontWeight: "500" as const,
    lineHeight: 16,
  },
  frequency: {
    fontSize: 11,
    fontWeight: "500" as const,
    lineHeight: 14,
  },
} as const;

export const LAYOUT = {
  containerPadding: 16,
  itemSpacing: 12,
  contentPadding: 12,
  iconSize: 14,
  frequencyBadgeSize: 6,
} as const;

export const HAPTIC_TYPES = {
  light: "light" as const,
  medium: "medium" as const,
  heavy: "heavy" as const,
  selection: "selection" as const,
  success: "success" as const,
  warning: "warning" as const,
  error: "error" as const,
} as const;

export const ACCESSIBILITY = {
  minimumTouchTarget: 44,
  labels: {
    recentItem: "Recent item",
    addToList: "Add to shopping list",
    editItem: "Edit item",
    removeFromRecents: "Remove from recent items",
  },
  hints: {
    tapToAdd: "Tap to add to your shopping list",
    longPressToEdit: "Long press to edit or remove",
  },
} as const;