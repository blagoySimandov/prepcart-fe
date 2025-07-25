import { doc, deleteDoc } from "@react-native-firebase/firestore";
import { db } from "@/firebaseConfig";

export async function deleteRecipe(
  userId: string,
  recipeId: string
): Promise<void> {
  try {
    const recipeDocRef = doc(db, "users", userId, "recipes", recipeId);
    await deleteDoc(recipeDocRef);
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw new Error("Failed to delete recipe. Please try again.");
  }
}