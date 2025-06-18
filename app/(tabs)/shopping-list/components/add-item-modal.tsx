import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Alert,
  LayoutAnimation,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { useStyles } from "../styles";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ParsedItem {
  product: string;
  quantity: number;
  unit: string;
}

function parseLine(input: string): ParsedItem | null {
  const patterns = [
    // 1. Quantity + unit + product
    /^(?<quantity>\d+)\s*(?<unit>kg|g|l|ml|pcs|bottles?)?\s+(?<product>.+)$/i,
    // 2. Product + quantity + unit
    /^(?<product>.+?)\s+(?<quantity>\d+)\s*(?<unit>kg|g|l|ml|pcs|bottles?)$/i,
    // 3. Quantity with 'x' (e.g., 3x apples)
    /^(?<quantity>\d+)[xX×]\s*(?<product>.+)$/i,
    // 4. Product only
    /^(?<product>.+)$/i,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match?.groups) {
      return {
        product: match.groups.product.trim(),
        quantity: parseInt(match.groups.quantity || "1", 10),
        unit: match.groups.unit?.toLowerCase() || "pcs",
      };
    }
  }

  return null;
}

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
  const [text, setText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualQuantity, setManualQuantity] = useState("");
  const [manualCategory, setManualCategory] = useState("");
  const inputRef = useRef<TextInput>(null);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!isExpanded) {
      const parsed = parseLine(text.trim());
      if (parsed) {
        setManualName(parsed.product);
        setManualQuantity(`${parsed.quantity} ${parsed.unit}`);
        setManualCategory(""); // Category is not parsed
      } else {
        setManualName(text.trim());
        setManualQuantity("1 pcs");
        setManualCategory("");
      }
    } else {
      const newText = `${manualName.trim()} ${manualQuantity.trim()}`.trim();
      setText(newText);
    }
    setIsExpanded(!isExpanded);
  };

  const handleAddItem = () => {
    if (isExpanded) {
      if (!manualName.trim()) {
        Alert.alert("Error", "Please enter an item name");
        return;
      }
      onAddItem({
        name: manualName.trim(),
        quantity: manualQuantity.trim() || "1",
        category: manualCategory.trim() || "Other",
      });
      setManualName("");
      setManualQuantity("");
      setManualCategory("");
    } else {
      const textToParse = text.trim();
      if (!textToParse) {
        Alert.alert("Error", "Please enter an item name");
        return;
      }
      const parsed = parseLine(textToParse);
      if (parsed) {
        onAddItem({
          name: parsed.product,
          quantity: `${parsed.quantity} ${parsed.unit}`,
          category: "Other",
        });
      } else {
        onAddItem({
          name: textToParse,
          quantity: "1 pcs",
          category: "Other",
        });
      }
    }
    setText("");
    setIsExpanded(false);
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
          <View style={styles.addItemHeader}>
            <Text style={styles.addItemModalTitle}>Add New Item</Text>
            <TouchableOpacity
              onPress={toggleExpand}
              style={styles.expandButton}>
              <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color={colors.icon}
              />
            </TouchableOpacity>
          </View>

          {!isExpanded ? (
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Item name (e.g., Wine 2 bottles)"
              placeholderTextColor={colors.icon}
              value={text}
              onChangeText={setText}
              autoFocus={true}
            />
          ) : (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Item name *"
                placeholderTextColor={colors.icon}
                value={manualName}
                onChangeText={setManualName}
                autoFocus={true}
              />
              <TextInput
                style={styles.input}
                placeholder="Quantity (e.g., 2 lbs, 1 bottle)"
                placeholderTextColor={colors.icon}
                value={manualQuantity}
                onChangeText={setManualQuantity}
              />
              <TextInput
                style={styles.input}
                placeholder="Category (e.g., Produce, Dairy)"
                placeholderTextColor={colors.icon}
                value={manualCategory}
                onChangeText={setManualCategory}
              />
            </View>
          )}

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleAddItem}>
              <Text style={styles.modalButtonText}>
                {isExpanded ? "Add Item" : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
