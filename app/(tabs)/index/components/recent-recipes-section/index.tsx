import { SmallRecipeCard } from "@/app/(tabs)/my-recipes/components/small-recipe-card";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  EMPTY_STATE_SUBTITLE,
  EMPTY_STATE_TEXT,
  SECTION_TITLE,
  VIEW_ALL_TEXT,
} from "./constants";
import { useRecentRecipes } from "./hooks";
import { useStyles } from "./styles";
import { RecentRecipesSectionProps } from "./types";

export function RecentRecipesSection({ onViewAll }: RecentRecipesSectionProps) {
  const { styles, colors } = useStyles();
  const {
    recentRecipes,
    isLoading,
    hasRecipes,
    handleViewAll,
    handleRecipePress,
  } = useRecentRecipes();

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{SECTION_TITLE}</Text>
        {hasRecipes && (
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={onViewAll || handleViewAll}
          >
            <Text style={styles.viewAllText}>{VIEW_ALL_TEXT}</Text>
          </TouchableOpacity>
        )}
      </View>

      {hasRecipes ? (
        <View style={styles.recipesContainer}>
          {recentRecipes.map((recipe, index) => (
            <SmallRecipeCard
              key={`${recipe.id}-${index}`}
              recipe={recipe}
              index={index}
              onPress={() => handleRecipePress(recipe.id)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <IconSymbol
            name="book.fill"
            size={48}
            color={colors.icon}
            style={styles.emptyStateIcon}
          />
          <ThemedText style={styles.emptyStateText}>
            {EMPTY_STATE_TEXT}
          </ThemedText>
          <ThemedText style={styles.emptyStateSubtitle}>
            {EMPTY_STATE_SUBTITLE}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

