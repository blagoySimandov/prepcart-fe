import { db } from "@/firebaseConfig";
import { useAuth } from "@/src/auth/hooks";
import { useFirestoreCollection } from "@/src/hooks/use-firestore-collection";
import { collection, query } from "@react-native-firebase/firestore";
import { Recipe } from "./types";

export function useUserRecipes(): { recipes: Recipe[]; isLoading: boolean } {
  const { user } = useAuth();

  const { data: recipes, isLoading } = useFirestoreCollection<Recipe>({
    queryFn: () => {
      if (!user?.uid) return null;
      return query(collection(db, "users", user.uid, "recipes"));
    },
    transform: (snapshot) => {
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
    },
    dependencies: [user?.uid],
  });

  return { recipes, isLoading };
}
