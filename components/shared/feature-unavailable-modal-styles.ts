import { StyleSheet } from "react-native";

export function useStyles() {
  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    modalContent: {
      borderRadius: 16,
      padding: 24,
      width: "100%",
      maxWidth: 350,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
    },
    iconContainer: {
      marginBottom: 16,
    },
    modalTitle: {
      textAlign: "center",
      marginBottom: 12,
    },
    modalMessage: {
      textAlign: "center",
      marginBottom: 24,
      lineHeight: 20,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: "center",
      minWidth: 100,
    },
  });
}