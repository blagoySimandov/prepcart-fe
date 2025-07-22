import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useStyles } from "./styles";
import { FilterIconProps } from "./types";

export function FilterIcon({ onPress }: FilterIconProps) {
  const { styles, colors } = useStyles();

  return (
    <TouchableOpacity style={styles.filterIconContainer} onPress={onPress}>
      <MaterialIcons
        name="filter-list"
        size={18}
        color={colors.tabIconDefault}
      />
    </TouchableOpacity>
  );
}
