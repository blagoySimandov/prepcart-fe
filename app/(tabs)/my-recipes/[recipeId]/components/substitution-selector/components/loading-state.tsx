import React from "react";
import { View, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "../styles";
import { SELECTOR_CONSTANTS } from "../constants";

export function LoadingState() {
  const { styles, colors } = useStyles();

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.tint} />
      <ThemedText style={styles.loadingText}>
        {SELECTOR_CONSTANTS.LOADING_TEXT}
      </ThemedText>
    </View>
  );
}