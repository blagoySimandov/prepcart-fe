import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    importSection: {
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    modalContent: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      width: "100%",
      maxWidth: 400,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
    },
    closeButton: {
      position: "absolute",
      top: 16,
      right: 16,
      zIndex: 1,
      width: 32,
      height: 32,
      borderRadius: 16,
      padding: 0,
    },
    urlInput: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 20,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.background,
      minHeight: 80,
      textAlignVertical: "top",
    },
    modalActions: {
      flexDirection: "row",
      gap: 12,
    },
  });

  return { styles };
}
