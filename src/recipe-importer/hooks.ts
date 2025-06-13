import { useState } from "react";
import { Recipe } from "./types";

export const useRecipeImporter = () => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const importFromUrl = async (url: string) => {
    setLoading(true);
    console.log("(Mock) Importing from URL:", url);
    await new Promise((res) => setTimeout(res, 1500));
    setRecipes((prev) => [
      ...prev,
      {
        title: "Mock Recipe from URL",
        ingredients: ["1 cup Flour", "2 Eggs", "1/2 cup Sugar"],
        instructions: ["Mix ingredients", "Bake for 30 mins"],
        source: url,
      },
    ]);
    setLoading(false);
  };

  const importFromText = (text: string) => {
    setLoading(true);
    console.log("(Mock) Importing from Text:", text);
    setTimeout(() => {
      setRecipes((prev) => [
        ...prev,
        {
          title: "Mock Recipe from Text",
          ingredients: ["2 slices Bread", "1 slice Cheese"],
          instructions: ["Place cheese between bread", "Grill until golden"],
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return { loading, recipes, importFromUrl, importFromText };
};
