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
    resetSection: {
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    resetButton: {
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 1.5,
      borderColor: "#FF9944",
    },
    resetButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#FF9944",
    },
  });

  return { styles, colors };
}
