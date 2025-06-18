import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export default function useStyles() {
  const colorScheme = useColorScheme();

  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
      padding: 20,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      color: colors.text,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      backgroundColor: colors.card,
      color: colors.text,
      fontSize: 16,
      marginBottom: 15,
    },
    textInput: {
      minHeight: 120,
      textAlignVertical: "top",
    },
    button: {
      backgroundColor: colors.tint,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
    disabledButton: {
      backgroundColor: colors.secondary,
    },
    recipeCard: {
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 8,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },
    recipeTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: colors.text,
    },
    recipeSection: {
      marginBottom: 10,
    },
    recipeSectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 5,
      color: colors.tint,
    },
    recipeItem: {
      fontSize: 14,
      marginBottom: 2,
      color: colors.text,
    },
    noRecipes: {
      textAlign: "center",
      color: colors.icon,
      fontStyle: "italic",
      marginTop: 20,
    },
  });
  return { styles, colors };
}
