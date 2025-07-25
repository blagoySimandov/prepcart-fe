import { useUserRecipes } from "@/src/user/recipes";
import { Recipe } from "@/src/user/recipes/types";

export function useRecipe(recipeId: string): Recipe | null {
  const recipes = useUserRecipes();

  if (!recipeId) {
    return null;
  }

  // Find the recipe with the matching ID from already-fetched recipes
  const recipe = recipes.find(r => r.id === recipeId);

  return recipe || null;
}
