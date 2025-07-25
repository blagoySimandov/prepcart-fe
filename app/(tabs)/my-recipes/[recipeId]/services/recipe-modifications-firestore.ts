import { doc, setDoc, getDoc, deleteDoc } from "@firebase/firestore";
import { db } from "@/firebaseConfig";
import { SubstitutionChanges } from "../components/substitution-changes/types";
import { Recipe } from "@/src/user/recipes/types";

export interface RecipeModificationData {
  originalRecipe: Recipe;
  substitutionChanges: SubstitutionChanges;
  appliedAt: Date;
  userId: string;
}

export async function saveRecipeModification(
  userId: string,
  recipeId: string,
  originalRecipe: Recipe,
  substitutionChanges: SubstitutionChanges
): Promise<void> {
  try {
    const modificationDoc = doc(db, "users", userId, "recipes", recipeId);
    
    const modificationData: RecipeModificationData = {
      originalRecipe,
      substitutionChanges,
      appliedAt: new Date(),
      userId,
    };
    
    await setDoc(modificationDoc, modificationData);
  } catch (error) {
    console.error("Error saving recipe modification:", error);
    throw error;
  }
}

export async function getRecipeModification(
  userId: string,
  recipeId: string
): Promise<RecipeModificationData | null> {
  try {
    const modificationDoc = doc(db, "users", userId, "recipes", recipeId);
    const docSnap = await getDoc(modificationDoc);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as RecipeModificationData;
      // Convert Firestore timestamp to Date
      data.appliedAt = data.appliedAt instanceof Date ? data.appliedAt : new Date(data.appliedAt);
      return data;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting recipe modification:", error);
    throw error;
  }
}

export async function deleteRecipeModification(
  userId: string,
  recipeId: string
): Promise<void> {
  try {
    const modificationDoc = doc(db, "users", userId, "recipes", recipeId);
    await deleteDoc(modificationDoc);
  } catch (error) {
    console.error("Error deleting recipe modification:", error);
    throw error;
  }
}