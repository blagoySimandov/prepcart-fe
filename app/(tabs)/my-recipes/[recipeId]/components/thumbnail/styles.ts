import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 200,
      borderRadius: 20,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: 16,
    },
    placeholder: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return { styles, colors };
}
