import { ThemedView } from "@/components/ThemedView";
import { Discount } from "@/src/discounts/types";
import { useUserService } from "@/src/user";
import { ShoppingItem as ShoppingItemType } from "@/src/user/shopping-list/types";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, View } from "react-native";
import { AddItemModal } from "./components/add-item-modal";
import { DiscountModal } from "./components/discount-modal";
import { SavingsSummary } from "./components/savings-summary";
import { ShoppingListHeader } from "./components/shopping-list-header";
import { ShoppingListView } from "./components/shopping-list-view";
import { useStyles } from "./styles";

export function ShoppingListScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItemType | null>(null);
  const [discountModalVisible, setDiscountModalVisible] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>([]);
  const [items, setItems] = useState<ShoppingItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFindingDiscounts, setIsFindingDiscounts] = useState(false);
  const [apiTotalSavings, setApiTotalSavings] = useState<
    Record<string, number>
  >({});
  const [unmatchedItems, setUnmatchedItems] = useState<string[]>([]);

  const userService = useUserService();
  const { styles } = useStyles();

  useEffect(() => {
    const loadList = async () => {
      if (userService) {
        setIsLoading(true);
        const loadedItems = await userService.shoppingList.loadList();
        setItems(loadedItems);
        setIsLoading(false);
      }
    };
    loadList();
  }, [userService]);

  const openAddModal = () => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const openEditModal = (item: ShoppingItemType) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  const handleFindDiscounts = async () => {
    if (!userService) return;

    setIsFindingDiscounts(true);
    try {
      const result = await userService.discounts.findDiscountsForItems(
        items,
        5
      );
      const {
        itemDiscounts,
        totalSavings,
        unmatchedItems: unmatched,
        matches,
      } = result;

      await userService.updateUserStatistics(matches.length, totalSavings);

      console.log("Discount search results:", {
        totalMatches: matches.length,
        totalSavings,
        unmatchedItems: unmatched,
      });

      const updatedItems = items.map((item) => {
        const foundDiscounts = itemDiscounts.get(item.id);
        return foundDiscounts
          ? { ...item, detectedDiscounts: foundDiscounts }
          : item;
      });

      setItems(updatedItems);
      setApiTotalSavings(totalSavings);
      setUnmatchedItems(unmatched);
      await userService.shoppingList.saveList(updatedItems);

      // Show summary of results
      const matchedCount = matches.length;
      const unmatchedCount = unmatched.length;
      const totalSavingsText = Object.entries(totalSavings)
        .map(
          ([currency, amount]) => `${(amount as number).toFixed(2)} ${currency}`
        )
        .join(", ");

      if (matchedCount > 0) {
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
  };

  const handleSaveChanges = useCallback(
    (updatedItems: ShoppingItemType[]) => {
      if (userService) {
        userService.shoppingList.saveList(updatedItems);
      }
    },
    [userService]
  );

  const handleAddItem = (item: {
    name: string;
    quantity: string;
    category: string;
  }) => {
    const newItem: Omit<ShoppingItemType, "id"> = {
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      completed: false,
      createdAt: new Date(),
    };

    if (userService) {
      userService.shoppingList.addItem(newItem).then(() => {
        userService.shoppingList.loadList().then(setItems);
      });
    }
  };

  const handleUpdateItem = (
    id: string,
    updatedData: Partial<ShoppingItemType>
  ) => {
    if (userService) {
      userService.shoppingList.updateItem(id, updatedData).then(() => {
        userService.shoppingList.loadList().then(setItems);
      });
    }
  };

  const handleToggleItem = (id: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
    handleSaveChanges(updatedItems);
  };

  const handleDeleteItem = (id: string) => {
    if (userService) {
      userService.shoppingList.deleteItem(id).then(() => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
      });
    }
  };

  const clearCompleted = () => {
    const updatedItems = items.filter((item) => !item.completed);
    setItems(updatedItems);
    handleSaveChanges(updatedItems);
  };

  const handleShowDiscounts = (discounts: Discount[]) => {
    setSelectedDiscounts(discounts);
    setDiscountModalVisible(true);
  };

  const calculateTotalSavings = () => {
    let totalSavings = 0;
    let itemsWithDiscounts = 0;

    items.forEach((item) => {
      if (item.detectedDiscounts && item.detectedDiscounts.length > 0) {
        const bestDiscount = item.detectedDiscounts.reduce((best, current) =>
          current.discount_percent > best.discount_percent ? current : best
        );
        const savings =
          bestDiscount.price_before_discount_local *
          (bestDiscount.discount_percent / 100);
        totalSavings += savings;
        itemsWithDiscounts++;
      }
    });

    return { totalSavings, itemsWithDiscounts };
  };

  const { totalSavings, itemsWithDiscounts } = calculateTotalSavings();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ShoppingListHeader
          onFindDiscounts={handleFindDiscounts}
          isFindingDiscounts={isFindingDiscounts}
          onAddItem={openAddModal}
        />

        <SavingsSummary
          totalSavings={totalSavings}
          itemsWithDiscounts={itemsWithDiscounts}
          apiTotalSavings={apiTotalSavings}
        />

        <ShoppingListView
          items={items}
          onToggleItem={handleToggleItem}
          onDeleteItem={handleDeleteItem}
          onShowDiscounts={handleShowDiscounts}
          onClearCompleted={clearCompleted}
          onEditItem={openEditModal}
        />

        <AddItemModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddItem={handleAddItem}
          onUpdateItem={handleUpdateItem}
          itemToEdit={editingItem}
        />

        <DiscountModal
          visible={discountModalVisible}
          onClose={() => setDiscountModalVisible(false)}
          discounts={selectedDiscounts}
        />
      </SafeAreaView>
    </ThemedView>
  );
}
