import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export const PDF_JS_VIEWER_BASE_URL =
  "https://mozilla.github.io/pdf.js/web/viewer.html";

export const usePdfViewerStyles = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    webview: {
      flex: 1,
    },
    loadingContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.1)",
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: themeColors.text,
    },
    pageHeader: {
      padding: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: themeColors.tint,
    },
    pageHeaderText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
    },
  });

  return { styles, themeColors };
};
