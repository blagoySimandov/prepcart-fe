import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const theme = useColorScheme();
  const themeColors = Colors[theme || "light"];

  return StyleSheet.create({
    container: {
      backgroundColor: themeColors.card,
      borderRadius: 20,
      marginHorizontal: 16,
      marginVertical: 8,
      shadowColor: themeColors.text,
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 8,
      overflow: "hidden",
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      height: 220,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imagePlaceholder: {
      width: "100%",
      height: "100%",
      backgroundColor: themeColors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderText: {
      fontSize: 48,
    },
    loadingOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: themeColors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    gradientOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 80,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    titleOverlay: {
      position: "absolute",
      bottom: 16,
      left: 16,
      right: 16,
    },
    recipeTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: "#FFFFFF",
      textShadowColor: "rgba(0,0,0,0.5)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
    content: {
      padding: 20,
    },
    description: {
      fontSize: 14,
      fontWeight: "400",
      color: themeColors.text,
      lineHeight: 20,
      marginBottom: 16,
      opacity: 0.8,
    },
    statsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    statItem: {
      flex: 1,
      alignItems: "center",
    },
    statIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: themeColors.background,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 6,
      shadowColor: themeColors.text,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    statIcon: {
      fontSize: 18,
    },
    statLabel: {
      fontSize: 10,
      fontWeight: "600",
      color: themeColors.icon,
      marginBottom: 2,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    statValue: {
      fontSize: 16,
      fontWeight: "800",
      color: themeColors.tint,
    },
    statDivider: {
      width: 1,
      height: 40,
      backgroundColor: themeColors.border,
      marginHorizontal: 12,
    },
    actionContainer: {
      marginTop: 8,
      flexDirection: "row",
      flexGrow: 1,
      gap: 8,
    },
    viewButton: {
      backgroundColor: themeColors.tint,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: "center",
      shadowColor: themeColors.tint,
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    viewButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: themeColors.buttonText,
      letterSpacing: 0.5,
    },
  });
}
