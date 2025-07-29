import { FONT_WEIGHTS } from "@/constants";
import { Colors, COMMON_COLORS } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: colors.card,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
      marginBottom: 8,
      position: "relative",
      overflow: "hidden",
    },
    statusIndicator: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      opacity: 0.7,
    },
    addIndicator: {
      backgroundColor: COMMON_COLORS.success,
    },
    modifyIndicator: {
      backgroundColor: COMMON_COLORS.warning,
    },
    removeIndicator: {
      backgroundColor: COMMON_COLORS.error,
    },
    addContainer: {
      backgroundColor: `${COMMON_COLORS.success}08`,
    },
    modifyContainer: {
      backgroundColor: `${COMMON_COLORS.warning}08`,
    },
    removeContainer: {
      backgroundColor: `${COMMON_COLORS.error}08`,
      paddingVertical: 16,
    },
    statusBadge: {
      position: "absolute",
      top: 5,
      left: 7,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.card,
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    addBadge: {
      borderColor: COMMON_COLORS.success,
    },
    modifyBadge: {
      borderColor: COMMON_COLORS.warning,
    },
    removeBadge: {
      borderColor: COMMON_COLORS.error,
    },
    baseContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      paddingRight: 30, // Space for the floating badge
    },
    amountContainer: {
      minWidth: 45,
      alignItems: "flex-end",
      marginRight: 12,
      marginLeft: 16,
    },
    amount: {
      fontSize: 19,
      fontWeight: "700",
      color: colors.tint,
      textAlign: "right",
    },
    unit: {
      fontSize: 17,
      opacity: 0.8,
      fontWeight: "500",
    },
    unitContainer: {
      alignItems: "flex-start",
      justifyContent: "center",
      minWidth: 80,
      marginRight: 16,
    },
    name: {
      fontSize: 18,
      flex: 1,
      fontWeight: FONT_WEIGHTS.medium,
      letterSpacing: 0.2,
      lineHeight: 22,
    },
    removeName: {
      textDecorationLine: "line-through",
      textDecorationStyle: "solid",
      opacity: 0.6,
    },
    swapButton: {
      padding: 8,
      borderRadius: 10,
      backgroundColor: colors.secondary,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    unitClickable: {
      textDecorationLine: "underline",
      textDecorationStyle: "dotted",
      opacity: 0.9,
    },
    unitConverted: {
      color: colors.tint,
      fontWeight: "600",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "80%",
      maxWidth: 300,
      borderRadius: 12,
      padding: 20,
      backgroundColor: colors.card,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 16,
      textAlign: "center",
    },
    unitOption: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginBottom: 8,
    },
    unitOptionActive: {
      backgroundColor: `${colors.tint}15`,
    },
    unitOptionText: {
      fontSize: 16,
      color: colors.text,
    },
    unitOptionTextActive: {
      color: colors.tint,
      fontWeight: "500",
    },
  });

  return { styles, colors };
}
