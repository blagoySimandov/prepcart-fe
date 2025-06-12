import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

interface RecentActivity {
  id: string;
  type: "recipe" | "shopping";
  title: string;
  subtitle: string;
  timestamp: Date;
}

const useHomeData = () => {
  // Mock data - TODO: Replace with actual data from backend
  const quickActions: QuickAction[] = [
    {
      title: "Import Recipe",
      description: "Add from URL or text",
      icon: "book.fill",
      route: "/(tabs)/recipe-importer",
      color: "#FF8C42",
    },
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

  const recentActivity: RecentActivity[] = [
    {
      id: "1",
      type: "recipe",
      title: "Imported Chicken Tikka Masala",
      subtitle: "From foodnetwork.com",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: "2",
      type: "shopping",
      title: "Added Tomatoes to shopping list",
      subtitle: "3 lbs • Produce",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      id: "3",
      type: "recipe",
      title: "Imported Pasta Carbonara",
      subtitle: "From copied text",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
  ];

  const stats = {
    recipesImported: 12,
    shoppingItems: 8,
    weeklyGoal: 3,
    completedThisWeek: 1,
  };

  return { quickActions, recentActivity, stats };
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { quickActions, recentActivity, stats } = useHomeData();

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 60,
    },
    greeting: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 16,
      color: colors.icon,
    },
    quickActionsContainer: {
      paddingHorizontal: 20,
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 15,
    },
    quickActionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    quickActionCard: {
      width: (width - 60) / 2,
      backgroundColor: colors.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },
    quickActionIcon: {
      marginBottom: 12,
    },
    quickActionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 5,
    },
    quickActionDescription: {
      fontSize: 14,
      color: colors.icon,
    },
    statsContainer: {
      paddingHorizontal: 20,
      marginBottom: 30,
    },
    statsGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 15,
      marginHorizontal: 5,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.tint,
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 12,
      color: colors.icon,
      textAlign: "center",
    },
    recentContainer: {
      paddingHorizontal: 20,
      flex: 1,
    },
    activityItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activityIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.tint + "20",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 15,
    },
    activityContent: {
      flex: 1,
    },
    activityTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
      marginBottom: 3,
    },
    activitySubtitle: {
      fontSize: 14,
      color: colors.icon,
    },
    activityTime: {
      fontSize: 12,
      color: colors.icon,
    },
    emptyState: {
      textAlign: "center",
      color: colors.icon,
      fontStyle: "italic",
      marginTop: 20,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good day!</Text>
          <Text style={styles.subtitle}>
            What would you like to cook today?
          </Text>
        </View>

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={() => router.push(action.route as any)}
              >
                <View style={styles.quickActionIcon}>
                  <IconSymbol
                    name={action.icon as any}
                    size={32}
                    color={action.color}
                  />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionDescription}>
                  {action.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.recipesImported}</Text>
              <Text style={styles.statLabel}>Recipes Imported</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.shoppingItems}</Text>
              <Text style={styles.statLabel}>Shopping Items</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {stats.completedThisWeek}/{stats.weeklyGoal}
              </Text>
              <Text style={styles.statLabel}>Weekly Goal</Text>
            </View>
          </View>
        </View>

        <View style={styles.recentContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.length === 0 ? (
            <Text style={styles.emptyState}>No recent activity</Text>
          ) : (
            recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <IconSymbol
                    name={
                      activity.type === "recipe" ? "book.fill" : "cart.fill"
                    }
                    size={20}
                    color={colors.tint}
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activitySubtitle}>
                    {activity.subtitle}
                  </Text>
                </View>
                <Text style={styles.activityTime}>
                  {formatTimeAgo(activity.timestamp)}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
