import { AddItemModal } from "@/app/(tabs)/shopping-list/components/add-item-modal";
import { useShoppingList } from "@/app/(tabs)/shopping-list/hooks";
import { HomeHeader } from "@/app/components/home/HomeHeader";
import { MealPlannerBanner } from "@/app/components/home/MealPlannerBanner";
import { QuickActionsGrid } from "@/app/components/home/QuickActionsGrid";
import { UserStatistics } from "@/app/components/home/UserStatistics";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { SymbolViewProps } from "expo-symbols";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { useStyles } from "./styles";

interface QuickAction {
  title: string;
  description: string;
  icon: SymbolViewProps["name"];
  route?: string;
  onPress?: () => void;
  color: string;
}

const useHomeData = (onQuickAdd: () => void) => {
  const quickActions: QuickAction[] = [
    {
      title: "Quick Add",
      description: "Add an item to your list",
      icon: "plus.circle.fill",
      onPress: onQuickAdd,
      color: "#4682B4",
    },
    {
      title: "Shopping List",
      description: "Manage your groceries",
      icon: "cart.fill",
      route: "/(tabs)/shopping-list",
      color: "#8FBC8F",
    },
    {
      title: "Catalog Search",
      description: "Find products & discounts",
      icon: "magnifyingglass.circle.fill",
      route: "/(tabs)/catalog-search",
      color: "#FF6B6B",
    },
    {
      title: "My Profile",
      description: "Settings & preferences",
      icon: "person.fill",
      route: "/(tabs)/profile",
      color: "#DEB887",
    },
  ];

  return { quickActions };
};
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
