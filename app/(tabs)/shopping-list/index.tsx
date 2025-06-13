import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Discount } from "@/src/discounts/types";
import { useUserService } from "@/src/user";
import { ShoppingItem as ShoppingItemType } from "@/src/user/shopping-list/types";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DiscountModal } from "./components/discount-modal";
import { SavingsSummary } from "./components/savings-summary";
import { ShoppingItem as ShoppingItemComponent } from "./components/shopping-item";
import { useStyles } from "./styles";

export function ShoppingListScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [discountModalVisible, setDiscountModalVisible] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [items, setItems] = useState<ShoppingItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFindingDiscounts, setIsFindingDiscounts] = useState(false);

  const userService = useUserService();
  const { styles, colors } = useStyles();

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

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      Alert.alert("Error", "Please enter an item name");
      return;
    }
    const newItem: Omit<ShoppingItemType, "id"> = {
      name: newItemName.trim(),
      quantity: newItemQuantity.trim() || "1",
      category: newItemCategory.trim() || "Other",
      completed: false,
      createdAt: new Date(),
    };

    if (userService) {
      // For a more responsive UI, we can update the state optimistically
      // The `addItem` service method would need to be adjusted to return the created item
      // For now, we'll just save and reload.
      userService.shoppingList.addItem(newItem).then(() => {
        // Reload the list to get the new item with its ID
        userService.shoppingList.loadList().then(setItems);
      });
    }

    setNewItemName("");
    setNewItemQuantity("");
    setNewItemCategory("");
    setModalVisible(false);
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

  const renderShoppingItem = ({ item }: { item: ShoppingItemType }) => {
    const discounts = item.detectedDiscounts || [];
    const bestDiscount =
      discounts.length > 0
        ? Math.max(...discounts.map((d) => d.discount_percent))
        : undefined;

    return (
      <ShoppingItemComponent
        item={item}
        onToggle={handleToggleItem}
        onDelete={handleDeleteItem}
        onShowDiscounts={handleShowDiscounts}
        discounts={discounts}
        bestDiscount={bestDiscount}
      />
    );
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

  const completedItems = items.filter((item) => item.completed);
  const pendingItems = items.filter((item) => !item.completed);

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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping List</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleFindDiscounts}
              disabled={isFindingDiscounts}>
              {isFindingDiscounts ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <IconSymbol name="sparkles" size={16} color="#FFFFFF" />
              )}
              <Text style={styles.addButtonText}>
                {isFindingDiscounts ? "Searching..." : "Find Discounts"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}>
              <IconSymbol name="plus" size={16} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>

            {completedItems.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearCompleted}>
                <Text style={styles.clearButtonText}>Clear Completed</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <SavingsSummary
          totalSavings={totalSavings}
          itemsWithDiscounts={itemsWithDiscounts}
        />

        <View style={styles.listContainer}>
          {pendingItems.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>
                To Buy ({pendingItems.length})
              </Text>
              <FlatList
                data={pendingItems}
                renderItem={renderShoppingItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}

          {completedItems.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>
                Completed ({completedItems.length})
              </Text>
              <FlatList
                data={completedItems}
                renderItem={renderShoppingItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}

          {items.length === 0 && (
            <Text style={styles.emptyState}>
              Your shopping list is empty.{"\n"}Tap &quot;Add Item&quot; to get
              started!
            </Text>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modal}>
            <View style={styles.addItemModalContent}>
              <Text style={styles.addItemModalTitle}>Add New Item</Text>

              <TextInput
                style={styles.input}
                placeholder="Item name *"
                placeholderTextColor={colors.icon}
                value={newItemName}
                onChangeText={setNewItemName}
                autoFocus={true}
              />

              <TextInput
                style={styles.input}
                placeholder="Quantity (e.g., 2 lbs, 1 bottle)"
                placeholderTextColor={colors.icon}
                value={newItemQuantity}
                onChangeText={setNewItemQuantity}
              />

              <TextInput
                style={styles.input}
                placeholder="Category (e.g., Produce, Dairy)"
                placeholderTextColor={colors.icon}
                value={newItemCategory}
                onChangeText={setNewItemCategory}
              />

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleAddItem}>
                  <Text style={styles.modalButtonText}>Add Item</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <DiscountModal
          visible={discountModalVisible}
          onClose={() => setDiscountModalVisible(false)}
          discounts={selectedDiscounts}
        />
      </SafeAreaView>
    </ThemedView>
  );
}
