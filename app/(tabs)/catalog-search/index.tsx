import React from "react";
import { Configure, InstantSearch } from "react-instantsearch-core";
import { FlatList, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InitialSearchPrompt } from "@/app/(tabs)/catalog-search/components/initial-search-prompt";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  ALGOLIA_INDEX_NAME,
  searchClient,
} from "@/src/catalog-search/algolia-config";
import { NoResultsFound } from "./components/no-results-found";
import { ProductCard } from "./components/product-card";
import { useAlgoliaSearch } from "./hooks/use-algolia-search";
import { useProductActions } from "./hooks/use-product-actions";
import { styles } from "./styles";

function CatalogSearchContent() {
  const { query, results, handleInputChange, handleLoadMore, isLastPage } =
    useAlgoliaSearch();
  const { addingItems, handleAddToList, handleViewPdf } = useProductActions();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

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

export default function CatalogSearchScreen() {
  return (
    <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
      <Configure
        highlightPreTag="<mark>"
        highlightPostTag="</mark>"
        hitsPerPage={20}
      />
      <CatalogSearchContent />
    </InstantSearch>
  );
}
