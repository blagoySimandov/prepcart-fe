import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";

interface ModalHeaderProps {
  isEditMode: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function ModalHeader({
  isEditMode,
  isExpanded,
  onToggleExpand,
}: ModalHeaderProps) {
  const { styles, colors } = useStyles();

  return (
    <View style={styles.addItemHeader}>
      <Text style={styles.addItemModalTitle}>
        {isEditMode ? "Edit Item" : "Add New Item"}
      </Text>
      <TouchableOpacity
        onPress={onToggleExpand}
        style={styles.expandButton}
        disabled={isEditMode}>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={isEditMode ? colors.disabled : colors.icon}
        />
      </TouchableOpacity>
    </View>
  );
}
