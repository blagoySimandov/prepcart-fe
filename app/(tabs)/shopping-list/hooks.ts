import { Discount } from "@/src/discounts/types";
import { useUserService } from "@/src/user";
import { ShoppingItem } from "@/src/user/shopping-list/types";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

export function useShoppingList() {
  const userService = useUserService();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userService) return;

    setIsLoading(true);
    const unsubscribe = userService.shoppingList.onListUpdate((loadedItems) => {
      setItems(loadedItems);
      if (isLoading) {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
    // //TODO: Figure out why this causes a rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userService]);

  const addItem = useCallback(
    async (item: { name: string; quantity: string }) => {
      if (!userService) return;
      const newItem: Omit<ShoppingItem, "id" | "detectedDiscounts"> = {
        name: item.name,
        quantity: item.quantity,
        completed: false,
        createdAt: new Date(),
      };
      await userService.shoppingList.addItem(newItem);
    },
    [userService]
  );

  const updateItem = useCallback(
    async (id: string, updatedData: Partial<ShoppingItem>) => {
      if (!userService) return;
      await userService.shoppingList.updateItem(id, updatedData);
    },
    [userService]
  );

  const toggleItem = useCallback(
    async (id: string) => {
      if (!userService) return;
      const itemToToggle = items.find((item) => item.id === id);
      if (itemToToggle) {
        await updateItem(id, { completed: !itemToToggle.completed });
      }
    },
    [userService, items, updateItem]
  );

  const deleteItem = useCallback(
    async (id: string) => {
      if (!userService) return;
      await userService.shoppingList.deleteItem(id);
    },
    [userService]
  );

  const clearCompleted = useCallback(async () => {
    if (!userService) return;
    const completedItems = items.filter((item) => item.completed);
    await userService.shoppingList.archiveCompletedItems(completedItems);
  }, [userService, items]);

  return {
    items,
    isLoading,
    addItem,
    updateItem,
    toggleItem,
    deleteItem,
    clearCompleted,
  };
}

export function useDiscounts(items: ShoppingItem[]) {
  const userService = useUserService();
  const [isFindingDiscounts, setIsFindingDiscounts] = useState(false);
  const [apiTotalSavings, setApiTotalSavings] = useState<
    Record<string, number>
  >({});

  const findDiscounts = useCallback(async () => {
    if (!userService || items.length === 0) return;

    setIsFindingDiscounts(true);
    try {
      const result = await userService.discounts.findDiscountsForItems(
        items,
        5
      );
      const { itemDiscounts, totalSavings, unmatchedItems, matches } = result;

      // await userService.updateUserStatistics(matches.length, totalSavings);

      const updatedItems = items.map((item) => {
        const foundDiscounts = itemDiscounts.get(item.id);
        return foundDiscounts
          ? { ...item, detectedDiscounts: foundDiscounts }
          : { ...item, detectedDiscounts: [] };
      });

      setApiTotalSavings(totalSavings);
      await userService.shoppingList.saveList(updatedItems);

      const matchedCount = matches.length;
      const unmatchedCount = unmatchedItems.length;
      const totalSavingsText = Object.entries(totalSavings)
        .map(
          ([currency, amount]) => `${(amount as number).toFixed(2)} ${currency}`
        )
        .join(", ");

      if (matchedCount > 0) {
        //TODO: Use a proper alert component
        Alert.alert(
          "Discounts Found!",
          `Found ${matchedCount} discount${
            matchedCount > 1 ? "s" : ""
          } for your items.${
            totalSavingsText ? `\nPotential savings: ${totalSavingsText}` : ""
          }${
            unmatchedCount > 0
              ? `\n\n${unmatchedCount} item${
                  unmatchedCount > 1 ? "s" : ""
                } had no matching discounts.`
              : ""
          }`
        );
      } else {
        Alert.alert(
          "No Discounts Found",
          "Sorry, we couldn't find any discounts for your current shopping list items."
        );
      }
    } catch (error) {
      console.error("Error finding discounts:", error);
      Alert.alert(
        "Error",
        "Could not fetch discounts. Please try again later."
      );
    } finally {
      setIsFindingDiscounts(false);
    }
  }, [userService, items]);

  return { findDiscounts, isFindingDiscounts, apiTotalSavings };
}

export function useShoppingListModals() {
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [discountModalVisible, setDiscountModalVisible] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>([]);

  const openAddModal = useCallback(() => {
    setEditingItem(null);
    setItemModalVisible(true);
  }, []);

  const openEditModal = useCallback((item: ShoppingItem) => {
    setEditingItem(item);
    setItemModalVisible(true);
  }, []);

  const closeItemModal = useCallback(() => {
    setItemModalVisible(false);
    setEditingItem(null);
  }, []);

  const openDiscountModal = useCallback((discounts: Discount[]) => {
    setSelectedDiscounts(discounts);
    setDiscountModalVisible(true);
  }, []);

  const closeDiscountModal = useCallback(() => {
    setDiscountModalVisible(false);
    setSelectedDiscounts([]);
  }, []);

  return {
    itemModal: {
      visible: itemModalVisible,
      editingItem,
      openAdd: openAddModal,
      openEdit: openEditModal,
      close: closeItemModal,
    },
    discountModal: {
      visible: discountModalVisible,
      discounts: selectedDiscounts,
      open: openDiscountModal,
      close: closeDiscountModal,
    },
  };
}
