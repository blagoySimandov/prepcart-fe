/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#D4742A";
const tintColorDark = "#E67E22";

export const Colors = {
  light: {
    text: "#2D1B0E",
    background: "#FFF8F3",
    tint: tintColorLight,
    icon: "#8B4513",
    tabIconDefault: "#A0522D",
    tabIconSelected: tintColorLight,
    card: "#FFFFFF",
    border: "#E8D5C4",
    accent: "#FF8C42",
    secondary: "#DEB887",
    success: "#8FBC8F",
    warning: "#F4A460",
    error: "#CD853F",
    disabled: "#CCCCCC",
    quantity: "#4A90E2",
    unit: "#F5A623",
    name: "#7ED321",
  },
  dark: {
    text: "#F0F0F0", // Much lighter, better contrast
    background: "#0F0F0F", // True dark background
    tint: tintColorDark, // Brighter orange for visibility
    icon: "#B8B8B8", // Neutral gray instead of brown
    tabIconDefault: "#6B6B6B", // Muted gray for inactive tabs
    tabIconSelected: tintColorDark,
    card: "#1A1A1A", // Dark gray instead of brown
    border: "#2A2A2A", // Subtle gray border
    accent: "#E67E22", // Warmer, more muted orange
    secondary: "#4A4A4A", // Neutral gray instead of brown
    success: "#4CAF50", // Modern green
    warning: "#FFA726", // Bright orange warning
    error: "#F44336", // Clear red error
    disabled: "#424242", // Darker disabled state
    quantity: "#64B5F6", // Brighter blue for readability
    unit: "#FFB74D", // Warmer orange for units
    name: "#81C784", // Softer green for names
  },
};
