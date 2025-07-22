import React from "react";
import { ScrollView } from "react-native";
import { useStyles } from "./styles";
import { SmallRecipeCardsProps } from "./types";

export function SmallRecipeCards({ children }: SmallRecipeCardsProps) {
  const { styles } = useStyles();

  return (
    <ScrollView
      style={styles.recipeCardsContainer}
      contentContainerStyle={styles.recipeCardsContent}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}
