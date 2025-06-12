import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  SafeAreaView,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useStyles } from "./styles";
import { ShoppingItem as ShoppingItemComponent } from "./components/shopping-item";
import {
  useShoppingList,
  type ShoppingItem as ShoppingItemType,
} from "@/app/capabilities/user/shopping-list";

export function ShoppingListScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");

  const { items, addItem, toggleItem, deleteItem, clearCompleted } =
    useShoppingList();
  const { styles, colors } = useStyles();

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      Alert.alert("Error", "Please enter an item name");
      return;
    }
    addItem(newItemName, newItemQuantity || "1", newItemCategory || "Other");
    setNewItemName("");
    setNewItemQuantity("");
    setNewItemCategory("");
    setModalVisible(false);
  };

  const renderShoppingItem = ({ item }: { item: ShoppingItemType }) => (
    <ShoppingItemComponent
      item={item}
      onToggle={toggleItem}
      onDelete={deleteItem}
    />
  );

  const completedItems = items.filter((item) => item.completed);
  const pendingItems = items.filter((item) => !item.completed);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping List</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <IconSymbol name="plus" size={16} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>

            {completedItems.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearCompleted}
              >
                <Text style={styles.clearButtonText}>Clear Completed</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

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
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Item</Text>

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
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleAddItem}
                >
                  <Text style={styles.modalButtonText}>Add Item</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ThemedView>
  );
}
