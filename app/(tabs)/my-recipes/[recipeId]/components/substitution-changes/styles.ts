import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

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
      maxHeight: "90%",
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
    },
    scrollView: {
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 12,
    },
    analysisCard: {
      backgroundColor,
      borderWidth: 1,
      borderColor,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    analysisRow: {
      marginBottom: 8,
    },
    analysisLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: secondaryText,
      marginBottom: 4,
    },
    analysisText: {
      fontSize: 14,
      lineHeight: 20,
    },
    changeItem: {
      backgroundColor,
      borderWidth: 1,
      borderColor,
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
    },
    changeHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    changeName: {
      fontSize: 16,
      fontWeight: "500",
      flex: 1,
    },
    changeAction: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginLeft: 8,
    },
    changeActionText: {
      fontSize: 12,
      fontWeight: "600",
      color: "white",
    },
    changeQuantity: {
      fontSize: 14,
      color: tint,
      marginBottom: 4,
    },
    changeReason: {
      fontSize: 13,
      color: secondaryText,
      fontStyle: "italic",
    },
    instructionChange: {
      backgroundColor,
      borderWidth: 1,
      borderColor,
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
    },
    instructionStep: {
      fontSize: 14,
      fontWeight: "600",
      color: tint,
      marginBottom: 8,
    },
    instructionText: {
      fontSize: 14,
      marginBottom: 4,
    },
    instructionLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: secondaryText,
      marginBottom: 2,
    },
    strikethrough: {
      textDecorationLine: "line-through",
      color: secondaryText,
    },
    tipItem: {
      flexDirection: "row",
      marginBottom: 8,
    },
    tipBullet: {
      fontSize: 14,
      marginRight: 8,
      color: tint,
    },
    tipText: {
      fontSize: 14,
      flex: 1,
      lineHeight: 20,
    },
    cookingTimeAdjustment: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor,
      borderWidth: 1,
      borderColor,
      borderRadius: 8,
      padding: 12,
    },
    cookingTimeLabel: {
      fontSize: 14,
      fontWeight: "600",
    },
    cookingTimeValue: {
      fontSize: 14,
      color: tint,
      marginLeft: 8,
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
    applyButton: {
      backgroundColor: tint,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
    },
    cancelButtonText: {
      color: textColor,
    },
    applyButtonText: {
      color: "white",
    },
    analysisSection: {
      marginBottom: 16,
    },
    analysisSectionTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: tint,
      marginBottom: 4,
    },
    analysisSubtext: {
      fontSize: 12,
      color: secondaryText,
      marginTop: 2,
      fontStyle: "italic",
    },
    timerText: {
      fontSize: 13,
      color: tint,
      marginTop: 4,
      marginBottom: 4,
    },
    nutritionalGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      marginBottom: 12,
    },
    nutritionalItem: {
      flexDirection: "row",
      alignItems: "center",
      minWidth: "45%",
    },
    nutritionalLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: secondaryText,
      marginRight: 8,
    },
    nutritionalValue: {
      fontSize: 14,
      fontWeight: "500",
    },
    nutritionalNotes: {
      fontSize: 13,
      color: secondaryText,
      fontStyle: "italic",
      marginTop: 8,
    },
  });

  return { styles, colors: { backgroundColor, borderColor, textColor, secondaryText, tint } };
};