import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export const useStyles = () => {
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "tabIconDefault");
  const textColor = useThemeColor({}, "text");
  const secondaryText = useThemeColor({}, "tabIconDefault");
  const tint = useThemeColor({}, "tint");
  const text = useThemeColor({}, "text");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      backgroundColor,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      maxHeight: "92%",
      paddingBottom: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: -4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
    header: {
      paddingHorizontal: 24,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      position: "relative",
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "700",
      textAlign: "center",
      letterSpacing: -0.5,
    },
    headerDivider: {
      position: "absolute",
      top: 8,
      left: "50%",
      marginLeft: -20,
      width: 40,
      height: 4,
      backgroundColor: borderColor,
      borderRadius: 2,
    },
    scrollView: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 16,
      color: textColor,
      letterSpacing: -0.3,
    },
    analysisCard: {
      backgroundColor,
      borderWidth: 1,
      borderColor: `${borderColor}40`,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    analysisRow: {
      marginBottom: 12,
      paddingVertical: 4,
    },
    analysisLabel: {
      fontSize: 15,
      fontWeight: "600",
      color: secondaryText,
      marginBottom: 6,
      letterSpacing: 0.2,
    },
    analysisText: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "500",
    },
    changeItem: {
      backgroundColor,
      borderWidth: 1,
      borderColor: `${borderColor}30`,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    changeHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    changeName: {
      fontSize: 17,
      fontWeight: "600",
      flex: 1,
      letterSpacing: -0.2,
    },
    changeAction: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginLeft: 12,
      minWidth: 70,
      alignItems: "center",
    },
    changeActionText: {
      fontSize: 11,
      fontWeight: "700",
      color: "white",
      letterSpacing: 0.5,
    },
    changeQuantity: {
      fontSize: 15,
      color: tint,
      marginBottom: 8,
      fontWeight: "500",
    },
    changeReason: {
      fontSize: 14,
      color: secondaryText,
      fontStyle: "italic",
      lineHeight: 20,
      paddingTop: 4,
    },
    instructionChange: {
      backgroundColor,
      borderWidth: 1,
      borderColor: `${borderColor}30`,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    instructionStep: {
      fontSize: 15,
      fontWeight: "700",
      color: tint,
      marginBottom: 12,
      letterSpacing: 0.3,
    },
    instructionText: {
      fontSize: 15,
      marginBottom: 8,
      lineHeight: 22,
    },
    instructionLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: secondaryText,
      marginBottom: 4,
      letterSpacing: 0.2,
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
      paddingHorizontal: 24,
      paddingTop: 24,
      gap: 16,
      borderTopWidth: 1,
      borderTopColor: `${borderColor}30`,
      backgroundColor,
    },
    button: {
      flex: 1,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cancelButton: {
      borderWidth: 1.5,
      borderColor: `${borderColor}60`,
      backgroundColor: `${backgroundColor}`,
    },
    applyButton: {
      backgroundColor: tint,
    },
    buttonText: {
      fontSize: 17,
      fontWeight: "700",
      letterSpacing: -0.2,
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
      fontSize: 16,
      fontWeight: "700",
      color: tint,
      marginBottom: 8,
      letterSpacing: -0.1,
    },
    analysisSubtext: {
      fontSize: 13,
      color: secondaryText,
      marginTop: 4,
      fontStyle: "italic",
      lineHeight: 18,
    },
    timerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 6,
      marginBottom: 6,
    },
    timerIcon: {
      marginRight: 6,
    },
    timerText: {
      fontSize: 13,
      color: tint,
      fontWeight: "500",
    },
    nutritionalGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 20,
      marginBottom: 16,
    },
    nutritionalItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: "45%",
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: `${tint}10`,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: `${tint}20`,
    },
    nutritionalLabel: {
      fontSize: 15,
      fontWeight: "600",
      color: secondaryText,
      flex: 1,
    },
    nutritionalValueContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    nutritionalIcon: {
      marginRight: 4,
    },
    nutritionalValue: {
      fontSize: 15,
      fontWeight: "700",
      color: textColor,
    },
    nutritionalNotes: {
      fontSize: 13,
      color: secondaryText,
      fontStyle: "italic",
      marginTop: 8,
    },
  });

  return {
    styles,
    colors: {
      backgroundColor,
      borderColor,
      textColor,
      secondaryText,
      tint,
      text,
    },
  };
};

