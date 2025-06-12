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
      marginBottom: 24,
      lineHeight: 20,
    },
    optionContainer: {
      gap: 16,
      marginBottom: 24,
    },
    optionButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 20,
      alignItems: "center",
    },
    cameraButton: {
      borderColor: colors.tint,
      backgroundColor: `${colors.tint}10`,
    },
    uploadButton: {
      // Default card styling
    },
    cameraIcon: {
      fontSize: 32,
      marginBottom: 8,
    },
    uploadIcon: {
      fontSize: 32,
      marginBottom: 8,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },
    optionDescription: {
      fontSize: 14,
      color: colors.icon,
      textAlign: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    button: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cancelButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return { styles, colors };
}
