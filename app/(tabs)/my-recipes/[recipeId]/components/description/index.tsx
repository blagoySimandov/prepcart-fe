import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { DescriptionProps } from "./types";

export function Description({ children }: DescriptionProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>{children}</ThemedText>
    </View>
  );
}
