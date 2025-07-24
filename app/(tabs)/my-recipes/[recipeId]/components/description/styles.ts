import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      marginBottom: 32,
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
      opacity: 0.85,
      letterSpacing: 0.3,
    },
  });

  return { styles, colors };
}
