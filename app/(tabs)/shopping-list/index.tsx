import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { AddItemModal } from "./components/add-item-modal";
import { DiscountModal } from "./components/discount-modal";
import { SavingsSummary } from "./components/savings-summary";
import { ShoppingListHeader } from "./components/shopping-list-header";
import { ShoppingListView } from "./components/shopping-list-view";
import { useDiscounts, useShoppingList, useShoppingListModals } from "./hooks";
import { useStyles } from "./styles";

export function ShoppingListScreen() {
  const { styles } = useStyles();
  const {
    items,
    isLoading,
    addItem,
    updateItem,
    toggleItem,
    deleteItem,
    clearCompleted,
  } = useShoppingList();
  const { findDiscounts, isFindingDiscounts, apiTotalSavings } =
    useDiscounts(items);
  const { itemModal, discountModal } = useShoppingListModals();

  const handleAddItem = (item: { name: string; quantity: string }) => {
    addItem(item);
    itemModal.close();
  };

  const handleUpdateItem = (
    id: string,
    updatedData: { name: string; quantity: string }
  ) => {
    updateItem(id, updatedData);
    itemModal.close();
  };

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
          onFindDiscounts={findDiscounts}
          isFindingDiscounts={isFindingDiscounts}
          onAddItem={itemModal.openAdd}
        />

        <SavingsSummary items={items} apiTotalSavings={apiTotalSavings} />

        <ShoppingListView
          items={items}
          onToggleItem={toggleItem}
          onDeleteItem={deleteItem}
          onShowDiscounts={discountModal.open}
          onClearCompleted={clearCompleted}
          onEditItem={itemModal.openEdit}
        />

        <AddItemModal
          visible={itemModal.visible}
          onClose={itemModal.close}
          onAddItem={handleAddItem}
          onUpdateItem={handleUpdateItem}
          itemToEdit={itemModal.editingItem}
        />

        <DiscountModal
          visible={discountModal.visible}
          onClose={discountModal.close}
          discounts={discountModal.discounts}
        />
      </SafeAreaView>
    </ThemedView>
  );
}
