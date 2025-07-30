import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/colors";
import { BORDER_RADIUS, FONT_SIZES, SPACING, SHADOW_STYLES } from "@/constants/ui";
import { StyleSheet } from "react-native";

export function useStyles() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: SPACING.large,
    },
    modalContent: {
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.xl,
      padding: SPACING.xxl,
      minWidth: 300,
      width: "100%",
      maxWidth: 400,
      ...SHADOW_STYLES.heavy,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SPACING.xl,
    },
    modalTitle: {
      fontSize: FONT_SIZES.xl,
      fontWeight: "700",
      color: colors.text,
      flex: 1,
    },
    closeButton: {
      padding: SPACING.small,
      borderRadius: BORDER_RADIUS.medium,
      backgroundColor: colors.border,
      marginLeft: SPACING.medium,
    },
    descriptionText: {
      fontSize: FONT_SIZES.body,
      color: colors.icon,
      marginBottom: SPACING.xl,
      lineHeight: 20,
    },
    inputContainer: {
      marginBottom: SPACING.xl,
    },
    inputLabel: {
      fontSize: FONT_SIZES.small,
      fontWeight: "600",
      color: colors.text,
      marginBottom: SPACING.small,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    input: {
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: BORDER_RADIUS.medium,
      padding: SPACING.large,
      fontSize: FONT_SIZES.medium,
      color: colors.text,
      backgroundColor: colors.background,
      minHeight: 50,
    },
    inputFocused: {
      borderColor: colors.tint,
      ...SHADOW_STYLES.light,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: SPACING.medium,
    },
    button: {
      flex: 1,
      paddingVertical: SPACING.large,
      paddingHorizontal: SPACING.xl,
      borderRadius: BORDER_RADIUS.medium,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 50,
    },
    importButton: {
      backgroundColor: colors.tint,
      ...SHADOW_STYLES.medium,
    },
    cancelButton: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: colors.border,
    },
    buttonText: {
      fontSize: FONT_SIZES.medium,
      fontWeight: "600",
    },
    importButtonText: {
      color: colors.buttonText,
    },
    cancelButtonText: {
      color: colors.text,
    },
    disabledButton: {
      backgroundColor: colors.disabled,
      opacity: 0.6,
      transform: [{ scale: 0.98 }],
    },
    loadingContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    loadingText: {
      marginLeft: SPACING.small,
      fontSize: FONT_SIZES.medium,
      fontWeight: "600",
      color: colors.buttonText,
    },
  });

  return { styles, colors };
}