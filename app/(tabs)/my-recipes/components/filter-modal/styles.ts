import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 20,
    },
    modalContent: {
      borderRadius: 16,
      width: "90%",
      maxWidth: 400,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
    },
    modalCloseButton: {
      padding: 4,
    },
    modalCloseButtonText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    modalOptions: {
      paddingBottom: 8,
    },
    modalOption: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
    },
    modalOptionContent: {
      flex: 1,
    },
    modalOptionLabel: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 2,
    },
    modalOptionDescription: {
      fontSize: 14,
    },
    modalSelectedIndicator: {
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    modalCheckmarkText: {
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return { styles, colors };
}
