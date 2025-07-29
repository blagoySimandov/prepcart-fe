import { Recipe } from "@/src/user/recipes/types";

export interface RecentRecipesSectionProps {
  onViewAll: () => void;
}

export interface RecentRecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}