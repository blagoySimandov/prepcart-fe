import { Recipe, Ingredient, Instruction } from "@/src/user/recipes/types";
import { SubstitutionChanges } from "../components/substitution-changes/types";

export function applyModificationsToRecipe(
  originalRecipe: Recipe,
  substitutionChanges: SubstitutionChanges
): Recipe {
  if (!substitutionChanges?.recipeModifications) {
    return originalRecipe;
  }

  const modifiedIngredients = [...originalRecipe.ingredients];
  const modifiedInstructions = [...originalRecipe.instructions];

  // Apply ingredient modifications
  substitutionChanges.recipeModifications.updatedIngredients.forEach((mod: any) => {
    const action = mod.action || (mod.modified ? "modify" : mod.added ? "add" : "remove");
    
    if (action === "add") {
      // Add new ingredient
      modifiedIngredients.push({
        name: mod.name,
        quantity: mod.quantity || 0,
        unit: mod.unit || "",
      });
    } else if (action === "remove") {
      // Remove ingredient
      const index = modifiedIngredients.findIndex(
        (ing) => ing.name.toLowerCase() === mod.name.toLowerCase()
      );
      if (index !== -1) {
        modifiedIngredients.splice(index, 1);
      }
    } else if (action === "modify") {
      // Find the original ingredient that's being modified
      // This is tricky because the modification might have a different name
      // We need to check if this is replacing an existing ingredient
      
      // First, check if there's an originalName field
      const targetName = mod.originalName || mod.name;
      
      // Try to find by looking at the reason - often mentions what's being replaced
      let originalIndex = -1;
      if (mod.reason && mod.reason.includes("substituting")) {
        // Extract the original ingredient from the reason
        const match = mod.reason.match(/substituting\s+(\w+(?:\s+\w+)*)\s+with/i);
        if (match) {
          const originalIngredientName = match[1];
          originalIndex = modifiedIngredients.findIndex(
            (ing) => ing.name.toLowerCase() === originalIngredientName.toLowerCase()
          );
        }
      }
      
      // If we couldn't find it from the reason, try exact match
      if (originalIndex === -1) {
        originalIndex = modifiedIngredients.findIndex(
          (ing) => ing.name.toLowerCase() === targetName.toLowerCase()
        );
      }
      
      if (originalIndex !== -1) {
        // Replace the ingredient
        modifiedIngredients[originalIndex] = {
          name: mod.name,
          quantity: mod.quantity || modifiedIngredients[originalIndex].quantity,
          unit: mod.unit || modifiedIngredients[originalIndex].unit,
        };
      } else {
        // If we can't find the original, add as new
        modifiedIngredients.push({
          name: mod.name,
          quantity: mod.quantity || 0,
          unit: mod.unit || "",
        });
      }
    }
  });

  // Apply instruction modifications
  substitutionChanges.recipeModifications.updatedInstructions.forEach((mod: any) => {
    const index = mod.stepNumber - 1;
    if (index >= 0 && index < modifiedInstructions.length) {
      modifiedInstructions[index] = {
        ...modifiedInstructions[index],
        instruction: mod.modifiedInstruction,
      };
    }
  });

  // Add any additional steps
  if (substitutionChanges.recipeModifications.additionalSteps) {
    substitutionChanges.recipeModifications.additionalSteps.forEach((step: any) => {
      modifiedInstructions.push({
        instruction: step.instruction,
        startTimestamp: 0,
        endTimestamp: 0,
        timer: null,
      });
    });
  }

  return {
    ...originalRecipe,
    ingredients: modifiedIngredients,
    instructions: modifiedInstructions,
    cookTimeMinutes: originalRecipe.cookTimeMinutes + 
      (substitutionChanges.recipeModifications.cookingTimeAdjustment || 0),
  };
}