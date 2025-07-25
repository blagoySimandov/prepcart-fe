import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export const useStyles = () => {
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "tabIconDefault");
  const textColor = useThemeColor({}, "text");
  const secondaryText = useThemeColor({}, "tabIconDefault");
  const tint = useThemeColor({}, "tint");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      backgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "80%",
      paddingBottom: 20,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: secondaryText,
    },
    scrollView: {
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    optionItem: {
      backgroundColor,
      borderWidth: 1,
      borderColor,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    optionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    optionName: {
      fontSize: 16,
      fontWeight: "500",
    },
    optionQuantity: {
      fontSize: 14,
      color: tint,
      fontWeight: "600",
    },
    optionDetail: {
      marginTop: 8,
    },
    optionDetailLabel: {
      fontSize: 12,
      color: secondaryText,
      fontWeight: "600",
      marginBottom: 2,
    },
    optionDetailText: {
      fontSize: 14,
      color: textColor,
      lineHeight: 20,
    },
    selectButton: {
      backgroundColor: tint,
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 16,
      marginTop: 12,
      alignSelf: "flex-start",
    },
    selectButtonText: {
      color: "white",
      fontSize: 14,
      fontWeight: "600",
    },
    closeButton: {
      marginHorizontal: 20,
      marginTop: 16,
      paddingVertical: 14,
      borderRadius: 8,
      borderWidth: 1,
      borderColor,
      alignItems: "center",
    },
    closeButtonText: {
      fontSize: 16,
      fontWeight: "500",
      color: textColor,
    },
  });

  return { styles, colors: { backgroundColor, borderColor, textColor, secondaryText, tint } };
};