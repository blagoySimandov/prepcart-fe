import { IconSymbol } from "@/components/ui/IconSymbol";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";
import { StoreFilterButton } from "./store-filter-button";

interface ShoppingListHeaderProps {
  onFindDiscounts: () => void;
  isFindingDiscounts: boolean;
  onAddItem: () => void;
  onShowHelp: () => void;
  onOpenStoreFilter: () => void;
}

export function ShoppingListHeader({
  onFindDiscounts,
  isFindingDiscounts,
  onAddItem,
  onShowHelp,
  onOpenStoreFilter,
}: ShoppingListHeaderProps) {
  const { styles, colors } = useStyles();

  return (
    <View style={styles.header}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Shopping List</Text>
        <TouchableOpacity style={styles.helpButton} onPress={onShowHelp}>
          <Ionicons name="help-circle-outline" size={20} color={colors.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerActions}>
        <View style={styles.headerActionsLeft}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={onFindDiscounts}
            disabled={isFindingDiscounts}
          >
            {isFindingDiscounts ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <IconSymbol name="sparkles" size={16} color="#FFFFFF" />
            )}
            <Text style={styles.addButtonText}>
              {isFindingDiscounts ? "Searching..." : "Find Discounts"}
            </Text>
          </TouchableOpacity>

          <StoreFilterButton onPress={onOpenStoreFilter} />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={onAddItem}>
          <IconSymbol name="plus" size={16} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
