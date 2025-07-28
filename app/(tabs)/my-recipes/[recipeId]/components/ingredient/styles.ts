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
      width: 4,
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
      borderWidth: 1.5,
      borderColor: COMMON_COLORS.success,
    },
    modifyContainer: {
      borderWidth: 1.5,
      borderColor: COMMON_COLORS.warning,
    },
    removeContainer: {
      borderWidth: 1.5,
      borderColor: COMMON_COLORS.error,
      opacity: 0.7,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginRight: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    addBadge: {
      backgroundColor: COMMON_COLORS.success,
    },
    modifyBadge: {
      backgroundColor: COMMON_COLORS.warning,
    },
    removeBadge: {
      backgroundColor: COMMON_COLORS.error,
    },
    statusBadgeText: {
      fontSize: 10,
      fontWeight: "600",
      color: COMMON_COLORS.white,
      textTransform: "uppercase",
    },
    baseContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    amountContainer: {
      minWidth: 60,
    },
    amount: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.tint,
    },
    unit: {
      fontSize: 16,
      opacity: 0.8,
      minWidth: 60,
      fontWeight: "500",
    },
    name: {
      fontSize: 17,
      flex: 1,
      fontWeight: FONT_WEIGHTS.medium,
      letterSpacing: 0.2,
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
  });

  return { styles, colors };
}
