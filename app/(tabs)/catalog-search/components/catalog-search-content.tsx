import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAlgoliaSearch } from "../hooks/use-algolia-search";
import { useProductActions } from "../hooks/use-product-actions";
import { styles } from "../styles";
import { InitialSearchPrompt } from "./initial-search-prompt";
import { NoResultsFound } from "./no-results-found";
import { ProductCard } from "./product-card";
import { SearchStats } from "./search-stats";

export function CatalogSearchContent() {
  const { query, results, handleInputChange, handleLoadMore } =
    useAlgoliaSearch();
  const { addingItems, handleAddToList, handleViewPdf } = useProductActions();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

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
        {query.length > 0 && results.length > 0 && <SearchStats />}
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
      {query.length === 0 ? (
        <InitialSearchPrompt />
      ) : results.length === 0 ? (
        <NoResultsFound query={query} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              isAdding={addingItems.has(item.id)}
              onAddToList={handleAddToList}
              onViewPdf={handleViewPdf}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      )}
    </SafeAreaView>
  );
}
