import { StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/colors";
import { ANIMATION, BORDER_RADIUS, SHADOW_STYLES, SPACING, FONT_SIZES, FONT_WEIGHTS } from "@/constants/ui";
import { MODAL_MAX_WIDTH } from "../../constants";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: ANIMATION.modal.overlay.backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      padding: SPACING.xl,
    },
    modal: {
      backgroundColor: colors.background,
      borderRadius: BORDER_RADIUS.large,
      padding: SPACING.xl,
      width: "100%",
      maxWidth: MODAL_MAX_WIDTH,
      ...SHADOW_STYLES.heavy,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SPACING.large,
    },
    title: {
      fontSize: FONT_SIZES.large,
      fontWeight: FONT_WEIGHTS.semiBold,
    },
  });

  return { styles, colors };
}