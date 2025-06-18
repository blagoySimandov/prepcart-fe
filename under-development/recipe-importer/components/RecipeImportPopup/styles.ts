import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export default function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    popup: {
      backgroundColor: colors.background,
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 400,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    title: {
      textAlign: "center",
      marginBottom: 8,
      color: colors.text,
    },
    description: {
      textAlign: "center",
      color: colors.icon,
      marginBottom: 20,
      lineHeight: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
      backgroundColor: colors.card,
      color: colors.text,
      fontSize: 16,
      marginBottom: 24,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 12,
    },
    button: {
      flex: 1,
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    importButton: {
      backgroundColor: colors.tint,
    },
    disabledButton: {
      backgroundColor: colors.secondary,
      opacity: 0.6,
    },
    cancelButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "600",
    },
    importButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return { styles, colors };
}
