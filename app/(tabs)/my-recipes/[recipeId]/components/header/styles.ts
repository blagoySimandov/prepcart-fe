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
    title: {
      fontSize: 32,
      fontWeight: "bold",
      lineHeight: 38,
    },
  });

  return { styles, colors };
}
