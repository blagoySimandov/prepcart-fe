import { Colors } from "@/constants/colors";
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
      marginBottom: 2,
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
    addedIndicator: {
      backgroundColor: "#44BB44",
    },
    modifiedIndicator: {
      backgroundColor: "#FF9944",
    },
    addedContainer: {
      borderWidth: 1.5,
      borderColor: "#44BB44",
    },
    modifiedContainer: {
      borderWidth: 1.5,
      borderColor: "#FF9944",
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
      marginRight: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    addedBadge: {
      backgroundColor: "#44BB44",
    },
    modifiedBadge: {
      backgroundColor: "#FF9944",
    },
    statusBadgeText: {
      fontSize: 10,
      fontWeight: "600",
      color: "white",
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
      fontWeight: "500",
      letterSpacing: 0.2,
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
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    detailModal: {
      backgroundColor: colors.background,
      borderRadius: 16,
      padding: 20,
      width: "100%",
      maxWidth: 350,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    detailModalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    detailModalTitle: {
      fontSize: 18,
      fontWeight: "600",
    },
    detailSection: {
      marginBottom: 12,
    },
    detailLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.tabIconDefault,
      marginBottom: 4,
    },
    detailText: {
      fontSize: 14,
      lineHeight: 20,
    },
  });

  return { styles, colors };
}
