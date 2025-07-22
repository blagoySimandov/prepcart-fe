import { Recipe } from "@/src/user/recipes/types";

export interface SmallRecipeCardProps {
  recipe: Recipe;
  index: number;
  onPress?: () => void;
}
