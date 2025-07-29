import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";
import {
  BORDER_RADIUS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
} from "@/constants/ui";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    modalContainer: {
      backgroundColor: colors.background,
      borderTopLeftRadius: BORDER_RADIUS.xl,
      borderTopRightRadius: BORDER_RADIUS.xl,
      maxHeight: "80%",
      paddingBottom: SPACING.xl,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: SPACING.xl,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: FONT_SIZES.xl,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.text,
    },
    closeButton: {
      padding: SPACING.small,
    },
    servingsSection: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.medium,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    servingsLabel: {
      fontSize: FONT_SIZES.medium,
      fontWeight: FONT_WEIGHTS.semiBold,
      color: colors.text,
    },
    servingsSelector: {
      flexDirection: "row",
      gap: SPACING.small,
    },
    servingOption: {
      paddingHorizontal: SPACING.medium,
      paddingVertical: SPACING.small,
      borderRadius: BORDER_RADIUS.medium,
      borderWidth: 1,
      borderColor: colors.border,
      minWidth: 50,
      alignItems: "center",
    },
    servingOptionSelected: {
      backgroundColor: colors.tint,
      borderColor: colors.tint,
    },
    servingOptionText: {
      fontSize: FONT_SIZES.medium,
      color: colors.text,
    },
    servingOptionTextSelected: {
      color: colors.buttonText,
      fontWeight: FONT_WEIGHTS.semiBold,
    },
    selectionControls: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: SPACING.medium,
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.medium,
    },
    controlButton: {
      paddingHorizontal: SPACING.medium,
      paddingVertical: SPACING.small,
    },
    controlButtonText: {
      fontSize: FONT_SIZES.small,
      color: colors.tint,
      fontWeight: FONT_WEIGHTS.medium,
    },
    ingredientsList: {
      paddingHorizontal: SPACING.xl,
    },
    ingredientItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: SPACING.medium,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: BORDER_RADIUS.small,
      borderWidth: 2,
      borderColor: colors.tint,
      alignItems: "center",
      justifyContent: "center",
      marginRight: SPACING.medium,
    },
    checkboxChecked: {
      backgroundColor: colors.tint,
    },
    ingredientInfo: {
      flex: 1,
    },
    ingredientName: {
      fontSize: FONT_SIZES.medium,
      color: colors.text,
      fontWeight: FONT_WEIGHTS.medium,
    },
    ingredientQuantity: {
      fontSize: FONT_SIZES.small,
      color: colors.icon,
      marginTop: 2,
    },
    footer: {
      flexDirection: "row",
      gap: SPACING.medium,
      paddingHorizontal: SPACING.xl,
      paddingTop: SPACING.xl,
    },
    button: {
      flex: 1,
      paddingVertical: SPACING.medium,
      borderRadius: BORDER_RADIUS.medium,
      alignItems: "center",
      justifyContent: "center",
    },
    cancelButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    addButton: {
      backgroundColor: colors.tint,
    },
    buttonText: {
      fontSize: FONT_SIZES.medium,
      fontWeight: FONT_WEIGHTS.semiBold,
    },
    cancelButtonText: {
      color: colors.text,
    },
    addButtonText: {
      color: colors.buttonText,
    },
    emptyState: {
      padding: SPACING.xl * 2,
      alignItems: "center",
    },
    emptyStateText: {
      fontSize: FONT_SIZES.medium,
      color: colors.icon,
    },
  });

  return { styles, colors };
}