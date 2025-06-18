import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export default function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    chatInputContainer: {
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 15,
      marginBottom: 65,
      paddingHorizontal: 15,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 12,
    },
    chatInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.card,
      color: colors.text,
      fontSize: 16,
      maxHeight: 100,
      textAlignVertical: "top",
    },
    disabledInput: {
      backgroundColor: colors.background,
      opacity: 0.6,
    },
    sendButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.tint,
      justifyContent: "center",
      alignItems: "center",
    },
    disabledButton: {
      backgroundColor: colors.secondary,
      opacity: 0.6,
    },
    sendButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
    imageButton: {
      marginTop: 10,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 12,
      alignItems: "center",
    },
    imageButtonText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "500",
    },
  });

  return { styles, colors };
}
