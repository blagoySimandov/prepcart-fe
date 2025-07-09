import { useAlert } from "@/components/providers/AlertProvider";
import { analytics } from "@/firebaseConfig";
import { Discount, ProductCandidate } from "@/src/discounts/types";
import { useUserService } from "@/src/user";
import { ShoppingItem } from "@/src/user/shopping-list/types";
import { removeUndefined } from "@/src/utils";
import { ItemParser } from "@/src/utils/item-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_CURRENCY = "BGN";

export function useShoppingList() {
  const userService = useUserService();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userService) {
      setIsLoading(false);
      setItems([]);
      return;
    }

    setIsLoading(true);

    const unsubscribe = userService.shoppingList.onListUpdate(
      (loadedItems: ShoppingItem[]) => {
        setItems(loadedItems);
        setIsLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [userService]);

  const addItem = useCallback(
    async (item: { name: string; quantity: string }) => {
      if (!userService) return;

      const combinedInput = `${item.name} ${item.quantity}`.trim();
      const parsedItem = ItemParser.parse(combinedInput);

      const firestoreDoc = ItemParser.toFirestoreDocument(
        parsedItem,
        userService.userId,
      );

      firestoreDoc.name = item.name;
      firestoreDoc.quantity = parsedItem.quantity;
      firestoreDoc.unit = parsedItem.unit;

      await userService.shoppingList.addParsedItem(firestoreDoc);
      analytics.logEvent("add_shopping_list_item", { name: item.name });
    },
    [userService],
  );

  const updateItem = useCallback(
    async (id: string, updatedData: Partial<ShoppingItem>) => {
      if (!userService) return;
      await userService.shoppingList.updateItem(id, updatedData);
      analytics.logEvent("update_shopping_list_item");
    },
    [userService],
  );

  const toggleItem = useCallback(
    async (id: string) => {
      if (!userService) return;
      const itemToToggle = items.find((item) => item.id === id);
      if (itemToToggle) {
        await updateItem(id, { completed: !itemToToggle.completed });
        analytics.logEvent("toggle_shopping_list_item", {
          completed: !itemToToggle.completed,
        });
      }
    },
    [userService, items, updateItem],
  );

  const deleteItem = useCallback(
    async (id: string) => {
      if (!userService) return;
      await userService.shoppingList.deleteItem(id);
      analytics.logEvent("delete_shopping_list_item");
    },
    [userService],
  );

  const clearCompleted = useCallback(async () => {
    if (!userService) return;
    const completedItems = items.filter((item) => item.completed);
    await userService.shoppingList.archiveCompletedItems(completedItems);
    analytics.logEvent("clear_completed_shopping_list_items", {
      count: completedItems.length,
    });
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

export function useDiscounts(items: ShoppingItem[], selectedStores?: string[]) {
  const userService = useUserService();
  const [isFindingDiscounts, setIsFindingDiscounts] = useState(false);
  const { showAlert } = useAlert();

  const findDiscounts = useCallback(async () => {
    if (!userService || items.length === 0) return;

    setIsFindingDiscounts(true);
    analytics.logEvent("find_discounts_for_shopping_list", {
      item_count: items.length,
      selected_stores: selectedStores?.length || 0,
    });
    try {
      const result = await userService.discounts.findDiscountsForItems(
        items,
        5,
        selectedStores,
      );
      const { matches, unmatched_items: unmatchedItems } = result;

      const updatedItems = items.map((item) => {
        const match = matches.find((m) => m.shopping_list_item.id === item.id);
        const foundDiscounts = match ? match.matched_products : [];
        let calculatedSavings: ShoppingItem["calculatedSavings"] = undefined;
        if (foundDiscounts.length > 0) {
          const bestDiscount = foundDiscounts.find(
            (d: ProductCandidate) =>
              d.quantity_multiplier && d.quantity_multiplier > 0,
          );
          if (bestDiscount && bestDiscount.quantity_multiplier) {
            const savingsAmount =
              bestDiscount.price_before_discount_local *
              bestDiscount.quantity_multiplier;
            calculatedSavings = {
              amount: savingsAmount,
              currency: bestDiscount.currency_local || DEFAULT_CURRENCY,
              bestDiscountId: bestDiscount.id,
            };
          }
        }

        const base = {
          ...item,
          detectedDiscounts: foundDiscounts as unknown as Discount[],
        };
        return calculatedSavings !== undefined
          ? { ...base, calculatedSavings }
          : base;
      });

      const itemSavingsByCurrency: Record<string, number> = {};
      updatedItems.forEach((item) => {
        if (item.detectedDiscounts && item.detectedDiscounts.length > 0) {
          const bestDiscount = item.detectedDiscounts.find(
            (d) => d.quantity_multiplier && d.quantity_multiplier > 0,
          );
          if (bestDiscount && bestDiscount.quantity_multiplier) {
            const perUnitSavings =
              bestDiscount.price_before_discount_local *
              (bestDiscount.discount_percent / 100);
            const total = bestDiscount.quantity_multiplier * perUnitSavings;
            const currency = bestDiscount.currency_local || "BGN";
            itemSavingsByCurrency[currency] =
              (itemSavingsByCurrency[currency] || 0) + total;
          }
        }
      });
      const totalSavingsText = Object.entries(itemSavingsByCurrency)
        .map(([currency, amount]) => `${amount.toFixed(2)} ${currency}`)
        .join(", ");

      await userService.shoppingList.saveList(removeUndefined(updatedItems));

      analytics.logEvent("find_discounts_success", {
        matched_count: matches.length,
        unmatched_count: unmatchedItems.length,
        total_savings: JSON.stringify(itemSavingsByCurrency),
        filtered_stores: selectedStores?.length || 0,
      });

      const matchedCount = matches.length;
      const unmatchedCount = unmatchedItems.length;

      if (matchedCount > 0) {
        showAlert(
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
          }`,
        );
      } else {
        showAlert(
          "No Discounts Found",
          "Sorry, we couldn't find any discounts for your current shopping list items.",
        );
        analytics.logEvent("find_discounts_no_results");
      }
    } catch (error) {
      console.error("Error finding discounts:", error);
      analytics.logEvent("find_discounts_error", {
        error_message: (error as Error).message,
      });
      showAlert("Error", "Could not fetch discounts. Please try again later.");
    } finally {
      setIsFindingDiscounts(false);
    }
  }, [userService, items, selectedStores, showAlert]);

  return { findDiscounts, isFindingDiscounts };
}

export function useShoppingListModals() {
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [discountModalVisible, setDiscountModalVisible] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>([]);
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    const checkFirstTime = async () => {
      try {
        const hasSeenHelp = await AsyncStorage.getItem(
          "hasSeenShoppingListHelp",
        );
        if (!hasSeenHelp) {
          timeoutId = setTimeout(() => {
            setHelpModalVisible(true);
          }, 500);
        }
      } catch (error) {
        console.error("Error checking first time status:", error);
      }
    };

    checkFirstTime();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const openAddModal = useCallback(() => {
    setEditingItem(null);
    setItemModalVisible(true);
    analytics.logEvent("open_add_item_modal");
  }, []);

  const openEditModal = useCallback((item: ShoppingItem) => {
    setEditingItem(item);
    setItemModalVisible(true);
    analytics.logEvent("open_edit_item_modal");
  }, []);

  const closeItemModal = useCallback(() => {
    setItemModalVisible(false);
    setEditingItem(null);
  }, []);

  const openDiscountModal = useCallback((discounts: Discount[]) => {
    setSelectedDiscounts(discounts);
    setDiscountModalVisible(true);
    analytics.logEvent("open_discount_modal", {
      discount_count: discounts.length,
    });
  }, []);

  const closeDiscountModal = useCallback(() => {
    setDiscountModalVisible(false);
    setSelectedDiscounts([]);
  }, []);

  const openHelpModal = useCallback(() => {
    setHelpModalVisible(true);
    analytics.logEvent("open_shopping_list_help_modal");
  }, []);

  const closeHelpModal = useCallback(async () => {
    setHelpModalVisible(false);
    try {
      await AsyncStorage.setItem("hasSeenShoppingListHelp", "true");
    } catch (error) {
      console.error("Error saving help seen status:", error);
    }
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
    helpModal: {
      visible: helpModalVisible,
      open: openHelpModal,
      close: closeHelpModal,
    },
  };
}
