import { useUserRecipes } from "@/src/user/recipes";
import { Recipe } from "@/src/user/recipes/types";
import { router } from "expo-router";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  importTikTokRecipe,
  TikTokImportResponse,
} from "./services/tiktok-import-webhook";
import { useAuth } from "@/src/auth/hooks";
import { doc, onSnapshot } from "@react-native-firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAlert } from "@/components/providers/alert-provider";
import { deleteRecipe } from "./services/recipe-deletion";
import { checkForDuplicateRecipe } from "./services/duplicate-recipe-check";
import { FILTER_LABELS, FILTER_TIME_RANGES, ALERT_MESSAGES, BUTTON_TEXTS, IMPORT_TIMEOUT } from "./constants";

export type FilterOption = "all" | "quick" | "medium" | "long";

export function useRecipeFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("all");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const { recipes: userSavedRecipes } = useUserRecipes();

  const filteredRecipes = useMemo(() => {
    return userSavedRecipes.filter((recipe) => {
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
  }, [userSavedRecipes, searchQuery, selectedFilter]);

  const openFilterModal = useCallback(() => setFilterModalVisible(true), []);
  const closeFilterModal = useCallback(() => setFilterModalVisible(false), []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedFilter("all");
  }, []);

  const getFilterStatusText = useCallback(() => {
    if (selectedFilter === "all") return "";

    return FILTER_LABELS[selectedFilter] || "";
  }, [selectedFilter]);

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
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const unsubscribeRefs = useRef<Map<string, () => void>>(new Map());

  // Cleanup all subscriptions and timeouts on unmount
  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeoutRefs.current.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
      timeoutRefs.current.clear();

      // Unsubscribe from all Firestore listeners
      unsubscribeRefs.current.forEach((unsubscribe) => {
        unsubscribe();
      });
      unsubscribeRefs.current.clear();
    };
  }, []);

  const handleRecipePress = useCallback((recipe: Recipe, _index: number) => {
    router.push(`/(tabs)/my-recipes/${recipe.id}`);
  }, []);

  const handleDeleteRecipe = useCallback(async (recipe: Recipe) => {
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
  }, [user?.uid, showAlert]);

  const handleImportRecipe = useCallback(async (url: string) => {
    if (!user?.uid) {
      showAlert(ALERT_MESSAGES.error.title, ALERT_MESSAGES.error.loginRequiredImport);
      return;
    }

    try {
      // Check for duplicate recipe first
      const duplicateCheck = await checkForDuplicateRecipe(user.uid, url);
      
      if (duplicateCheck.isDuplicate && duplicateCheck.existingRecipe) {
        showAlert(
          ALERT_MESSAGES.duplicateRecipe.title,
          ALERT_MESSAGES.duplicateRecipe.getMessage(duplicateCheck.existingRecipe.displayTitle),
          [
            {
              text: BUTTON_TEXTS.cancel,
              style: "cancel",
            },
            {
              text: BUTTON_TEXTS.goToRecipe,
              onPress: () => router.push(`/(tabs)/my-recipes/${duplicateCheck.existingRecipe!.id}`),
            },
          ]
        );
        return;
      }

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
              // Clear timeout since import completed successfully
              const timeoutId = timeoutRefs.current.get(importResponse.id);
              if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutRefs.current.delete(importResponse.id);
              }

              // Clean up the unsubscribe ref
              unsubscribeRefs.current.delete(importResponse.id);

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
          
          // Clear timeout since there was an error
          const timeoutId = timeoutRefs.current.get(importResponse.id);
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutRefs.current.delete(importResponse.id);
          }

          // Clean up the unsubscribe ref
          unsubscribeRefs.current.delete(importResponse.id);

          setImportingRecipes((prev) => {
            const newMap = new Map(prev);
            newMap.delete(importResponse.id);
            return newMap;
          });
          showAlert(ALERT_MESSAGES.error.title, ALERT_MESSAGES.error.importStatusFailed);
          unsubscribe();
        },
      );

      // Store the unsubscribe function for cleanup
      unsubscribeRefs.current.set(importResponse.id, unsubscribe);

      // Set up timeout
      const timeoutId = setTimeout(() => {
        // Clean up timeout ref
        timeoutRefs.current.delete(importResponse.id);
        
        // Clean up the unsubscribe ref and call unsubscribe
        const unsubscribeFunc = unsubscribeRefs.current.get(importResponse.id);
        if (unsubscribeFunc) {
          unsubscribeFunc();
          unsubscribeRefs.current.delete(importResponse.id);
        }
        
        setImportingRecipes((prev) => {
          const newMap = new Map(prev);
          newMap.delete(importResponse.id);
          return newMap;
        });
        showAlert(
          ALERT_MESSAGES.importRecipe.timeoutTitle,
          ALERT_MESSAGES.importRecipe.timeoutMessage,
        );
      }, IMPORT_TIMEOUT);

      // Store timeout ref for cleanup
      timeoutRefs.current.set(importResponse.id, timeoutId);
    } catch (error) {
      console.error("Error importing recipe:", error);
      showAlert(ALERT_MESSAGES.importRecipe.failedTitle, ALERT_MESSAGES.importRecipe.failedMessage);
    }
  }, [user?.uid, showAlert]);

  const currentImport = useMemo(() => 
    importingRecipes.size > 0 ? Array.from(importingRecipes.values())[0] : null,
    [importingRecipes]
  );

  return {
    handleRecipePress,
    handleImportRecipe,
    handleDeleteRecipe,
    importingRecipes,
    currentImport,
  };
}
