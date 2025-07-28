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
  });

  return { styles, colors };
}
