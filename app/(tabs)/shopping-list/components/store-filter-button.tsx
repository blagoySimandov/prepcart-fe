import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useStyles } from "../styles";

interface StoreFilterButtonProps {
  onPress: () => void;
}

export function StoreFilterButton({ onPress }: StoreFilterButtonProps) {
  const { styles, colors } = useStyles();

  return (
    <TouchableOpacity style={styles.storeFilterIconButton} onPress={onPress}>
      <IconSymbol name="gearshape" size={20} color={colors.icon} />
    </TouchableOpacity>
  );
}
