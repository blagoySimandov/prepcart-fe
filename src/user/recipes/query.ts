import { db } from "@/firebaseConfig";
import { QueryFunction } from "@tanstack/react-query";
import { Recipe } from "./types";

export const fetchUserRecipes: QueryFunction<
  Recipe[],
  string[]
> = async ({ queryKey }) => {
  const [, userId] = queryKey;

  if (!userId) {
    return [];
  }

  const snapshot = await db
    .collection(`users/${userId}/recipes`)
    .get();

  const recipesData: Recipe[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (!data) return;

    if (
      "displayTitle" in data &&
      "ingredients" in data &&
      data.displayTitle &&
      data.ingredients
    ) {
      recipesData.push({
        id: doc.id,
        source: data.source || "",
        displayTitle: data.displayTitle,
        displayDescription: data.displayDescription || "",
        cookTimeMinutes: data.cookTimeMinutes || 0,
        ingredients: data.ingredients || [],
        instructions: data.instructions || [],
        thumbnail: data.thumbnail,
        videoLink: data.videoLink,
        dynamicCover: data.dynamicCover,
        // Include modification tracking fields
        hasModifications: data.hasModifications,
        substitutionChanges: data.substitutionChanges,
        modifiedAt: data.modifiedAt,
      });
    }
  });

  recipesData.sort((a, b) => {
    if (!a.id && !b.id) return 0;
    if (!a.id) return 1;
    if (!b.id) return -1;
    return b.id.localeCompare(a.id);
  });

  return recipesData;
};