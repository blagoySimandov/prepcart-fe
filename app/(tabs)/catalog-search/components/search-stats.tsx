import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { useStats } from "react-instantsearch-core";
import { Text, View } from "react-native";

export function SearchStats() {
  const { nbHits, nbPages, page, processingTimeMS } = useStats();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  const currentResults = Math.min((page + 1) * 20, nbHits);

  return (
    <View style={{ padding: 16, alignItems: "center" }}>
      <Text style={{ color: themeColors.tabIconDefault, fontSize: 14 }}>
        {nbHits > 0
          ? `Showing ${currentResults} of ${nbHits} results (${processingTimeMS}ms)`
          : "No results found"}
      </Text>
    </View>
  );
}
