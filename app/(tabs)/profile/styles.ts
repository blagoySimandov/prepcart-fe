import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

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
    },
    profileHeader: {
      padding: 20,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.tint,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 15,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
    userName: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 5,
    },
    userNameContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    editButton: {
      marginLeft: 8,
      padding: 4,
    },
    editContainer: {
      width: "100%",
      alignItems: "center",
      marginBottom: 5,
    },
    editInput: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      borderBottomWidth: 1,
      borderBottomColor: colors.tint,
      paddingVertical: 4,
      paddingHorizontal: 8,
      minWidth: 200,
      textAlign: "center",
      marginBottom: 10,
    },
    editActions: {
      flexDirection: "row",
      gap: 12,
    },
    editActionButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
      minWidth: 60,
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: colors.icon,
    },
    saveButton: {
      backgroundColor: colors.tint,
    },
    userEmail: {
      fontSize: 16,
      color: colors.icon,
      marginBottom: 10,
    },
    memberSince: {
      fontSize: 14,
      color: colors.icon,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    statItem: {
      alignItems: "center",
    },
    statNumber: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.tint,
    },
    statLabel: {
      fontSize: 14,
      color: colors.icon,
      marginTop: 5,
    },
    section: {
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 15,
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingLeft: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
      marginBottom: 3,
    },
    settingDescription: {
      fontSize: 14,
      color: colors.icon,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    actionButtonText: {
      fontSize: 16,
      fontWeight: "500",
      marginLeft: 15,
    },
    editProfileText: {
      color: colors.tint,
    },
    signOutText: {
      color: colors.error,
    },
    disabledSetting: {
      opacity: 0.5,
    },
  });
  return { styles, colors };
}
