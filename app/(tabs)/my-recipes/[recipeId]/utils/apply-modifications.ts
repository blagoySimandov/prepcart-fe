import { Recipe, Instruction } from "@/src/user/recipes/types";
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

  // Sort modifications to ensure proper order: remove -> modify -> add
  // This prevents issues where ingredients might be added twice
  const sortedModifications = [...substitutionChanges.recipeModifications.updatedIngredients].sort((a, b) => {
    const order = { remove: 0, modify: 1, add: 2 };
    return order[a.action] - order[b.action];
  });

  // Apply ingredient modifications
  sortedModifications.forEach((mod) => {
    const action = mod.action;
    
    if (action === "add") {
      // Check if ingredient already exists to prevent duplicates
      const exists = modifiedIngredients.some(
        (ing) => ing.name.toLowerCase() === mod.name.toLowerCase()
      );
      if (!exists) {
        // Add new ingredient only if it doesn't already exist
        modifiedIngredients.push({
          name: mod.name,
          quantity: mod.quantity,
          unit: mod.unit,
        });
      } else {
        console.warn(`Ingredient "${mod.name}" already exists. Skipping duplicate addition.`);
      }
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
      // TODO: Define proper type with originalName field
      interface ModificationWithOriginalName {
        name: string;
        quantity: number;
        unit: string;
        action: "add" | "remove" | "modify";
        reason?: string;
        originalName?: string;
      }
      const targetName = (mod as ModificationWithOriginalName).originalName || mod.name;
      
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
          quantity: mod.quantity,
          unit: mod.unit,
        };
      } else {
        // If we can't find the original and this is a substitution, don't add as new
        // The original should have been removed by a separate "remove" action
        // Only add if this is truly a modification of an existing ingredient
        console.warn(`Could not find ingredient to modify: ${targetName}. Skipping addition to avoid duplicates.`);
      }
    }
  });

  // Apply instruction modifications
  substitutionChanges.recipeModifications.updatedInstructions.forEach((mod) => {
    const index = mod.stepNumber - 1;
    const action = mod.action;

    if (action === "remove") {
      // Remove instruction at the given step number
      if (index >= 0 && index < modifiedInstructions.length) {
        modifiedInstructions.splice(index, 1);
      }
    } else if (action === "modify") {
      // Modify existing instruction
      if (index >= 0 && index < modifiedInstructions.length) {
        modifiedInstructions[index] = {
          ...modifiedInstructions[index],
          instruction: mod.modifiedInstruction,
          timer: mod.timer && mod.timer.durationMinutes > 0 ? {
            durationMinutes: mod.timer.durationMinutes
          } : modifiedInstructions[index].timer,
        };
      }
    } else if (action === "add") {
      // Add new instruction at the position
      const newInstruction: Instruction = {
        instruction: mod.modifiedInstruction,
        startTimestamp: 0,
        endTimestamp: 0,
        timer: mod.timer && mod.timer.durationMinutes > 0 ? {
          durationMinutes: mod.timer.durationMinutes
        } : null,
      };
      
      // Insert at the correct position
      if (index >= 0 && index <= modifiedInstructions.length) {
        modifiedInstructions.splice(index, 0, newInstruction);
      } else {
        modifiedInstructions.push(newInstruction);
      }
    }
  });

  if (substitutionChanges.recipeModifications.additionalSteps) {
    substitutionChanges.recipeModifications.additionalSteps.forEach((step) => {
      const newInstruction: Instruction = {
        instruction: step.instruction,
        startTimestamp: 0,
        endTimestamp: 0,
        timer: null,
      };

      // Insert at the specified step number position
      const insertIndex = step.stepNumber - 1;
      if (insertIndex >= 0 && insertIndex <= modifiedInstructions.length) {
        modifiedInstructions.splice(insertIndex, 0, newInstruction);
      } else {
        modifiedInstructions.push(newInstruction);
      }
    });
  }

  return {
    ...originalRecipe,
    ingredients: modifiedIngredients,
    instructions: modifiedInstructions,
  };
}