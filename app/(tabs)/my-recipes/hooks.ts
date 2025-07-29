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
import { FILTER_LABELS, FILTER_TIME_RANGES, ALERT_MESSAGES, BUTTON_TEXTS, IMPORT_TIMEOUT } from "./constants";

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
        matchesFilter = recipe.cookTimeMinutes <= FILTER_TIME_RANGES.quick.max;
        break;
      case "medium":
        matchesFilter =
          recipe.cookTimeMinutes > FILTER_TIME_RANGES.medium.min && 
          recipe.cookTimeMinutes <= FILTER_TIME_RANGES.medium.max;
        break;
      case "long":
        matchesFilter = recipe.cookTimeMinutes > FILTER_TIME_RANGES.long.min;
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

    return FILTER_LABELS[selectedFilter] || "";
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
      showAlert(ALERT_MESSAGES.error.title, ALERT_MESSAGES.error.loginRequired);
      return;
    }

    showAlert(
      ALERT_MESSAGES.deleteRecipe.title,
      ALERT_MESSAGES.deleteRecipe.getMessage(recipe.displayTitle),
      [
        {
          text: BUTTON_TEXTS.cancel,
          style: "cancel",
        },
        {
          text: BUTTON_TEXTS.delete,
          style: "destructive",
          onPress: async () => {
            try {
              await deleteRecipe(user.uid, recipe.id);
              showAlert(ALERT_MESSAGES.success.title, ALERT_MESSAGES.success.recipeDeleted);
            } catch (error) {
              console.error("Error deleting recipe:", error);
              showAlert(ALERT_MESSAGES.error.title, ALERT_MESSAGES.error.deleteRecipeFailed);
            }
          },
        },
      ],
    );
  };

  const handleImportRecipe = async (url: string) => {
    if (!user?.uid) {
      showAlert(ALERT_MESSAGES.error.title, ALERT_MESSAGES.error.loginRequiredImport);
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
                ALERT_MESSAGES.importRecipe.completeTitle,
                ALERT_MESSAGES.importRecipe.getMessage(data.displayTitle),
                [
                  {
                    text: BUTTON_TEXTS.viewRecipe,
                    onPress: () =>
                      router.push(`/(tabs)/my-recipes/${importResponse.id}`),
                  },
                  { text: BUTTON_TEXTS.ok },
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
          showAlert(ALERT_MESSAGES.error.title, ALERT_MESSAGES.error.importStatusFailed);
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
            ALERT_MESSAGES.importRecipe.timeoutTitle,
            ALERT_MESSAGES.importRecipe.timeoutMessage,
          );
        }
      }, IMPORT_TIMEOUT);
    } catch (error) {
      console.error("Error importing recipe:", error);
      showAlert(ALERT_MESSAGES.importRecipe.failedTitle, ALERT_MESSAGES.importRecipe.failedMessage);
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
