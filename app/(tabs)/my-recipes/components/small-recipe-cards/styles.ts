import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    recipeCardsContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    recipeCardsContent: {
      paddingBottom: 20,
    },
  });

  return { styles, colors };
}
