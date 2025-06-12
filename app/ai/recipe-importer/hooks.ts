import { Recipe } from "@/app/(tabs)/recipe-importer/types";
import { useState } from "react";
import { Alert } from "react-native";
import { RecipeImporter } from "./manager";

export const useRecipeImporter = () => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const importFromUrl = async (url: string) => {
    setLoading(true);
    try {
      const recipe = await RecipeImporter.importFromUrl(url);
      if (recipe) {
        setRecipes((prev) => [...prev, recipe]);
        Alert.alert("Success", "Recipe imported successfully!");
      } else {
        Alert.alert("Error", "Could not import recipe from URL");
      }
    } catch {
      Alert.alert("Error", "Failed to import recipe");
    } finally {
      setLoading(false);
    }
  };

  const importFromText = (text: string) => {
    const recipe = RecipeImporter.parseFromText(text);
    if (recipe) {
      setRecipes((prev) => [...prev, recipe]);
      Alert.alert("Success", "Recipe parsed successfully!");
    } else {
      Alert.alert("Error", "Could not parse recipe from text");
    }
  };

  return {
    loading,
    recipes,
    importFromUrl,
    importFromText,
  };
};
