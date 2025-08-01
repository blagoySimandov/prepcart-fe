import { ThemedView } from "@/components/ThemedView";
import { FeatureUnavailableModal } from "@/components/shared/feature-unavailable-modal";
import { StoreFilterModal } from "@/components/shared/store-filter-modal";
import React from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { AddItemModal } from "./components/add-item-modal";
import { DiscountModal } from "./components/discount-modal";
import { HelpModal } from "./components/help-modal";
import { SavingsSummary } from "./components/savings-summary";
import { ShoppingListHeader } from "./components/shopping-list-header";
import { ShoppingListView } from "./components/shopping-list-view";
import { useDiscounts, useShoppingList, useShoppingListModals } from "./hooks";
import { useStoreFilter } from "./hooks/use-store-filter";
import { useStyles } from "./styles";

export default function ShoppingListScreen() {
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

  const {
    selectedStores,
    modalVisible,
    allStores,
    isLoading: isLoadingStores,
    toggleStore,
    selectAllStores,
    clearAllStores,
    openModal,
    closeModal,
  } = useStoreFilter();

  const { findDiscounts, isFindingDiscounts, showUnavailableModal, closeUnavailableModal } = useDiscounts(
    items,
    isLoadingStores ? [] : selectedStores,
  );
  const { itemModal, discountModal, helpModal } = useShoppingListModals();

  const handleAddItem = (item: { name: string; quantity: string }) => {
    addItem(item);
    itemModal.close();
  };

  const handleUpdateItem = (
    id: string,
    updatedData: { name: string; quantity: string },
  ) => {
    const updatedDataWithNumberQuantity = {
      name: updatedData.name,
      quantity: parseInt(updatedData.quantity, 10),
    };
    updateItem(id, updatedDataWithNumberQuantity);
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
          onShowHelp={helpModal.open}
          onOpenStoreFilter={openModal}
        />

        <SavingsSummary items={items} />

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

        <StoreFilterModal
          visible={modalVisible}
          onClose={closeModal}
          selectedStores={selectedStores}
          allStores={allStores}
          onStoreToggle={toggleStore}
          onSelectAll={selectAllStores}
          onClearAll={clearAllStores}
        />

        <HelpModal visible={helpModal.visible} onClose={helpModal.close} />

        <FeatureUnavailableModal
          visible={showUnavailableModal}
          onClose={closeUnavailableModal}
          title="Discounts Unavailable"
          message="The discount search feature is currently only available in Bulgaria. We're working to expand to more countries soon!"
        />
      </SafeAreaView>
    </ThemedView>
  );
}
