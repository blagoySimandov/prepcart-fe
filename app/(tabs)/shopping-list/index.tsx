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
  const [discountModalVisible, setDiscountModalVisible] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>([]);
  const [items, setItems] = useState<ShoppingItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFindingDiscounts, setIsFindingDiscounts] = useState(false);

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

  const handleFindDiscounts = async () => {
    if (!userService) return;

    setIsFindingDiscounts(true);
    try {
      await userService.discounts.loadAllDiscounts();
      const discountsMap = userService.discounts.findDiscountsForItems(items);

      const updatedItems = items.map((item) => {
        const foundDiscounts = discountsMap.get(item.id);
        return foundDiscounts
          ? { ...item, detectedDiscounts: foundDiscounts }
          : item;
      });

      setItems(updatedItems);
      await userService.shoppingList.saveList(updatedItems);
    } catch {
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
          onAddItem={() => setModalVisible(true)}
        />

        <SavingsSummary
          totalSavings={totalSavings}
          itemsWithDiscounts={itemsWithDiscounts}
        />

        <ShoppingListView
          items={items}
          onToggleItem={handleToggleItem}
          onDeleteItem={handleDeleteItem}
          onShowDiscounts={handleShowDiscounts}
          onClearCompleted={clearCompleted}
        />

        <AddItemModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddItem={handleAddItem}
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
