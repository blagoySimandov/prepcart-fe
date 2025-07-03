import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { useStats } from "react-instantsearch-core";
import { Text } from "react-native";

export function SearchStats() {
  const { nbHits, page } = useStats();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  const currentResults = Math.min((page + 1) * 20, nbHits);

  return (
    <Text
      style={{
        color: themeColors.tabIconDefault,
        fontSize: 12,
        fontWeight: "500",
      }}>
      {currentResults}/{nbHits}
    </Text>
  );
}
