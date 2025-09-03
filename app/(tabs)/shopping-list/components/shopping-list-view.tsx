import { Discount } from "@/src/discounts/types";
import { ShoppingItem as ShoppingItemType } from "@/src/user/shopping-list/types";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";
import { SwipeableShoppingItem } from "./swipeable-shopping-item";

interface ShoppingListViewProps {
  items: ShoppingItemType[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onShowDiscounts: (discounts: Discount[]) => void;
  onClearCompleted: () => void;
  onEditItem: (item: ShoppingItemType) => void;
}

export function ShoppingListView({
  items,
  onToggleItem,
  onDeleteItem,
  onShowDiscounts,
  onClearCompleted,
  onEditItem,
}: ShoppingListViewProps) {
  const { styles } = useStyles();

  const renderShoppingItem = ({ item }: { item: ShoppingItemType }) => {
    const discounts = item.detectedDiscounts || [];
    const bestDiscountData =
      discounts.length > 0
        ? discounts.reduce((best, current) =>
            current.discount_percent > best.discount_percent ? current : best,
          )
        : undefined;

    return (
      <SwipeableShoppingItem
        item={item}
        key={item.id}
        onToggle={onToggleItem}
        onDelete={onDeleteItem}
        onShowDiscounts={onShowDiscounts}
        onEdit={onEditItem}
        discounts={discounts}
        bestDiscountData={bestDiscountData}
      />
    );
  };

  const getItemTimestamp = (item: ShoppingItemType): number => {
    if (!item.createdAt) return 0;

    if (typeof item.createdAt === "object" && "seconds" in item.createdAt) {
      return (item.createdAt as any).seconds * 1000;
    }

    return new Date(item.createdAt).getTime();
  };

  const completedItems = items
    .filter((item) => item.completed)
    .sort((a, b) => getItemTimestamp(b) - getItemTimestamp(a)); // newest first

  const pendingItems = items
    .filter((item) => !item.completed)
    .sort((a, b) => getItemTimestamp(b) - getItemTimestamp(a)); // newest first

  if (items.length === 0) {
    return (
      <Text style={styles.emptyState}>
        Your shopping list is empty.{"\n"}Tap &quot;Add Item&quot; to get
        started!
      </Text>
    );
  }

  return (
    <ScrollView
      style={styles.listContainer}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {pendingItems.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>
            To Buy ({pendingItems.length})
          </Text>
          {pendingItems.map((item) => renderShoppingItem({ item }))}
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
              onPress={onClearCompleted}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          {completedItems.map((item) => renderShoppingItem({ item }))}
        </>
      )}
    </ScrollView>
  );
}
