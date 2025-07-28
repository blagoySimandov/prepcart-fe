import React, { createContext, useContext, ReactNode } from "react";
import { Recipe } from "./types";
import { useUserRecipes } from "./index";

interface RecipesContextType {
  recipes: Recipe[];
  isLoading: boolean;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

interface RecipesProviderProps {
  children: ReactNode;
}

export function RecipesProvider({ children }: RecipesProviderProps) {
  const { recipes, isLoading } = useUserRecipes();

  return (
    <RecipesContext.Provider value={{ recipes, isLoading }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipesContext(): RecipesContextType {
  const context = useContext(RecipesContext);
  if (context === undefined) {
    throw new Error("useRecipesContext must be used within a RecipesProvider");
  }
  return context;
}

export function useRecipe(recipeId: string): Recipe | null {
  const { recipes } = useRecipesContext();
  
  if (!recipeId) {
    return null;
  }
  
  return recipes.find(r => r.id === recipeId) || null;
}