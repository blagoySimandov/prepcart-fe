import { collection, query, where, getDocs } from "@react-native-firebase/firestore";
import { db } from "@/firebaseConfig";
import { Recipe } from "@/src/user/recipes/types";

export interface DuplicateRecipeResult {
  isDuplicate: boolean;
  existingRecipe?: Recipe;
}

export async function checkForDuplicateRecipe(
  userId: string,
  sourceUrl: string,
): Promise<DuplicateRecipeResult> {
  try {
    const recipesRef = collection(db, "users", userId, "recipes");
    const duplicateQuery = query(recipesRef, where("source", "==", sourceUrl));
    const querySnapshot = await getDocs(duplicateQuery);

    if (!querySnapshot.empty) {
      const existingRecipeDoc = querySnapshot.docs[0];
      const existingRecipeData = existingRecipeDoc.data();
      
      const existingRecipe: Recipe = {
        id: existingRecipeDoc.id,
        source: existingRecipeData.source || "",
        displayTitle: existingRecipeData.displayTitle || "",
        displayDescription: existingRecipeData.displayDescription || "",
        cookTimeMinutes: existingRecipeData.cookTimeMinutes || 0,
        ingredients: existingRecipeData.ingredients || [],
        instructions: existingRecipeData.instructions || [],
        thumbnail: existingRecipeData.thumbnail,
        videoLink: existingRecipeData.videoLink,
        dynamicCover: existingRecipeData.dynamicCover,
        hasModifications: existingRecipeData.hasModifications,
        substitutionChanges: existingRecipeData.substitutionChanges,
        modifiedAt: existingRecipeData.modifiedAt,
      };

      return {
        isDuplicate: true,
        existingRecipe,
      };
    }

    return {
      isDuplicate: false,
    };
  } catch (error) {
    console.error("Error checking for duplicate recipe:", error);
    throw error;
  }
}