import { StyleSheet } from "react-native";
export function useStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 40,
    },
    title: {
      marginBottom: 10,
      textAlign: "center",
    },
    subtitle: {
      marginBottom: 50,
      textAlign: "center",
    },
    buttonsContainer: {
      width: "80%",
      gap: 15,
    },
    button: {
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    appleButton: {
      width: "100%",
      height: 50,
      borderRadius: 8,
    },
    // Display name prompt styles
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 20,
      paddingTop: "45%",
    },
    modalContent: {
      borderRadius: 16,
      padding: 24,
      width: "100%",
      maxWidth: 400,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
    },
    modalTitle: {
      textAlign: "center",
      marginBottom: 8,
    },
    modalSubtitle: {
      textAlign: "center",
      marginBottom: 24,
      opacity: 0.7,
    },
    textInput: {
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 20,
      fontSize: 16,
    },
    modalButtonsContainer: {
      flexDirection: "row",
      gap: 12,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    skipButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
    },
    saveButton: {
      // backgroundColor will be set dynamically using theme colors
    },
    // Country selection modal styles
    countryModalContent: {
      borderRadius: 16,
      padding: 24,
      width: "100%",
      maxWidth: 400,
      height: "80%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
    },
    searchInput: {
      marginBottom: 16,
    },
    countryList: {
      flex: 1,
      marginBottom: 20,
    },
    countryItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
    },
    countryFlag: {
      fontSize: 24,
      marginRight: 12,
      width: 32,
    },
    countryName: {
      fontSize: 16,
      flex: 1,
    },
  });
}
