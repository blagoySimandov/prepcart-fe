import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { InstructionsProps } from "./types";

export function Instructions({ children }: InstructionsProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Instructions
      </ThemedText>
      <View style={styles.list}>{children}</View>
    </View>
  );
}
