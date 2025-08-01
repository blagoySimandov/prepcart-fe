import { useAlert } from "@/components/providers/alert-provider";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Discount } from "@/src/discounts/types";
import { useStoreNames } from "@/src/shared/hooks/use-store-names";
import { ShoppingItem as ShoppingItemType } from "@/src/user/shopping-list/types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";

interface ShoppingItemProps {
  item: ShoppingItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: ShoppingItemType) => void;
  onShowDiscounts: (discounts: Discount[]) => void;
  discounts: Discount[];
  bestDiscountData?: Discount;
}

export function ShoppingItem({
  item,
  onToggle,
  onDelete,
  onEdit,
  onShowDiscounts,
  discounts,
  bestDiscountData,
}: ShoppingItemProps) {
  const { styles, colors } = useStyles();
  const { showAlert } = useAlert();
  const { getStoreName } = useStoreNames();
  const hasDiscounts = discounts.length > 0;

  const handleDeleteItem = (id: string, name: string) => {
    showAlert("Delete Item", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => onDelete(id) },
    ]);
  };

  return (
    <View
      style={[
        styles.itemCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => onToggle(item.id)}
      >
        <View style={styles.itemLeft}>
          <View
            style={[
              styles.checkbox,
              { borderColor: colors.tint },
              item.completed && { backgroundColor: colors.tint },
            ]}
          >
            {item.completed && (
              <IconSymbol
                name="checkmark"
                size={16}
                color={colors.buttonText}
              />
            )}
          </View>
          <View style={styles.itemInfo}>
            <Text
              style={[
                styles.itemName,
                { color: colors.text },
                item.completed && styles.completedText,
              ]}
            >
              {item.name}
            </Text>
            <Text style={[styles.itemDetails, { color: colors.icon }]}>
              {item.quantity} {item.unit}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {hasDiscounts && bestDiscountData && (
        <TouchableOpacity
          style={styles.storeDiscountBadge}
          onPress={() => onShowDiscounts(discounts)}
        >
          <Text style={styles.storeDiscountStoreName}>
            {getStoreName(bestDiscountData.store_id)}
          </Text>
          <Text style={styles.storeDiscountPercentage}>
            {bestDiscountData.discount_percent}%
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
        <IconSymbol name="pencil" size={20} color={colors.tint} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item.id, item.name)}
      >
        <IconSymbol name="trash" size={20} color={colors.error} />
      </TouchableOpacity>
    </View>
  );
}
