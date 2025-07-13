import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductActions } from "../hooks/use-product-actions";
import { useTypesenseSearch } from "../hooks/use-typesense-search";
import { styles } from "../styles";
import { CatalogStoreFilterButton } from "./catalog-store-filter-button";
import { InitialSearchPrompt } from "./initial-search-prompt";
import { NoResultsFound } from "./no-results-found";
import { ProductList } from "./product-list";
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

  const renderContent = () => {
    if (query.length === 0) return <InitialSearchPrompt />;
    if (results.length === 0) return <NoResultsFound query={query} />;

    return (
      <ProductList
        results={results}
        addingItems={addingItems}
        onAddToList={handleAddToList}
        onViewPdf={handleViewPdf}
        onLoadMore={handleLoadMore}
      />
    );
  };

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
      {renderContent()}
    </SafeAreaView>
  );
}
