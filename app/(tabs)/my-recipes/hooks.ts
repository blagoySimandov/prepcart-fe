import { useUserRecipes } from "@/src/user/recipes";
import { Recipe } from "@/src/user/recipes/types";
import { router } from "expo-router";
import { useState } from "react";
import {
  importTikTokRecipe,
  TikTokImportResponse,
} from "./services/tiktok-import-webhook";
import { useAuth } from "@/src/auth/hooks";
import { doc, onSnapshot } from "@react-native-firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAlert } from "@/components/providers/alert-provider";
import { deleteRecipe } from "./services/recipe-deletion";

export type FilterOption = "all" | "quick" | "medium" | "long";

export function useRecipeFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("all");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const { recipes: userSavedRecipes } = useUserRecipes();

  const filteredRecipes = userSavedRecipes.filter((recipe) => {
    const matchesSearch =
      recipe.displayTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.displayDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    switch (selectedFilter) {
      case "quick":
        matchesFilter = recipe.cookTimeMinutes <= 30;
        break;
      case "medium":
        matchesFilter =
          recipe.cookTimeMinutes > 30 && recipe.cookTimeMinutes <= 60;
        break;
      case "long":
        matchesFilter = recipe.cookTimeMinutes > 60;
        break;
      case "all":
      default:
        matchesFilter = true;
        break;
    }

    return matchesSearch && matchesFilter;
  });

  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFilter("all");
  };

  const getFilterStatusText = () => {
    if (selectedFilter === "all") return "";

    const filterLabels = {
      quick: "Quick recipes",
      medium: "Medium recipes",
      long: "Long recipes",
    };

    return filterLabels[selectedFilter] || "";
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    filterModalVisible,
    filteredRecipes,
    openFilterModal,
    closeFilterModal,
    clearFilters,
    getFilterStatusText,
  };
}

export function useRecipeActions() {
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [importingRecipes, setImportingRecipes] = useState<
    Map<string, TikTokImportResponse>
  >(new Map());

  const handleRecipePress = (recipe: Recipe, _index: number) => {
    router.push(`/(tabs)/my-recipes/${recipe.id}`);
  };

  const handleDeleteRecipe = async (recipe: Recipe) => {
    if (!user?.uid) {
      showAlert("Error", "You must be logged in to delete recipes");
      return;
    }

    showAlert(
      "Delete Recipe?",
      `Are you sure you want to delete "${recipe.displayTitle}"? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteRecipe(user.uid, recipe.id);
              showAlert("Success", "Recipe deleted successfully");
            } catch (error) {
              console.error("Error deleting recipe:", error);
              showAlert("Error", "Failed to delete recipe. Please try again.");
            }
          },
        },
      ],
    );
  };

  const handleImportRecipe = async (url: string) => {
    if (!user?.uid) {
      showAlert("Error", "You must be logged in to import recipes");
      return;
    }

    try {
      // Call the webhook to initiate import
      const importResponse = await importTikTokRecipe(url, user.uid);

      // Add to importing map with full response data
      setImportingRecipes((prev) => {
        const newMap = new Map(prev);
        newMap.set(importResponse.id, importResponse);
        return newMap;
      });

      // Listen for recipe completion
      const recipeDocRef = doc(
        db,
        "users",
        user.uid,
        "recipes",
        importResponse.id,
      );

      const unsubscribe = onSnapshot(
        recipeDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (!data) return;

            if (data.ingredients && data.ingredients.length > 0) {
              setImportingRecipes((prev) => {
                const newMap = new Map(prev);
                newMap.delete(importResponse.id);
                return newMap;
              });

              showAlert(
                "Import Complete!",
                `"${data.displayTitle}" has been added to your recipes.`,
                [
                  {
                    text: "View Recipe",
                    onPress: () =>
                      router.push(`/(tabs)/my-recipes/${importResponse.id}`),
                  },
                  { text: "OK" },
                ],
              );

              unsubscribe();
            }
          }
        },
        (error) => {
          console.error("Error listening to recipe updates:", error);
          setImportingRecipes((prev) => {
            const newMap = new Map(prev);
            newMap.delete(importResponse.id);
            return newMap;
          });
          showAlert("Error", "Failed to track recipe import status");
          unsubscribe();
        },
      );

      setTimeout(() => {
        if (importingRecipes.has(importResponse.id)) {
          unsubscribe();
          setImportingRecipes((prev) => {
            const newMap = new Map(prev);
            newMap.delete(importResponse.id);
            return newMap;
          });
          showAlert(
            "Import Taking Longer Than Expected",
            "The recipe import is taking longer than usual. Please check your recipes later.",
          );
        }
      }, 60000); // 1 minute timeout
    } catch (error) {
      console.error("Error importing recipe:", error);
      showAlert("Import Failed", "Failed to import recipe. Please try again.");
    }
  };

  const currentImport =
    importingRecipes.size > 0 ? Array.from(importingRecipes.values())[0] : null;

  return {
    handleRecipePress,
    handleImportRecipe,
    handleDeleteRecipe,
    importingRecipes,
    currentImport,
  };
}
