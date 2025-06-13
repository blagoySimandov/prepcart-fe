import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";

interface ShoppingListHeaderProps {
  onFindDiscounts: () => void;
  isFindingDiscounts: boolean;
  onAddItem: () => void;
}

export function ShoppingListHeader({
  onFindDiscounts,
  isFindingDiscounts,
  onAddItem,
}: ShoppingListHeaderProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Shopping List</Text>
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={onFindDiscounts}
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

        <TouchableOpacity style={styles.addButton} onPress={onAddItem}>
          <IconSymbol name="plus" size={16} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
