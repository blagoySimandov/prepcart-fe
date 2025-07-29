import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export const useStyles = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginVertical: 20,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
    },
    viewAllButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: colors.tint + "20",
    },
    viewAllText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.tint,
    },
    recipesContainer: {
      gap: 12,
    },
    emptyState: {
      alignItems: "center",
      paddingVertical: 32,
    },
    emptyStateIcon: {
      fontSize: 48,
      marginBottom: 16,
    },
    emptyStateText: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
      textAlign: "center",
      marginBottom: 8,
    },
    emptyStateSubtitle: {
      fontSize: 14,
      color: colors.icon,
      textAlign: "center",
    },
  });

  return { styles, colors };
};

