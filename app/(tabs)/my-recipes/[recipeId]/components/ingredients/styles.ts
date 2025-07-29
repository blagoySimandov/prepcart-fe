import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      marginBottom: 40,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 20,
      letterSpacing: 0.5,
    },
    ingredientsList: {
      gap: 4,
    },
  });

  return { styles, colors };
}
