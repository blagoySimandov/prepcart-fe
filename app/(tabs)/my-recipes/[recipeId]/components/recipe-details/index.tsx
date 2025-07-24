import React from "react";
import { ScrollView } from "react-native";
import { useStyles } from "./styles";
import { RecipeDetailsProps } from "./types";

export function RecipeDetails({ children }: RecipeDetailsProps) {
  const { styles } = useStyles();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}
