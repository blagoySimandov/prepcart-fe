import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SPACING } from "@/constants/ui";

export const useStyles = () => {
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "tabIconDefault");
  const textColor = useThemeColor({}, "text");
  const secondaryText = useThemeColor({}, "tabIconDefault");
  const tint = useThemeColor({}, "tint");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      backgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "85%",
      paddingBottom: 20,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: secondaryText,
    },
    scrollView: {
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    ingredientSection: {
      marginBottom: 24,
    },
    ingredientHeader: {
      marginBottom: 12,
    },
    ingredientName: {
      fontSize: 18,
      fontWeight: "600",
      color: textColor,
      marginBottom: 12,
    },
    candidatesContainer: {
      gap: SPACING.small,
    },
    candidateButton: {
      backgroundColor,
      borderWidth: 1,
      borderColor,
      borderRadius: 12,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    candidateSelected: {
      borderColor: tint,
      borderWidth: 2,
      backgroundColor: `${tint}10`,
    },
    candidateContent: {
      flex: 1,
      marginRight: SPACING.medium,
    },
    candidateName: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 4,
    },
    candidateMetrics: {
      flexDirection: "row",
      alignItems: "center",
      gap: SPACING.small,
    },
    qualityContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: SPACING.small,
      paddingVertical: SPACING.xs,
      borderRadius: 12,
      gap: SPACING.xs,
    },
    qualityText: {
      fontSize: 11,
      fontWeight: "500",
    },
    difficultyContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: SPACING.small,
      paddingVertical: SPACING.xs,
      borderRadius: 12,
      gap: SPACING.xs,
    },
    difficultyText: {
      fontSize: 11,
      fontWeight: "500",
    },
    removeButton: {
      borderColor: "#FF4444",
      backgroundColor: "rgba(255, 68, 68, 0.05)",
    },
    removeButtonContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: SPACING.small,
    },
    removeText: {
      color: "#FF4444",
    },
    checkIcon: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor,
      alignItems: "center",
      justifyContent: "center",
    },
    checkIconSelected: {
      backgroundColor: tint,
      borderColor: tint,
    },
    buttonContainer: {
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingTop: 16,
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
    },
    cancelButton: {
      borderWidth: 1,
      borderColor,
    },
    confirmButton: {
      backgroundColor: tint,
    },
    confirmButtonDisabled: {
      backgroundColor: borderColor,
      opacity: 0.5,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
    },
    cancelButtonText: {
      color: textColor,
    },
    confirmButtonText: {
      color: "white",
    },
    loadingContainer: {
      padding: 40,
      alignItems: "center",
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: secondaryText,
    },
    errorContainer: {
      padding: 40,
      alignItems: "center",
    },
    errorText: {
      fontSize: 16,
      color: textColor,
      marginBottom: 16,
      textAlign: "center",
    },
    retryButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: tint,
    },
    retryButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return {
    styles,
    colors: { backgroundColor, borderColor, textColor, secondaryText, tint },
  };
};

