import { ShoppingItem } from "@/src/user/shopping-list/types";
import { ItemParser } from "@/src/utils/item-parser";
import { Alert } from "react-native";

interface UseItemActionsProps {
  onAddItem: (item: { name: string; quantity: string }) => void;
  onUpdateItem: (id: string, item: { name: string; quantity: string }) => void;
  onClose: () => void;
  clearForm: () => void;
  itemToEdit?: ShoppingItem | null;
}

export function useItemActions({
  onAddItem,
  onUpdateItem,
  onClose,
  clearForm,
  itemToEdit,
}: UseItemActionsProps) {
  const isEditMode = itemToEdit != null;

  const handleParseAndAdd = (input: string) => {
    if (!input) {
      Alert.alert("Error", "Please enter an item name");
      return;
    }

    const parsed = ItemParser.parse(input);
    if (parsed) {
      onAddItem({
        name: parsed.name,
        quantity: `${parsed.quantity} ${parsed.unit}`,
      });
    } else {
      onAddItem({
        name: input,
        quantity: "1 pcs",
      });
    }

    // Clear state after adding
    clearForm();
    onClose();
  };

  const handleDetailedAdd = (item: { name: string; quantity: string }) => {
    if (isEditMode && itemToEdit) {
      onUpdateItem(itemToEdit.id, item);
    } else {
      onAddItem(item);
      // Clear state after adding (only for non-edit mode)
      clearForm();
    }
    onClose();
  };

  return {
    handleParseAndAdd,
    handleDetailedAdd,
  };
}
