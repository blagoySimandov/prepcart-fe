import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const useStyles = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 60,
    },
    greeting: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 16,
      color: colors.icon,
    },
    quickActionsContainer: {
      paddingHorizontal: 20,
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 15,
    },
    quickActionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    quickActionCard: {
      width: (width - 60) / 2,
      backgroundColor: colors.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },
    quickActionIcon: {
      marginBottom: 12,
    },
    quickActionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 5,
    },
    quickActionDescription: {
      fontSize: 14,
      color: colors.icon,
    },
    statsContainer: {
      paddingHorizontal: 20,
      marginBottom: 30,
    },
    statsGrid: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 15,
      marginHorizontal: 5,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.tint,
      marginBottom: 5,
      textAlign: "center",
    },
    statLabel: {
      fontSize: 12,
      color: colors.icon,
      textAlign: "center",
    },
    emptyState: {
      textAlign: "center",
      color: colors.icon,
      fontStyle: "italic",
      marginTop: 20,
    },
  });

  return { styles, colors };
};
