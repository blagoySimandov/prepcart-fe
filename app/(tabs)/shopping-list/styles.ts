import { Colors } from "@/constants/Colors";
import { StyleSheet, useColorScheme } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();

  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      padding: 20,
      paddingBottom: 10,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10,
    },
    headerActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    addButton: {
      backgroundColor: colors.tint,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    addButtonText: {
      color: "#FFFFFF",
      fontWeight: "600",
      marginLeft: 5,
    },
    clearButton: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 15,
      backgroundColor: colors.warning,
    },
    clearButtonText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "600",
    },
    listContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 10,
      marginTop: 10,
    },
    itemCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      marginBottom: 8,
      borderRadius: 12,
      borderWidth: 1,
    },
    itemContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      marginRight: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    itemInfo: {
      flex: 1,
    },
    itemNameRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    itemName: {
      fontSize: 16,
      fontWeight: "500",
      flex: 1,
    },
    itemDetails: {
      fontSize: 14,
    },
    completedText: {
      textDecorationLine: "line-through",
      opacity: 0.6,
    },
    discountBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.accent,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginLeft: 8,
      minWidth: 35,
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    discountText: {
      color: "#FFFFFF",
      fontSize: 10,
      fontWeight: "700",
      marginLeft: 1,
    },
    storeDiscountBadge: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accent,
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginLeft: 8,
      minWidth: 50,
    },
    storeDiscountStoreName: {
      color: "#FFFFFF",
      fontSize: 9,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    storeDiscountPercentage: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "800",
    },
    savingsSummary: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginBottom: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.accent,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 3,
    },
    savingsContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 4,
    },
    savingsTitle: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.text,
      marginLeft: 6,
      marginRight: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    savingsAmount: {
      fontSize: 14,
      color: colors.success,
      fontWeight: "600",
    },
    savingsSubtext: {
      fontSize: 11,
      color: colors.icon,
      textAlign: "center",
      opacity: 0.8,
    },
    deleteButton: {
      padding: 8,
    },
    emptyState: {
      textAlign: "center",
      color: "#666",
      fontSize: 16,
      marginTop: 50,
      fontStyle: "italic",
    },

    // Generic Add Item Modal Styles
    modal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    addItemModalContent: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 15,
      width: "90%",
      maxWidth: 400,
    },
    addItemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    expandButton: {
      padding: 5,
    },
    addItemModalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      flex: 1,
      marginLeft: 34,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      backgroundColor: colors.background,
      color: colors.text,
      fontSize: 16,
      marginBottom: 15,
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    modalButton: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
      flex: 1,
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: colors.secondary,
    },
    saveButton: {
      backgroundColor: colors.tint,
    },
    modalButtonText: {
      textAlign: "center",
      fontWeight: "600",
      color: "#FFFFFF",
    },

    // Discount Modal Styles
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.6)",
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      height: "75%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
    },
    closeButton: {
      padding: 8,
      borderRadius: 16,
      backgroundColor: colors.border,
    },
    discountItemCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    discountItemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    discountStoreName: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.tint,
    },
    discountBadgeText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "bold",
    },
    discountProductName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 16,
      lineHeight: 22,
    },
    priceContainer: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
    },
    priceItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    priceLabel: {
      fontSize: 14,
      color: colors.icon,
    },
    originalPrice: {
      fontSize: 14,
      color: colors.icon,
      textDecorationLine: "line-through",
    },
    discountedPrice: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.accent,
    },
    similarityContainer: {
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    similarityText: {
      fontSize: 12,
      color: colors.icon,
      fontStyle: "italic",
    },
  });
  return { styles, colors };
}
