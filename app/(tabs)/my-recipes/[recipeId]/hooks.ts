import { useUserRecipes } from "@/src/user/recipes";
import { Recipe } from "@/src/user/recipes/types";

// Mock recipe data for development

export function useRecipe(recipeId: string): Recipe | null {
  if (!recipeId) {
    return null;
  }
  //eslint-disable-next-line
  const [recipe] = useUserRecipes();

  console.log("🔍 Looking for recipe with ID:", recipeId);
  console.log("📋 Returning mock recipe for testing");

  return recipe;
}
