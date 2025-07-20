import { ThemedView } from "@/components/ThemedView";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImportRecipeButton } from "./components/import-recipe-button";
import { RecipeCard } from "./components/recipe-card";
import { SavedRecipesHeader } from "./components/saved-recipes-header";
import { MOCK_RECIPES } from "./constants";
import { useStyles } from "./styles";

export default function SavedRecipesScreen() {
  const { styles } = useStyles();

  const handleImportRecipe = (url: string) => {
    console.log("Importing recipe from URL:", url);
    // TODO: Implement actual recipe import logic
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <SavedRecipesHeader />

        <View style={styles.importSection}>
          <ImportRecipeButton onImport={handleImportRecipe} />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {MOCK_RECIPES.map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
