import { useUserRecipes } from "@/src/user/recipes";
import { Recipe } from "@/src/user/recipes/types";
import { useState } from "react";

export type FilterOption = "all" | "quick" | "medium" | "long";

export function useRecipeFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("all");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const userSavedRecipes = useUserRecipes();

  const filteredRecipes = userSavedRecipes.filter((recipe) => {
    // Text search filter
    const matchesSearch =
      recipe.displayTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.displayDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    // Cook time filter
    let matchesFilter = true;
    switch (selectedFilter) {
      case "quick":
        matchesFilter = recipe.cookTimeMinutes <= 30;
        break;
      case "medium":
        matchesFilter =
          recipe.cookTimeMinutes > 30 && recipe.cookTimeMinutes <= 60;
        break;
      case "long":
        matchesFilter = recipe.cookTimeMinutes > 60;
        break;
      case "all":
      default:
        matchesFilter = true;
        break;
    }

    return matchesSearch && matchesFilter;
  });

  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFilter("all");
  };

  const getFilterStatusText = () => {
    if (selectedFilter === "all") return "";

    const filterLabels = {
      quick: "Quick recipes",
      medium: "Medium recipes",
      long: "Long recipes",
    };

    return filterLabels[selectedFilter] || "";
  };

  return {
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
  };
}

export function useRecipeActions() {
  const handleRecipePress = (recipe: Recipe, _index: number) => {
    // TODO: Navigate to recipe detail screen
    console.log("Recipe pressed:", recipe.displayTitle);
  };

  return {
    handleRecipePress,
  };
}
