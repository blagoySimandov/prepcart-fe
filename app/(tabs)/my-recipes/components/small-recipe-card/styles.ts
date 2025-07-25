import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    recipeCard: {
      position: "relative",
      marginBottom: 20,
      borderRadius: 16,
      borderWidth: 1,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
      overflow: "hidden",
    },
    recipeImage: {
      width: "100%",
      height: 120,
    },
    recipePlaceholderImage: {
      width: "100%",
      height: 120,
      justifyContent: "center",
      alignItems: "center",
    },
    recipeCardContent: {
      padding: 20,
    },
    recipeCardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    recipeDifficultyBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    recipeDifficultyText: {
      fontSize: 12,
      fontWeight: "600",
    },
    recipeCookTimeBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    recipeCookTimeText: {
      fontSize: 12,
      fontWeight: "600",
    },
    recipeContent: {
      marginBottom: 16,
    },
    recipeTitle: {
      fontSize: 20,
      marginBottom: 8,
      lineHeight: 26,
    },
    recipeDescription: {
      fontSize: 15,
      lineHeight: 22,
    },
    recipeFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    recipeInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    recipeInfoIcon: {
      fontSize: 14,
    },
    recipeInfoCount: {
      fontSize: 13,
      fontWeight: "500",
    },
    recipeAccentLine: {
      height: 4,
      width: "100%",
    },
    deleteButton: {
      position: "absolute",
      top: 12,
      right: 12,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.1)",
    },
  });

  return { styles, colors };
}
