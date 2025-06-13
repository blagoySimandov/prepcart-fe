import React, { useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStyles } from "../styles";

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  onAddItem: (item: {
    name: string;
    quantity: string;
    category: string;
  }) => void;
}

export function AddItemModal({
  visible,
  onClose,
  onAddItem,
}: AddItemModalProps) {
  const { styles, colors } = useStyles();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const handleAddItem = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter an item name");
      return;
    }
    onAddItem({
      name: name.trim(),
      quantity: quantity.trim() || "1",
      category: category.trim() || "Other",
    });
    // Clear fields and close modal
    setName("");
    setQuantity("");
    setCategory("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modal}>
        <View style={styles.addItemModalContent}>
          <Text style={styles.addItemModalTitle}>Add New Item</Text>

          <TextInput
            style={styles.input}
            placeholder="Item name *"
            placeholderTextColor={colors.icon}
            value={name}
            onChangeText={setName}
            autoFocus={true}
          />

          <TextInput
            style={styles.input}
            placeholder="Quantity (e.g., 2 lbs, 1 bottle)"
            placeholderTextColor={colors.icon}
            value={quantity}
            onChangeText={setQuantity}
          />

          <TextInput
            style={styles.input}
            placeholder="Category (e.g., Produce, Dairy)"
            placeholderTextColor={colors.icon}
            value={category}
            onChangeText={setCategory}
          />

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}>
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
  );
}
