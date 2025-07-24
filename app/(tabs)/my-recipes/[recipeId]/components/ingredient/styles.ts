import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: colors.card,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
      marginBottom: 2,
    },
    baseContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    amountContainer: {
      minWidth: 60,
    },
    amount: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.tint,
    },
    unit: {
      fontSize: 16,
      opacity: 0.8,
      minWidth: 60,
      fontWeight: "500",
    },
    name: {
      fontSize: 17,
      flex: 1,
      fontWeight: "500",
      letterSpacing: 0.2,
    },
    swapButton: {
      padding: 8,
      borderRadius: 10,
      backgroundColor: colors.secondary,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
  });

  return { styles, colors };
}
