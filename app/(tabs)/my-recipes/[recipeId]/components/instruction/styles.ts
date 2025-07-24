import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      borderRadius: 16,
      borderWidth: 1,
      backgroundColor: colors.card,
      overflow: "hidden",
    },
    videoContainer: {
      height: 400,
      justifyContent: "center",
      alignItems: "center",
    },
    videoPlaceholder: {
      alignItems: "center",
      gap: 12,
    },
    videoText: {
      fontSize: 16,
      fontWeight: "500",
    },
    videoTimestamp: {
      fontSize: 12,
      opacity: 0.7,
    },
    textContainer: {
      padding: 20,
    },
    instructionText: {
      fontSize: 16,
      lineHeight: 24,
    },
    timerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 20,
      margin: 20,
      marginTop: 0,
      borderRadius: 12,
      gap: 8,
    },
    timerText: {
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return { styles, colors };
}
