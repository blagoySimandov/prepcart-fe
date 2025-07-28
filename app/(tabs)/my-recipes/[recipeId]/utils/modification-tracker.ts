import { ModificationTracker } from "./recipe-reconciliation";
import { SubstitutionChanges } from "../components/substitution-changes/types";

export function createModificationTracker(substitutionChanges: SubstitutionChanges): ModificationTracker {
  const tracker: ModificationTracker = {
    ingredientChanges: new Map(),
    instructionChanges: new Map(),
  };
  
  console.log("Creating modification tracker with changes:", substitutionChanges.recipeModifications.updatedIngredients);

  substitutionChanges.recipeModifications.updatedIngredients.forEach((mod: any) => {
    // Handle both formats: action field or boolean flags
    let status: "add" | "remove" | "modify";
    if (mod.action) {
      status = mod.action;
    } else if (mod.modified) {
      status = "modify";
    } else if (mod.added) {
      status = "add";
    } else if (mod.removed) {
      status = "remove";
    } else {
      // Default to modify if no clear indicator
      status = "modify";
    }
    
    console.log(`Setting modification for ingredient "${mod.name}" with status "${status}"`);
    
    // For modifications, we need to track by the new name since that's what will be displayed
    tracker.ingredientChanges.set(mod.name, {
      status,
      reason: mod.reason,
      originalQuantity: mod.originalQuantity,
      originalUnit: mod.originalUnit,
    });
  });

  substitutionChanges.recipeModifications.updatedInstructions.forEach((mod: any) => {
    const instructionIndex = mod.stepNumber - 1;
    tracker.instructionChanges.set(instructionIndex, {
      originalInstruction: mod.originalInstruction,
      reason: mod.reasonForChange,
    });
  });

  return tracker;
}