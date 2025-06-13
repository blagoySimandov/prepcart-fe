import { Discount } from "@/src/discounts/types";
import { ShoppingItem as ShoppingItemType } from "@/src/user/shopping-list/types";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";
import { ShoppingItem as ShoppingItemComponent } from "./shopping-item";

interface ShoppingListViewProps {
  items: ShoppingItemType[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onShowDiscounts: (discounts: Discount[]) => void;
  onClearCompleted: () => void;
}

export function ShoppingListView({
  items,
  onToggleItem,
  onDeleteItem,
  onShowDiscounts,
  onClearCompleted,
}: ShoppingListViewProps) {
  const { styles } = useStyles();

  const renderShoppingItem = ({ item }: { item: ShoppingItemType }) => {
    const discounts = item.detectedDiscounts || [];
    const bestDiscount =
      discounts.length > 0
        ? Math.max(...discounts.map((d) => d.discount_percent))
        : undefined;

    return (
      <ShoppingItemComponent
        item={item}
        onToggle={onToggleItem}
        onDelete={onDeleteItem}
        onShowDiscounts={onShowDiscounts}
        discounts={discounts}
        bestDiscount={bestDiscount}
      />
    );
  };

  const completedItems = items.filter((item) => item.completed);
  const pendingItems = items.filter((item) => !item.completed);

  if (items.length === 0) {
    return (
      <Text style={styles.emptyState}>
        Your shopping list is empty.{"\n"}Tap &quot;Add Item&quot; to get
        started!
      </Text>
    );
  }

  return (
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Completed ({completedItems.length})
            </Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={onClearCompleted}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={completedItems}
            renderItem={renderShoppingItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}
