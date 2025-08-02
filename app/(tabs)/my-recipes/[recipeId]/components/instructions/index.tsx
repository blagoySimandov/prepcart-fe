import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { InstructionsProps } from "./types";
import { TEXT_TYPES } from "@/constants/ui";

export function Instructions({ children }: InstructionsProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <ThemedText type={TEXT_TYPES.subtitle} style={styles.title}>
        Instructions & Videos
      </ThemedText>
      <View style={styles.list}>{children}</View>
    </View>
  );
}
