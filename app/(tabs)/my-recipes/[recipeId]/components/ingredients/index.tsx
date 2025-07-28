import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { IngredientsProps } from "./types";
import { TEXT_TYPES } from "@/constants/ui";

export function Ingredients({ children }: IngredientsProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <ThemedText type={TEXT_TYPES.subtitle} style={styles.title}>
        Ingredients
      </ThemedText>

      <View style={styles.ingredientsList}>{children}</View>
    </View>
  );
}
