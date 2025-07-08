import { AddItemModal } from "@/app/(tabs)/shopping-list/components/add-item-modal";
import { useShoppingList } from "@/app/(tabs)/shopping-list/hooks";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { HomeHeader } from "./components/home-header";
import { MealPlannerBanner } from "./components/meal-planner-banner";
import { QuickActionsGrid } from "./components/quick-actions-grid";
import { UserStatistics } from "./components/user-statistics";
import { useHomeData } from "./hooks";
import { useStyles } from "./styles";

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
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <MealPlannerBanner />
        <QuickActionsGrid actions={quickActions} />
        <UserStatistics />
      </ScrollView>
      <AddItemModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onAddItem={handleAddItem}
        onUpdateItem={() => {}}
      />
    </ThemedView>
  );
}
