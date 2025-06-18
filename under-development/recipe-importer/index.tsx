import { useRecipeImporter } from "@/src/recipe-importer/hooks";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ChatInterface } from "./components/ChatInterface";

export function RecipeImporterScreen() {
  const { loading, recipes, importFromUrl, importFromText } =
    useRecipeImporter();
  const [aiResponse, setAiResponse] = useState<string>();

  const handleRecipeImportUrl = async (url: string) => {
    await importFromUrl(url);
  };

  const handleRecipeImportText = (text: string) => {
    importFromText(text);
  };

  const handleCalorieAnalysis = (imageUri: string) => {
    // TODO: Implement calorie analysis functionality
    Alert.alert(
      "Coming Soon",
      "Calorie analysis feature will be available soon!",
    );
  };

  // Generate AI response when new recipes are imported
  useEffect(() => {
    if (recipes.length > 0) {
      const latestRecipe = recipes[recipes.length - 1];
      const response = `Great! I've successfully imported "${
        latestRecipe.title
      }" for you. Here's what I found:

📝 **${latestRecipe.title}**

🥘 **Ingredients** (${latestRecipe.ingredients.length} items):
${latestRecipe.ingredients
  .map((ingredient: string) => `• ${ingredient}`)
  .join("\n")}

👨‍🍳 **Instructions** (${latestRecipe.instructions.length} steps):
${latestRecipe.instructions
  .map((instruction: string, index: number) => `${index + 1}. ${instruction}`)
  .join("\n")}

${latestRecipe.source ? `\n🔗 **Source**: ${latestRecipe.source}` : ""}

Would you like me to help you with anything else? I can import more recipes, analyze nutrition information, or answer cooking questions!`;

      setAiResponse(response);
    }
  }, [recipes]);

  return (
    <ChatInterface
      onRecipeImportUrl={handleRecipeImportUrl}
      onRecipeImportText={handleRecipeImportText}
      onCalorieAnalysis={handleCalorieAnalysis}
      loading={loading}
      aiResponse={aiResponse}
    />
  );
}
