import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export default function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    aiThinkingContainer: {
      alignItems: "flex-start",
      marginBottom: 16,
    },
    aiThinkingBubble: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      borderBottomLeftRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    aiThinkingText: {
      color: colors.icon,
      fontSize: 14,
      fontStyle: "italic",
    },
    aiResponseContainer: {
      alignItems: "flex-start",
      marginBottom: 16,
    },
    aiResponseBubble: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      borderBottomLeftRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      maxWidth: "80%",
    },
    aiResponseText: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 22,
    },
  });

  return { styles, colors };
}
