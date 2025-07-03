import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { TouchableOpacity } from "react-native";

interface CatalogStoreFilterButtonProps {
  onPress: () => void;
}

export function CatalogStoreFilterButton({
  onPress,
}: CatalogStoreFilterButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      style={{
        padding: 8,
        borderRadius: 8,
      }}
      onPress={onPress}>
      <IconSymbol name="gearshape" size={20} color={colors.tabIconDefault} />
    </TouchableOpacity>
  );
}
