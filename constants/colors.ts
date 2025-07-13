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
    // High contrast colors for badges and buttons
    badgeText: "#FFFFFF", // White for good contrast on orange
    buttonText: "#FFFFFF", // White for button text
    contrastText: "#1A1A1A", // Near black for high contrast needs
  },
  dark: {
    text: "#FFFFFF", // Pure white for better readability
    background: "#1C1C1E", // Warmer dark background (similar to iOS dark mode)
    tint: tintColorDark,
    icon: "#A8A8A8", // Lighter icon color for better visibility
    tabIconDefault: "#8A8A8A", // Lighter inactive tab icons
    tabIconSelected: tintColorDark,
    card: "#2C2C2E", // Lighter card background
    border: "#38383A", // More visible border
    accent: "#FF9F40", // Slightly warmer accent
    secondary: "#5A5A5C", // Lighter secondary color
    success: "#32D74B", // iOS-style green
    warning: "#FF9F0A", // iOS-style orange
    error: "#FF453A", // iOS-style red
    disabled: "#48484A", // Lighter disabled state
    quantity: "#007AFF", // iOS-style blue
    unit: "#FF9F0A", // Consistent with warning
    name: "#30D158", // iOS-style green for names
    // High contrast colors for badges and buttons
    badgeText: "#1A1A1A", // Dark color for good contrast on orange
    buttonText: "#FFFFFF", // White for button text
    contrastText: "#FFFFFF", // White for high contrast needs in dark mode
  },
};
