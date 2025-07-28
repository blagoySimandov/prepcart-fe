import { Recipe } from "@/src/user/recipes/types";
import { useRecipe as useRecipeFromContext } from "@/src/user/recipes/context";

export function useRecipe(recipeId: string): Recipe | null {
  return useRecipeFromContext(recipeId);
}
