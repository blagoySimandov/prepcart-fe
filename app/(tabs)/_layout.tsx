import { Tabs, useRouter, usePathname, useGlobalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/src/auth/hooks";
import { useCountryRestriction } from "@/src/hooks/use-country-restriction";
import { RecipesProvider } from "@/src/user/recipes/context";

const SIZE = 28;

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();
  const { isCatalogSearchAvailable, catalogSearchRestrictionMode, isLoading: isCheckingCountry } = useCountryRestriction();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);


  if (loading || isCheckingCountry || !user) {
    return null;
  }

  return (
    <RecipesProvider>
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
            href: (isCatalogSearchAvailable || catalogSearchRestrictionMode === "show_popup") ? "/catalog-search" : null,
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
          listeners={{
            tabPress: (e) => {
              // Only handle the specific case: when on a recipe details page and clicking recipes tab
              if (pathname.match(/^\/my-recipes\/[^\/]+$/)) {
                // We're on a recipe details page, navigate to main recipes page
                e.preventDefault();
                router.push('/my-recipes');
              }
              // For all other cases (home -> recipes, recipes main page, etc.), allow default behavior
            },
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
    </RecipesProvider>
  );
}
