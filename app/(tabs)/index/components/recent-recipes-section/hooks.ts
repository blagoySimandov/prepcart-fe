import { useRecipesContext } from "@/src/user/recipes/context";
import { router } from "expo-router";
import { useCallback } from "react";
import { RECENT_RECIPES_LIMIT } from "./constants";

export const useRecentRecipes = () => {
  const { recipes, isLoading } = useRecipesContext();

  const recentRecipes = recipes.slice(0, RECENT_RECIPES_LIMIT);

  const handleViewAll = useCallback(() => {
    router.push("/(tabs)/my-recipes");
  }, []);

  const handleRecipePress = useCallback((recipeId: string) => {
    router.push(`/(tabs)/my-recipes/${recipeId}`);
  }, []);

  return {
    recentRecipes,
    isLoading,
    hasRecipes: recipes.length > 0,
    handleViewAll,
    handleRecipePress,
  };
};