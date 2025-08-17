import { StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CARD_DIMENSIONS, SHADOWS, TYPOGRAPHY, LAYOUT } from "./constants";

export function useRecentItemsStyles() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      marginTop: 16,
    },
    sectionHeader: {
      paddingHorizontal: LAYOUT.containerPadding,
      marginBottom: 4,
    },
    sectionTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: 44,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    sectionTitleRowPressed: {
      backgroundColor: colors.border,
      opacity: 0.8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    sectionSubtitleContainer: {
      paddingLeft: 8,
      marginTop: -4,
    },
    sectionSubtitle: {
      fontSize: 13,
      fontWeight: "500",
      color: colors.icon,
      opacity: 0.8,
    },
    chevronButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: colors.background,
      marginLeft: 12,
      minWidth: 44,
      minHeight: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    chevronButtonPressed: {
      backgroundColor: colors.border,
      transform: [{ scale: 0.95 }],
    },
    listContainer: {
      paddingHorizontal: LAYOUT.containerPadding,
      marginBottom: 8,
    },
    scrollContent: {
      paddingRight: LAYOUT.containerPadding,
    },
    collapsibleContent: {
      overflow: "hidden",
    },
    gestureIndicator: {
      position: "absolute",
      bottom: -2,
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: colors.tint,
      opacity: 0,
      borderRadius: 1,
    },

    // Card Styles
    cardContainer: {
      marginRight: LAYOUT.itemSpacing,
      borderRadius: CARD_DIMENSIONS.borderRadius,
      backgroundColor: colors.card,
      ...SHADOWS.card,
      overflow: "hidden",
    },
    cardContent: {
      padding: LAYOUT.contentPadding,
      height: CARD_DIMENSIONS.height,
      width: CARD_DIMENSIONS.width,
      justifyContent: "space-between",
    },
    cardPressed: {
      backgroundColor: colors.background,
      ...SHADOWS.pressed,
    },

    // Content Styles
    itemHeader: {
      flex: 1,
      marginBottom: 8,
    },
    itemName: {
      ...TYPOGRAPHY.itemName,
      color: colors.text,
      flex: 1,
    },

    itemDetails: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      flex: 1,
    },
    quantityText: {
      ...TYPOGRAPHY.itemDetails,
      color: colors.text,
      marginRight: 4,
    },
    unitText: {
      ...TYPOGRAPHY.itemDetails,
      color: colors.icon,
      opacity: 0.8,
    },

    // Empty State
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 32,
      paddingHorizontal: LAYOUT.containerPadding,
    },
    emptyIcon: {
      marginBottom: 12,
      opacity: 0.5,
    },
    emptyTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
      textAlign: "center",
    },
    emptyMessage: {
      fontSize: 14,
      color: colors.icon,
      textAlign: "center",
      lineHeight: 20,
    },

    // Loading State
    loadingContainer: {
      flexDirection: "row",
      paddingHorizontal: LAYOUT.containerPadding,
    },
    skeletonCard: {
      width: CARD_DIMENSIONS.width,
      height: CARD_DIMENSIONS.height,
      borderRadius: CARD_DIMENSIONS.borderRadius,
      backgroundColor: colors.border,
      marginRight: LAYOUT.itemSpacing,
      opacity: 0.3,
    },

    // Interaction States
    touchableArea: {
      borderRadius: CARD_DIMENSIONS.borderRadius,
      overflow: "hidden",
    },
    rippleContainer: {
      borderRadius: CARD_DIMENSIONS.borderRadius,
    },

    // Gradient Overlay
    gradientOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: CARD_DIMENSIONS.borderRadius,
      opacity: 0.05,
    },

    // Context Menu
    contextMenuOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.1)",
      borderRadius: CARD_DIMENSIONS.borderRadius,
      justifyContent: "center",
      alignItems: "center",
    },
    contextMenuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: colors.card,
      borderRadius: 8,
      marginVertical: 2,
      minWidth: 100,
    },
    contextMenuText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.text,
      marginLeft: 8,
    },
  });

  return { styles, colors };
}

