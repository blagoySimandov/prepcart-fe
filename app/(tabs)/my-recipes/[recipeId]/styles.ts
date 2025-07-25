import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    modificationBanner: {
      backgroundColor: "#FF9944",
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    modificationBannerText: {
      color: "white",
      fontSize: 14,
      fontWeight: "600",
      flex: 1,
    },
    clearButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 16,
    },
    clearButtonText: {
      color: "white",
      fontSize: 12,
      fontWeight: "600",
    },
  });

  return { styles, colors };
}
