import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";

interface DiscountModalHeaderProps {
  onClose: () => void;
}

export function DiscountModalHeader({ onClose }: DiscountModalHeaderProps) {
  const { styles, colors } = useStyles();

  return (
    <View style={styles.modalHeader}>
      <Text style={styles.modalTitle}>Available Discounts</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <IconSymbol name="xmark" size={20} color={colors.icon} />
      </TouchableOpacity>
    </View>
  );
}
