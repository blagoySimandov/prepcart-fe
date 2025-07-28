import { StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/colors";
import { FONT_SIZES, FONT_WEIGHTS, SPACING } from "@/constants/ui";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      marginBottom: SPACING.medium,
    },
    label: {
      fontSize: FONT_SIZES.body,
      fontWeight: FONT_WEIGHTS.semiBold,
      color: colors.tabIconDefault,
      marginBottom: SPACING.xs,
    },
    text: {
      fontSize: FONT_SIZES.body,
      lineHeight: 20,
    },
    strikethroughText: {
      textDecorationLine: "line-through",
      color: colors.tabIconDefault,
    },
  });

  return { styles, colors };
}