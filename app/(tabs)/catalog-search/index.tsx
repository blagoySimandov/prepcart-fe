import { debounce } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CatalogService } from "@/src/catalog-search";
import { ProductCandidate } from "@/src/catalog-search/types";
import { styles } from "./styles";

export default function CatalogSearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.length > 2) {
      setLoading(true);
      try {
        const searchResults = await CatalogService.search(searchQuery);
        console.log("Search results:", searchResults);
        setResults(searchResults);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  }, []);

  const debouncedSearch = useMemo(() => debounce(search, 500), [search]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>
        Catalog Search
      </Text>
      <TextInput
        style={[
          styles.input,
          { color: themeColors.text, borderColor: themeColors.tint },
        ]}
        placeholder="Search for products..."
        placeholderTextColor={themeColors.tabIconDefault}
        value={query}
        onChangeText={handleInputChange}
      />
      {loading ? (
        <ActivityIndicator size="large" color={themeColors.tint} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={[styles.itemName, { color: themeColors.text }]}>
                {item.productName}
              </Text>
              <Text style={{ color: themeColors.text, fontSize: 14 }}>
                Price: {item.priceBeforeDiscount.toFixed(2)} BGN
              </Text>
              <Text style={{ color: themeColors.tint, fontSize: 12 }}>
                {item.discountPercent}% off • {item.storeId}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
