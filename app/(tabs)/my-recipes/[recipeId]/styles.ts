import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";
import {
  BORDER_RADIUS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
} from "@/constants/ui";
import { MODIFICATION_COLORS, MODIFICATION_STATUS } from "./constants";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    resetSection: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: SPACING.large,
    },
    resetButton: {
      backgroundColor: colors.background,
      paddingHorizontal: SPACING.large,
      paddingVertical: SPACING.medium,
      borderRadius: BORDER_RADIUS.medium,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: SPACING.small,
      borderWidth: 1.5,
      borderColor: MODIFICATION_COLORS[MODIFICATION_STATUS.modify],
    },
    resetButtonText: {
      fontSize: FONT_SIZES.medium,
      fontWeight: FONT_WEIGHTS.semiBold,
      color: MODIFICATION_COLORS[MODIFICATION_STATUS.modify],
    },
    floatingButton: {
      position: "absolute",
      bottom: SPACING.xl + 100,
      right: SPACING.xl,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.tint,
      justifyContent: "center",
      alignItems: "center",
      elevation: 8,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      shadowColor: "#000",
    },
    unitSystemToggleContainer: {
      paddingHorizontal: SPACING.xl,
      marginBottom: SPACING.medium,
      alignItems: "flex-start",
    },
    backButton: {
      position: "absolute",
      top: SPACING.medium,
      left: SPACING.large,
      zIndex: 1,
      backgroundColor: colors.background,
      borderRadius: BORDER_RADIUS.small,
      padding: SPACING.small,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowColor: "#000",
      elevation: 2,
    },
  });

  return { styles, colors };
}
