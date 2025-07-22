import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/src/auth/hooks";

const SIZE = 28;

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={SIZE} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="catalog-search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={SIZE} name="magnifyingglass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-recipes"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={SIZE} name="book.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping-list"
        options={{
          title: "Shopping",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={SIZE} name="cart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={SIZE} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
