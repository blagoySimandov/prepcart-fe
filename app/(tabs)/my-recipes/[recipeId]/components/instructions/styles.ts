import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingBottom: 32,
    },
    title: {
      fontSize: 22,
      fontWeight: "600",
      marginBottom: 16,
    },
    list: {
      gap: 20,
    },
  });

  return { styles, colors };
}
