import { AddItemModal } from "@/app/(tabs)/shopping-list/components/add-item-modal";
import { useShoppingList } from "@/app/(tabs)/shopping-list/hooks";
import { ThemedView } from "@/components/ThemedView";
import { useRecipesContext } from "@/src/user/recipes/context";
import { Recipe } from "@/src/user/recipes/types";
import { router } from "expo-router";
import React, { useCallback, useState, useMemo, memo } from "react";
import { ScrollView } from "react-native";
import { HomeHeader } from "./components/home-header";
import { QuickActionsGrid } from "./components/quick-actions-grid";
import { RecentRecipesSection } from "./components/recent-recipes-section";
import { UserStatistics } from "./components/user-statistics";
import { useHomeData } from "./hooks";
import { useStyles } from "./styles";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const SHOPPING_LIST_ROUTE = "/(tabs)/shopping-list";

interface HomeRecipeCache {
  recentRecipes: Recipe[];
  timestamp: number;
}

const HomeScreen = memo(function HomeScreen() {
  const { styles } = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { addItem } = useShoppingList();
  const { quickActions } = useHomeData(() => setIsModalVisible(true));
  const { recipes, isLoading } = useRecipesContext();

  // Local cache for home screen specific data
  const [homeCache, setHomeCache] = useState<HomeRecipeCache | null>(null);

  const recentRecipes = useMemo(() => {
    const now = Date.now();
    const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes cache for home screen

    // If we have valid cache, use it
    if (homeCache && now - homeCache.timestamp < CACHE_DURATION && homeCache.recentRecipes.length > 0) {
      return homeCache.recentRecipes;
    }

    // If recipes are still loading and we have valid cache, keep using cache
    if (isLoading && homeCache && homeCache.recentRecipes.length > 0) {
      return homeCache.recentRecipes;
    }

    // Create fresh cache with recent recipes
    const freshRecipes = recipes.slice(0, 5);
    
    // Update cache with fresh data
    const newCache = { recentRecipes: freshRecipes, timestamp: now };
    setHomeCache(newCache);
    
    return freshRecipes;
  }, [recipes, isLoading]);

  const handleAddItem = useCallback(
    (item: { name: string; quantity: string }) => {
      addItem(item);
      setIsModalVisible(false);
      router.push(SHOPPING_LIST_ROUTE);
    },
    [addItem],
  );

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView
        style={{ flex: 1, paddingBottom: useSafeAreaInsets().bottom + 20 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeHeader />
          <QuickActionsGrid actions={quickActions} />
          <RecentRecipesSection
            recipes={recentRecipes}
            isLoading={isLoading && !homeCache}
            onViewAll={() => router.push("/(tabs)/my-recipes")}
          />
          <UserStatistics />
        </ScrollView>
      </SafeAreaView>
      <AddItemModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onAddItem={handleAddItem}
        onUpdateItem={() => {}}
      />
    </ThemedView>
  );
});

export default HomeScreen;
