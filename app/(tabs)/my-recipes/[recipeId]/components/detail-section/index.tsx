import React from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "./styles";
import { DetailSectionProps } from "./types";

export function DetailSection({
  label,
  children,
  strikethrough,
}: DetailSectionProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}:</ThemedText>
      <ThemedText
        style={[styles.text, strikethrough && styles.strikethroughText]}
      >
        {children}
      </ThemedText>
    </View>
  );
}

