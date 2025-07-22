import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    // Main screen styles
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 60,
      gap: 16,
    },
    emptyIcon: {
      fontSize: 48,
    },
    emptyStateText: {
      fontSize: 16,
      textAlign: "center",
    },
    clearFiltersButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    clearFiltersText: {
      fontSize: 14,
      fontWeight: "600",
    },
  });

  return { styles, colors };
}
