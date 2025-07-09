import React, { forwardRef, useImperativeHandle } from "react";
import { Alert, TextInput, View } from "react-native";
import { useStyles } from "../styles";

interface DetailedInputViewProps {
  name: string;
  quantity: string;
  unit: string;
  onNameChange: (name: string) => void;
  onQuantityChange: (quantity: string) => void;
  onUnitChange: (unit: string) => void;
  onAddItem: (item: { name: string; quantity: string }) => void;
}

export interface DetailedInputViewRef {
  handleSubmit: () => void;
}

export const DetailedInputView = forwardRef<
  DetailedInputViewRef,
  DetailedInputViewProps
>(
  (
    {
      name,
      quantity,
      unit,
      onNameChange,
      onQuantityChange,
      onUnitChange,
      onAddItem,
    },
    ref,
  ) => {
    const { styles, colors } = useStyles();

    const handleSubmit = () => {
      if (!name.trim()) {
        Alert.alert("Error", "Please enter an item name");
        return;
      }

      const finalQuantity =
        quantity && unit ? `${quantity} ${unit}` : quantity || "1";

      onAddItem({
        name: name.trim(),
        quantity: finalQuantity.trim(),
      });
    };

    useImperativeHandle(ref, () => ({
      handleSubmit,
    }));

    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Item name *"
          placeholderTextColor={colors.icon}
          value={name}
          onChangeText={onNameChange}
          autoFocus={true}
          onSubmitEditing={handleSubmit}
        />
        <View style={styles.quantityRow}>
          <TextInput
            style={[styles.input, styles.quantityInput]}
            placeholder="Quantity"
            placeholderTextColor={colors.icon}
            value={quantity}
            onChangeText={onQuantityChange}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.unitInput]}
            placeholder="Unit"
            placeholderTextColor={colors.icon}
            value={unit}
            onChangeText={onUnitChange}
          />
        </View>
      </View>
    );
  },
);

DetailedInputView.displayName = "DetailedInputView";
