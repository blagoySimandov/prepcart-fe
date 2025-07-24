import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { IngredientsProps } from "./types";

export function Ingredients({ children }: IngredientsProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Ingredients
      </ThemedText>
      <View style={styles.ingredientsList}>{children}</View>
    </View>
  );
}
