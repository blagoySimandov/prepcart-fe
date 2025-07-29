import { useState, useMemo, useCallback } from "react";
import { Ingredient } from "@/src/user/recipes/types";
import { useShoppingList } from "@/app/(tabs)/shopping-list/hooks";
import { useAlert } from "@/components/providers/alert-provider";
import { useRouter } from "expo-router";
import {
  formatIngredientForShoppingList,
  combineIngredients,
} from "../../utils/ingredient-formatter";
import { MODAL_MESSAGES } from "./constants";

// Helper to ensure consistent capitalization
const capitalizeIngredientName = (name: string) => 
  name.charAt(0).toUpperCase() + name.slice(1);

export function useAddToShoppingList(
  ingredients: Ingredient[],
  onClose: () => void,
) {
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useShoppingList();
  const { showAlert } = useAlert();
  const router = useRouter();

  // Initialize with all capitalized ingredient names
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    () => new Set(ingredients.map((ing) => capitalizeIngredientName(ing.name)))
  );

  const formattedIngredients = useMemo(() => {
    return ingredients.map((ing) =>
      formatIngredientForShoppingList(ing, servingMultiplier),
    );
  }, [ingredients, servingMultiplier]);

  const toggleIngredient = useCallback((name: string) => {
    setSelectedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    const allNames = new Set(
      ingredients.map((ing) => capitalizeIngredientName(ing.name))
    );
    setSelectedIngredients(allNames);
  }, [ingredients]);

  const deselectAll = useCallback(() => {
    setSelectedIngredients(new Set());
  }, []);

  const handleAddToShoppingList = useCallback(async () => {
    const itemsToAdd = formattedIngredients.filter((ing) =>
      selectedIngredients.has(ing.name),
    );

    if (itemsToAdd.length === 0) return;

    setIsAdding(true);
    try {
      // Combine similar items
      const combinedItems = combineIngredients(itemsToAdd);

      // Add each item to shopping list
      for (const item of combinedItems) {
        await addItem({
          name: item.name,
          quantity: item.quantity.toString(),
        });
      }

      const navigateToList = () => {
        onClose();
        router.push("/(tabs)/shopping-list");
      };

      showAlert(
        MODAL_MESSAGES.successTitle,
        `${combinedItems.length} ${MODAL_MESSAGES.successMessage}`,
        [
          { text: MODAL_MESSAGES.cancelButton },
          {
            text: MODAL_MESSAGES.navigateToList,
            onPress: navigateToList,
          },
        ],
      );

      onClose();
    } catch (error) {
      console.error("Error adding items to shopping list:", error);
      showAlert(MODAL_MESSAGES.errorTitle, MODAL_MESSAGES.errorMessage);
    } finally {
      setIsAdding(false);
    }
  }, [
    formattedIngredients,
    selectedIngredients,
    addItem,
    showAlert,
    onClose,
    router,
  ]);

  return {
    selectedIngredients,
    servingMultiplier,
    isAdding,
    formattedIngredients,
    toggleIngredient,
    selectAll,
    deselectAll,
    setServingMultiplier,
    handleAddToShoppingList,
  };
}

