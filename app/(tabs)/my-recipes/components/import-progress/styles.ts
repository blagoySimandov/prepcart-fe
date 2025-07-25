import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const { width } = Dimensions.get("window");

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    modalContent: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      width: Math.min(width - 40, 320),
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    thumbnail: {
      width: 200,
      height: 200,
      borderRadius: 12,
      marginBottom: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 16,
      color: colors.text,
    },
    loader: {
      marginBottom: 16,
    },
    message: {
      fontSize: 14,
      textAlign: "center",
      color: colors.icon,
      lineHeight: 20,
    },
  });

  return { styles, colors };
}