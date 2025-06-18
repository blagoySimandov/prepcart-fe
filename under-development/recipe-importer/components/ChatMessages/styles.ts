import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export default function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
    },
    emptyStateText: {
      fontSize: 16,
      textAlign: "center",
      color: colors.icon,
      lineHeight: 24,
    },
    messagesContainer: {
      paddingBottom: 20,
    },
    messageContainer: {
      marginBottom: 16,
    },
    userMessage: {
      alignItems: "flex-end",
    },
    aiMessage: {
      alignItems: "flex-start",
    },
    messageBubble: {
      maxWidth: "80%",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
      marginBottom: 4,
    },
    userBubble: {
      backgroundColor: colors.tint,
      borderBottomRightRadius: 8,
    },
    aiBubble: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderBottomLeftRadius: 8,
    },
    messageText: {
      fontSize: 16,
      lineHeight: 22,
    },
    userMessageText: {
      color: "#FFFFFF",
    },
    aiMessageText: {
      color: colors.text,
    },
    messageTime: {
      fontSize: 12,
      color: colors.icon,
      paddingHorizontal: 16,
    },
  });

  return { styles, colors };
}
