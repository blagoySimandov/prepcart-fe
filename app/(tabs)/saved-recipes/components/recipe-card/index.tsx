import { Recipe } from "@/src/types";
import { ActionButton } from "@/src/ui/action-button";
import React, { useState } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { RecipeDescription } from "./components/recipe-description";
import { RecipeImage } from "./components/recipe-image";
import { RecipeStats } from "./components/recipe-stats";
import { useStyles } from "./styles";

interface RecipeCardProps {
  recipe: Recipe;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function RecipeCard({ recipe, onPress, style }: RecipeCardProps) {
  const styles = useStyles();
  const [isAddingToShoppingList, setIsAddingToShoppingList] = useState(false);

  const ingredientsCount = recipe.ingredients?.length || 0;
  const instructionsCount = recipe.instructions?.length || 0;
  const cookTime = recipe.cookTimeMinutes || 0;

  const imageUri = recipe.thumbnail || recipe.dynamicCover;
  const title = recipe.displayTitle || "Delicious Recipe";
  const description = recipe.displayDescription;

  const handleAddToShoppingList = async () => {
    setIsAddingToShoppingList(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsAddingToShoppingList(false);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}>
      <RecipeImage imageUri={imageUri} title={title} />

      <View style={styles.content}>
        <RecipeDescription description={description} />

        <RecipeStats
          ingredientsCount={ingredientsCount}
          instructionsCount={instructionsCount}
          cookTimeMinutes={cookTime}
        />

        <View style={styles.actionContainer}>
          <ActionButton onPress={onPress} variant="primary" size="compact">
            View Recipe
          </ActionButton>
          <ActionButton
            onPress={handleAddToShoppingList}
            variant="outline"
            loading={isAddingToShoppingList}
            size="compact"
            fullWidth>
            {isAddingToShoppingList ? "Adding..." : "Add to Shopping List"}
          </ActionButton>
        </View>
      </View>
    </TouchableOpacity>
  );
}
