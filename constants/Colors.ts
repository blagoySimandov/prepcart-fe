/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#D4742A";
const tintColorDark = "#F7B373";

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
  },
  dark: {
    text: "#F5E6D3",
    background: "#1A0F08",
    tint: tintColorDark,
    icon: "#CD853F",
    tabIconDefault: "#A0522D",
    tabIconSelected: tintColorDark,
    card: "#2D1B0E",
    border: "#4A3426",
    accent: "#FF8C42",
    secondary: "#8B4513",
    success: "#556B2F",
    warning: "#B8860B",
    error: "#A0522D",
    disabled: "#555555",
  },
};
