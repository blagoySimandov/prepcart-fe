import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export default function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    workflowSelector: {
      flexDirection: "row",
      paddingHorizontal: 15,
      paddingVertical: 15,
      gap: 12,
    },
    workflowButton: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      minHeight: 85,
      justifyContent: "center",
    },
    workflowButtonText: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
      marginBottom: 6,
      lineHeight: 18,
    },
    workflowDescription: {
      fontSize: 12,
      color: colors.icon,
      textAlign: "center",
      lineHeight: 16,
      fontWeight: "500",
    },
  });

  return { styles, colors };
}
