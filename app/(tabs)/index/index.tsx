import { AddItemModal } from "@/app/(tabs)/shopping-list/components/add-item-modal";
import { useShoppingList } from "@/app/(tabs)/shopping-list/hooks";
import { ThemedView } from "@/components/ThemedView";
import { RecipesProvider } from "@/src/user/recipes/context";
import { router } from "expo-router";
import { useCallback, useState } from "react";
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

export default function HomeScreen() {
  const { styles } = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { addItem } = useShoppingList();
  const { quickActions } = useHomeData(() => setIsModalVisible(true));

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
    <RecipesProvider>
      <ThemedView style={styles.container}>
        <SafeAreaView
          style={{ flex: 1, paddingBottom: useSafeAreaInsets().bottom + 20 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <HomeHeader />
            <QuickActionsGrid actions={quickActions} />
            <RecentRecipesSection
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
    </RecipesProvider>
  );
}
