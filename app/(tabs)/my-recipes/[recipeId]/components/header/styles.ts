import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      marginBottom: 24,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      lineHeight: 38,
      flex: 1,
    },
    modifiedBadge: {
      backgroundColor: "rgba(255, 153, 68, 0.1)",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginTop: 8,
    },
    modifiedBadgeText: {
      fontSize: 11,
      fontWeight: "600",
      color: "#FF9944",
      textTransform: "uppercase",
    },
  });

  return { styles, colors };
}
