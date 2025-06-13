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
    itemName: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 2,
    },
    itemDetails: {
      fontSize: 14,
    },
    completedText: {
      textDecorationLine: "line-through",
      opacity: 0.6,
    },
    deleteButton: {
      padding: 8,
    },
    emptyState: {
      textAlign: "center",
      color: colors.icon,
      fontStyle: "italic",
      marginTop: 20,
    },
    modal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 15,
      width: "90%",
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 20,
      textAlign: "center",
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
  });
  return { styles, colors };
}
