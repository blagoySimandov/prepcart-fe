import { Ingredient, Instruction, Recipe } from "@/src/user/recipes/types";
import { RecipeModifications, IngredientModification, InstructionModification } from "../components/substitution-changes/types";

export interface IngredientChangeDetail {
  status: "added" | "removed" | "modified";
  reason: string;
  originalQuantity?: string;
  originalUnit?: string;
}

export interface InstructionChangeDetail {
  originalInstruction: string;
  reason: string;
}

export interface ModificationTracker {
  ingredientChanges: Map<string, IngredientChangeDetail>;
  instructionChanges: Map<number, InstructionChangeDetail>;
}

export interface ReconciliationResult {
  modifiedRecipe: Recipe;
  appliedModifications: RecipeModifications;
  tracker: ModificationTracker;
}

export function reconcileRecipeWithModifications(
  originalRecipe: Recipe,
  modifications: RecipeModifications
): ReconciliationResult {
  const modifiedIngredients = [...originalRecipe.ingredients];
  const modifiedInstructions = [...originalRecipe.instructions];
  const tracker: ModificationTracker = {
    ingredientChanges: new Map(),
    instructionChanges: new Map(),
  };
  
  modifications.updatedIngredients.forEach(mod => {
    switch (mod.action) {
      case "remove":
        const removeIndex = modifiedIngredients.findIndex(
          ing => ing.name.toLowerCase() === mod.name.toLowerCase()
        );
        if (removeIndex !== -1) {
          tracker.ingredientChanges.set(mod.name, {
            status: "removed",
            reason: mod.reason,
          });
          modifiedIngredients.splice(removeIndex, 1);
        }
        break;
        
      case "add":
        if (mod.quantity && mod.unit) {
          tracker.ingredientChanges.set(mod.name, {
            status: "added",
            reason: mod.reason,
          });
          modifiedIngredients.push({
            name: mod.name,
            quantity: mod.quantity.toString(),
            unit: mod.unit,
          });
        }
        break;
        
      case "modify":
        const modifyIndex = modifiedIngredients.findIndex(
          ing => ing.name.toLowerCase() === mod.name.toLowerCase()
        );
        if (modifyIndex !== -1 && mod.quantity && mod.unit) {
          const original = modifiedIngredients[modifyIndex];
          tracker.ingredientChanges.set(mod.name, {
            status: "modified",
            reason: mod.reason,
            originalQuantity: original.quantity,
            originalUnit: original.unit,
          });
          modifiedIngredients[modifyIndex] = {
            ...modifiedIngredients[modifyIndex],
            quantity: mod.quantity.toString(),
            unit: mod.unit,
          };
        }
        break;
    }
  });
  
  modifications.updatedInstructions.forEach(mod => {
    const instructionIndex = mod.stepNumber - 1;
    if (instructionIndex >= 0 && instructionIndex < modifiedInstructions.length) {
      tracker.instructionChanges.set(instructionIndex, {
        originalInstruction: mod.originalInstruction,
        reason: mod.reasonForChange,
      });
      modifiedInstructions[instructionIndex] = {
        ...modifiedInstructions[instructionIndex],
        instruction: mod.modifiedInstruction,
      };
    }
  });
  
  const modifiedRecipe: Recipe = {
    ...originalRecipe,
    ingredients: modifiedIngredients,
    instructions: modifiedInstructions,
    cookTimeMinutes: originalRecipe.cookTimeMinutes + modifications.cookingTimeAdjustment,
  };
  
  return {
    modifiedRecipe,
    appliedModifications: modifications,
    tracker,
  };
}