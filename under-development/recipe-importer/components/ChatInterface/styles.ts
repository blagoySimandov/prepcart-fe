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
    safeArea: {
      flex: 1,
      paddingBottom: 80, // Account for tab bar height
    },
    header: {
      padding: 20,
      paddingBottom: 10,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      textAlign: "center",
      marginBottom: 5,
    },
    headerSubtitle: {
      textAlign: "center",
      opacity: 0.7,
      fontSize: 14,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    chatContainer: {
      flex: 1,
    },
    chatContentContainer: {
      flexGrow: 1,
      padding: 15,
    },
  });

  return { styles, colors };
}
