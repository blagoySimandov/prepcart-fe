import { useAuth } from "@/src/auth/hooks";
import { useQuery } from "@tanstack/react-query";
import { Recipe } from "./types";
import { fetchUserRecipes } from "./query";

export function useUserRecipes(): { recipes: Recipe[]; isLoading: boolean } {
  const { user } = useAuth();

  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ["recipes", user?.uid],
    queryFn: fetchUserRecipes,
    enabled: !!user?.uid,
  });

  return { recipes, isLoading };
}
