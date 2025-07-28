import { Colors, COMMON_COLORS } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from "@/constants/ui";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      marginBottom: SPACING.xxl,
      paddingHorizontal: SPACING.xl,
      paddingTop: SPACING.xl,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: SPACING.small,
    },
    title: {
      fontSize: 32,
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: 38,
      flex: 1,
    },
    modifiedBadge: {
      backgroundColor: COMMON_COLORS.warning,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: BORDER_RADIUS.medium,
      marginTop: SPACING.small,
    },
    modifiedBadgeText: {
      fontSize: 11,
      fontWeight: FONT_WEIGHTS.semiBold,
      color: COMMON_COLORS.white,
      textTransform: "uppercase",
    },
  });

  return { styles, colors };
}
