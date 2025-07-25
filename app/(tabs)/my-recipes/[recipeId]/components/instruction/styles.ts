import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export function useStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      borderRadius: 16,
      borderWidth: 1,
      backgroundColor: colors.card,
      overflow: "hidden",
      position: "relative",
    },
    modifiedContainer: {
      borderWidth: 2,
      borderColor: "#FF9944",
    },
    modifiedIndicator: {
      position: "absolute",
      top: 12,
      right: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: "rgba(255, 153, 68, 0.1)",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      zIndex: 1,
    },
    modifiedText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#FF9944",
    },
    videoContainer: {
      height: 400,
      justifyContent: "center",
      alignItems: "center",
    },
    videoPlaceholder: {
      alignItems: "center",
      gap: 12,
    },
    videoText: {
      fontSize: 16,
      fontWeight: "500",
    },
    videoTimestamp: {
      fontSize: 12,
      opacity: 0.7,
    },
    textContainer: {
      padding: 20,
    },
    instructionText: {
      fontSize: 16,
      lineHeight: 24,
    },
    timerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 56,
      paddingHorizontal: 20,
      margin: 20,
      marginTop: 0,
      borderRadius: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    timerText: {
      fontSize: 16,
      fontWeight: "600",
    },
    videoWrapper: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
    video: {
      width: "100%",
      height: "100%",
    },
    videoOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    playButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      justifyContent: "center",
      alignItems: "center",
    },
    timestampOverlay: {
      position: "absolute",
      bottom: 16,
      right: 16,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    videoTapArea: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    timerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      flex: 1,
    },
    timerRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    timerControls: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    resetButton: {
      padding: 4,
    },
    startText: {
      fontSize: 16,
      fontWeight: "600",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    detailModal: {
      backgroundColor: colors.background,
      borderRadius: 16,
      padding: 20,
      width: "100%",
      maxWidth: 350,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    detailModalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    detailModalTitle: {
      fontSize: 18,
      fontWeight: "600",
    },
    detailSection: {
      marginBottom: 12,
    },
    detailLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.tabIconDefault,
      marginBottom: 4,
    },
    detailText: {
      fontSize: 14,
      lineHeight: 20,
    },
    strikethroughText: {
      textDecorationLine: "line-through",
      color: colors.tabIconDefault,
    },
  });

  return { styles, colors };
}
