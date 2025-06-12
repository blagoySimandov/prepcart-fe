import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useStyles } from "../styles";
import { ShoppingItem as ShoppingItemType } from "@/app/capabilities/user/shopping-list/types";

interface ShoppingItemProps {
  item: ShoppingItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ShoppingItem({ item, onToggle, onDelete }: ShoppingItemProps) {
  const { styles, colors } = useStyles();

  const handleDeleteItem = (id: string, name: string) => {
    Alert.alert("Delete Item", `Are you sure you want to delete "${name}"?`, [
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
              <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
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
              {item.quantity} • {item.category}
            </Text>
          </View>
        </View>
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
