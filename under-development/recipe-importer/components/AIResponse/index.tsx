import React from "react";
import { View, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { AIResponseProps } from "./types";
import useStyles from "./styles";

export function AIResponse({ loading, response }: AIResponseProps) {
  const { styles, colors } = useStyles();

  if (loading) {
    return (
      <View style={styles.aiThinkingContainer}>
        <View style={styles.aiThinkingBubble}>
          <ActivityIndicator size="small" color={colors.tint} />
          <ThemedText style={styles.aiThinkingText}>
            AI is thinking...
          </ThemedText>
        </View>
      </View>
    );
  }

  if (!response) return null;

  return (
    <View style={styles.aiResponseContainer}>
      <View style={styles.aiResponseBubble}>
        <ThemedText style={styles.aiResponseText}>{response}</ThemedText>
      </View>
    </View>
  );
}
