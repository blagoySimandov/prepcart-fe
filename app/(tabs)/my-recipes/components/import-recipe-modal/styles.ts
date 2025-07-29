import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/colors";
import { BORDER_RADIUS, FONT_SIZES, SPACING } from "@/constants/ui";
import { StyleSheet } from "react-native";

export function useStyles() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.xlarge,
      padding: SPACING.xlarge,
      margin: SPACING.large,
      minWidth: 300,
      width: "90%",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SPACING.large,
    },
    modalTitle: {
      fontSize: FONT_SIZES.large,
      fontWeight: "600",
    },
    closeButton: {
      padding: SPACING.xsmall,
    },
    descriptionText: {
      marginBottom: SPACING.medium,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BORDER_RADIUS.medium,
      padding: SPACING.medium,
      marginBottom: SPACING.large,
      fontSize: FONT_SIZES.medium,
      color: colors.text,
      backgroundColor: colors.background,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: SPACING.medium,
    },
    button: {
      flex: 1,
      padding: SPACING.medium,
      borderRadius: BORDER_RADIUS.medium,
      alignItems: "center",
    },
    importButton: {
      backgroundColor: colors.tint,
    },
    cancelButton: {
      backgroundColor: colors.secondary,
    },
    buttonText: {
      fontSize: FONT_SIZES.medium,
      fontWeight: "600",
      color: colors.buttonText,
    },
    disabledButton: {
      backgroundColor: colors.disabled,
    },
  });

  return { styles, colors };
}