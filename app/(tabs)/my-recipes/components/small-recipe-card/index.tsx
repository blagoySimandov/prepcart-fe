import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "./styles";
import { SmallRecipeCardProps } from "./types";

export function SmallRecipeCard({
  recipe,
  index: _index,
  onPress,
}: SmallRecipeCardProps) {
  const { styles, colors } = useStyles();

  return (
    <TouchableOpacity
      style={[
        styles.recipeCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.text,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      {/* Recipe thumbnail */}
      {recipe.thumbnail ? (
        <Image
          source={{ uri: recipe.thumbnail }}
          style={styles.recipeImage}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.recipePlaceholderImage,
            { backgroundColor: colors.secondary },
          ]}>
          <MaterialIcons name="restaurant" size={32} color={colors.icon} />
        </View>
      )}

      <View style={styles.recipeCardContent}>
        {/* Header with difficulty indicator */}
        <View style={styles.recipeCardHeader}>
          <View
            style={[
              styles.recipeDifficultyBadge,
              { backgroundColor: colors.secondary },
            ]}>
            <Text style={[styles.recipeDifficultyText, { color: colors.tint }]}>
              {recipe.cookTimeMinutes <= 30
                ? "Easy"
                : recipe.cookTimeMinutes <= 60
                ? "Medium"
                : "Hard"}
            </Text>
          </View>
          <View
            style={[
              styles.recipeCookTimeBadge,
              { backgroundColor: colors.tint },
            ]}>
            <Text
              style={[styles.recipeCookTimeText, { color: colors.buttonText }]}>
              {recipe.cookTimeMinutes}m
            </Text>
          </View>
        </View>

        {/* Recipe content */}
        <View style={styles.recipeContent}>
          <ThemedText
            type="defaultSemiBold"
            style={styles.recipeTitle}
            numberOfLines={2}>
            {recipe.displayTitle}
          </ThemedText>
          <ThemedText
            style={[styles.recipeDescription, { color: colors.icon }]}
            numberOfLines={2}>
            {recipe.displayDescription}
          </ThemedText>
        </View>

        {/* Footer with ingredients */}
        <View style={styles.recipeFooter}>
          <View style={styles.recipeInfo}>
            <Text style={[styles.recipeInfoIcon, { color: colors.accent }]}>
              📋
            </Text>
            <Text
              style={[
                styles.recipeInfoCount,
                { color: colors.tabIconDefault },
              ]}>
              {recipe.ingredients.length} ingredients
            </Text>
          </View>
          <View style={styles.recipeInfo}>
            <Text style={[styles.recipeInfoIcon, { color: colors.accent }]}>
              📖
            </Text>
            <Text
              style={[
                styles.recipeInfoCount,
                { color: colors.tabIconDefault },
              ]}>
              {recipe.instructions.length} steps
            </Text>
          </View>
        </View>
      </View>

      {/* Accent line */}
      <View
        style={[styles.recipeAccentLine, { backgroundColor: colors.tint }]}
      />
    </TouchableOpacity>
  );
}
