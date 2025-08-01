import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/ui/Header";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Search } from "@/components/ui/Search";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Fab,
  FilterIcon,
  FilterModal,
  SmallRecipeCard,
  SmallRecipeCards,
} from "./components";
import { ImportProgressModal } from "./components/import-progress";
import { useRecipeActions, useRecipeFilters } from "./hooks";
import { useStyles } from "./styles";

export default function MyRecipesScreen() {
  const {
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    filterModalVisible,
    filteredRecipes,
    openFilterModal,
    closeFilterModal,
    clearFilters,
    getFilterStatusText,
  } = useRecipeFilters();

  const {
    handleRecipePress,
    handleImportRecipe,
    handleDeleteRecipe,
    currentImport,
  } = useRecipeActions();
  const { styles, colors } = useStyles();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header>
          <Header.Title>My Recipes</Header.Title>
          <Header.Subtitle>
            {getFilterStatusText()
              ? `${getFilterStatusText()} • ${filteredRecipes.length} found`
              : "All the recipes you have saved"}
          </Header.Subtitle>
        </Header>

        <Search>
          <Search.SearchBar
            placeholder="Search recipes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            rightIcon={<FilterIcon onPress={openFilterModal} />}
          />
        </Search>

        <SmallRecipeCards>
          {filteredRecipes.map((recipe, index) => (
            <SmallRecipeCard
              key={`${recipe.displayTitle}-${index}`}
              recipe={recipe}
              index={index}
              onPress={() => handleRecipePress(recipe, index)}
              onDelete={() => handleDeleteRecipe(recipe)}
            />
          ))}
          {filteredRecipes.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol
                name="magnifyingglass"
                size={48}
                color={colors.icon}
                style={styles.emptyIcon}
              />
              <ThemedText style={styles.emptyStateText}>
                {searchQuery || selectedFilter !== "all"
                  ? `No recipes found for your search`
                  : "No recipes saved yet"}
              </ThemedText>
              {(searchQuery || selectedFilter !== "all") && (
                <TouchableOpacity
                  style={styles.clearFiltersButton}
                  onPress={clearFilters}
                >
                  <Text
                    style={[styles.clearFiltersText, { color: colors.tint }]}
                  >
                    Clear filters
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </SmallRecipeCards>

        <FilterModal
          visible={filterModalVisible}
          onClose={closeFilterModal}
          selectedFilter={selectedFilter}
          onFilterSelect={setSelectedFilter}
        />

        <Fab onImport={handleImportRecipe} />

        <ImportProgressModal
          visible={!!currentImport}
          thumbnail={currentImport?.thumbnail}
          title="Importing Recipe..."
        />
      </SafeAreaView>
    </ThemedView>
  );
}
