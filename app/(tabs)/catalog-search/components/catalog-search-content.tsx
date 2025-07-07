import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductActions } from "../hooks/use-product-actions";
import { useTypesenseSearch } from "../hooks/use-typesense-search";
import { styles } from "../styles";
import { CatalogStoreFilterButton } from "./catalog-store-filter-button";
import { InitialSearchPrompt } from "./initial-search-prompt";
import { NoResultsFound } from "./no-results-found";
import { ProductCard } from "./product-card";
import { SearchStats } from "./search-stats";

interface CatalogSearchContentProps {
  onOpenStoreFilter: () => void;
}

export function CatalogSearchContent({
  onOpenStoreFilter,
}: CatalogSearchContentProps) {
  const { query, results, handleInputChange, handleLoadMore } =
    useTypesenseSearch();
  const { addingItems, handleAddToList, handleViewPdf } = useProductActions();

  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  console.log("[CatalogSearchContent] Component render:", {
    query,
    resultsCount: results.length,
    queryLength: query.length,
    colorScheme,
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
        <Text style={[styles.title, { color: themeColors.text, flex: 1 }]}>
          Catalog Search
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <CatalogStoreFilterButton onPress={onOpenStoreFilter} />
          {query.length > 0 && results.length > 0 && <SearchStats />}
        </View>
      </View>
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
      {(() => {
        console.log("[CatalogSearchContent] Rendering content based on:", {
          queryLength: query.length,
          resultsLength: results.length,
        });

        if (query.length === 0) {
          console.log("[CatalogSearchContent] Showing initial search prompt");
          return <InitialSearchPrompt />;
        } else if (results.length === 0) {
          console.log("[CatalogSearchContent] Showing no results found");
          return <NoResultsFound query={query} />;
        } else {
          console.log(
            "[CatalogSearchContent] Showing results list with",
            results.length,
            "items"
          );
          return (
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                console.log(
                  "[CatalogSearchContent] Rendering item:",
                  item.id,
                  item.productName
                );
                return (
                  <ProductCard
                    item={item}
                    isAdding={addingItems.has(item.id)}
                    onAddToList={handleAddToList}
                    onViewPdf={handleViewPdf}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.1}
            />
          );
        }
      })()}
    </SafeAreaView>
  );
}
