import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteField,
} from "@react-native-firebase/firestore";
import { db } from "@/firebaseConfig";
import { SubstitutionChanges } from "../components/substitution-changes/types";
import { Recipe } from "@/src/user/recipes/types";

export async function saveRecipeModification(
  userId: string,
  recipeId: string,
  originalRecipe: Recipe,
  substitutionChanges: SubstitutionChanges,
): Promise<void> {
  try {
    const modificationDoc = doc(db, "users", userId, "recipes", recipeId);

    const modifiedIngredients = [...originalRecipe.ingredients];
    const modifiedInstructions = [...originalRecipe.instructions];

    substitutionChanges.recipeModifications.updatedIngredients.forEach(
      (mod) => {
        switch (mod.action) {
          case "remove":
            break;
          case "add":
            if (mod.quantity && mod.unit) {
              modifiedIngredients.push({
                name: mod.name,
                quantity: mod.quantity,
                unit: mod.unit,
              });
            }
            break;
          case "modify":
            const modifyIndex = modifiedIngredients.findIndex(
              (ing) => ing.name.toLowerCase() === mod.name.toLowerCase(),
            );
            if (modifyIndex !== -1 && mod.quantity && mod.unit) {
              modifiedIngredients[modifyIndex] = {
                ...modifiedIngredients[modifyIndex],
                quantity: mod.quantity,
                unit: mod.unit,
              };
            }
            break;
        }
      },
    );

    substitutionChanges.recipeModifications.updatedInstructions.forEach(
      (mod) => {
        const instructionIndex = mod.stepNumber - 1;
        if (
          instructionIndex >= 0 &&
          instructionIndex < modifiedInstructions.length
        ) {
          modifiedInstructions[instructionIndex] = {
            ...modifiedInstructions[instructionIndex],
            instruction: mod.modifiedInstruction,
          };
        }
      },
    );

    const recipeData = {
      ...originalRecipe,
      ingredients: modifiedIngredients,
      instructions: modifiedInstructions,
      substitutionChanges,
      hasModifications: true,
      modifiedAt: new Date(),
    };

    await setDoc(modificationDoc, recipeData, { merge: true });
  } catch (error) {
    console.error("Error saving recipe modification:", error);
    throw error;
  }
}

export async function getRecipeModification(
  userId: string,
  recipeId: string,
): Promise<{ substitutionChanges: SubstitutionChanges } | null> {
  try {
    const modificationDoc = doc(db, "users", userId, "recipes", recipeId);
    const docSnap = await getDoc(modificationDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data?.substitutionChanges) {
        return {
          substitutionChanges: data.substitutionChanges as SubstitutionChanges,
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error getting recipe modification:", error);
    throw error;
  }
}

export async function deleteRecipeModification(
  userId: string,
  recipeId: string,
): Promise<Recipe | null> {
  try {
    const modificationDoc = doc(db, "users", userId, "recipes", recipeId);

    const docSnap = await getDoc(modificationDoc);
    if (!docSnap.exists()) {
      throw new Error("Recipe not found");
    }

    const data = docSnap.data();
    if (!data?.substitutionChanges) {
      return null;
    }

    const originalIngredients = [...data.ingredients];
    const originalInstructions = [...data.instructions];

    // TODO: Define proper type for modification
    interface IngredientModification {
      name: string;
      action: "add" | "remove" | "modify";
      originalQuantity?: number;
      originalUnit?: string;
    }

    data.substitutionChanges.recipeModifications.updatedIngredients.forEach(
      (mod: IngredientModification) => {
        switch (mod.action) {
          case "remove":
            break;
          case "add":
            const addIndex = originalIngredients.findIndex(
              (ing) => ing.name.toLowerCase() === mod.name.toLowerCase(),
            );
            if (addIndex !== -1) {
              originalIngredients.splice(addIndex, 1);
            }
            break;
          case "modify":
            const modIndex = originalIngredients.findIndex(
              (ing) => ing.name.toLowerCase() === mod.name.toLowerCase(),
            );
            if (modIndex !== -1 && mod.originalQuantity && mod.originalUnit) {
              originalIngredients[modIndex] = {
                ...originalIngredients[modIndex],
                quantity: mod.originalQuantity,
                unit: mod.originalUnit,
              };
            }
            break;
        }
      },
    );

    // Revert instruction modifications
    // TODO: Define proper type for instruction modification
    interface InstructionModification {
      stepNumber: number;
      originalInstruction?: string;
    }

    data.substitutionChanges.recipeModifications.updatedInstructions.forEach(
      (mod: InstructionModification) => {
        const instructionIndex = mod.stepNumber - 1;
        if (
          instructionIndex >= 0 &&
          instructionIndex < originalInstructions.length
        ) {
          originalInstructions[instructionIndex] = {
            ...originalInstructions[instructionIndex],
            instruction: mod.originalInstruction,
          };
        }
      },
    );

    // Update the document with original recipe data and remove modification fields
    const restoredRecipe = {
      ...data,
      ingredients: originalIngredients,
      instructions: originalInstructions,
      substitutionChanges: deleteField(),
      hasModifications: deleteField(),
      modifiedAt: deleteField(),
    };

    await updateDoc(modificationDoc, restoredRecipe);

    // Return the restored recipe
    return {
      id: docSnap.id,
      source: data.source || "",
      displayTitle: data.displayTitle,
      displayDescription: data.displayDescription || "",
      cookTimeMinutes: data.cookTimeMinutes || 0,
      ingredients: originalIngredients,
      instructions: originalInstructions,
      thumbnail: data.thumbnail,
      videoLink: data.videoLink,
      dynamicCover: data.dynamicCover,
    };
  } catch (error) {
    console.error("Error deleting recipe modification:", error);
    throw error;
  }
}
