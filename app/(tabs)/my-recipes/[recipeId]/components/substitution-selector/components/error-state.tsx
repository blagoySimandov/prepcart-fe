import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "../styles";
import { SELECTOR_CONSTANTS } from "../constants";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.errorContainer}>
      <ThemedText style={styles.errorText}>
        {SELECTOR_CONSTANTS.ERROR_TEXT}
      </ThemedText>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <ThemedText style={styles.retryButtonText}>
          {SELECTOR_CONSTANTS.RETRY_TEXT}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}