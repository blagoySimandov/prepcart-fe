import { HomeHeader } from "@/app/components/home/HomeHeader";
import { QuickActionsGrid } from "@/app/components/home/QuickActionsGrid";
import { UserStatistics } from "@/app/components/home/UserStatistics";
import { ThemedView } from "@/components/ThemedView";
import { SymbolViewProps } from "expo-symbols";
import { ScrollView } from "react-native";
import { useStyles } from "./styles";

interface QuickAction {
  title: string;
  description: string;
  icon: SymbolViewProps["name"];
  route: string;
  color: string;
}

const useHomeData = () => {
  const quickActions: QuickAction[] = [
    // {
    //   title: "Import Recipe",
    //   description: "Add from URL or text",
    //   icon: "book.fill",
    //   route: "/(tabs)/recipe-importer",
    //   color: "#FF8C42",
    // }, //STILL IN DEVELOPMENT
    {
      title: "Shopping List",
      description: "Manage your groceries",
      icon: "cart.fill",
      route: "/(tabs)/shopping-list",
      color: "#8FBC8F",
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

export default function HomeScreen() {
  const { styles } = useStyles();
  const { quickActions } = useHomeData();

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <QuickActionsGrid actions={quickActions} />
        <UserStatistics />
      </ScrollView>
    </ThemedView>
  );
}
