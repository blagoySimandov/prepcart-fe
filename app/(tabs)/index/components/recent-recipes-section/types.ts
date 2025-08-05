import { Recipe } from "@/src/user/recipes/types";

export interface RecentRecipesSectionProps {
  recipes?: Recipe[];
  isLoading?: boolean;
  onViewAll: () => void;
}

export interface RecentRecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}