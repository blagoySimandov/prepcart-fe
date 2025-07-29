import { Recipe, Ingredient, Instruction } from "@/src/user/recipes/types";
import { SubstitutionChanges } from "../components/substitution-changes/types";

const ANALYSIS_WEBHOOK_URL =
  "http://localhost:5678/webhook-test/b0b4dfdc-079d-4f6f-b5fc-6f1810e09706";

export interface SubstitutionRequest {
  original: string;
  replacement: string | null;
}

export interface SubstitutionAnalysisRequest {
  id: string;
  displayTitle: string;
  displayDescription: string;
  cookTimeMinutes: number;
  ingredients: Ingredient[];
  instructions: Pick<Instruction, "instruction">[];
  substitutionRequests: SubstitutionRequest[];
}

// TODO: Define proper type for webhook response data
interface WebhookResponseData {
  recipeModifications: {
    updatedIngredients: {
      name: string;
      quantity?: number;
      unit?: string;
      action: "add" | "remove" | "modify";
      reason?: string;
    }[];
    updatedInstructions: {
      stepNumber: number;
      modifiedInstruction: string;
      action: "add" | "remove" | "modify";
      timer?: { durationMinutes: number };
    }[];
    additionalSteps?: {
      stepNumber: number;
      instruction: string;
    }[];
  };
  nutritionalImpact?: {
    calories: { action: string; estimation: number };
    fat: { action: string; estimation: number };
    sugar: { action: string; estimation: number };
    notes: string;
  };
}

function normalizeSubstitutionChanges(
  data: WebhookResponseData,
  originalRecipe: Recipe,
): SubstitutionChanges {
  console.log("Normalizing substitution changes");
  console.log(
    "Original recipe ingredients:",
    originalRecipe.ingredients.map((i) => i.name),
  );
  console.log(
    "Modifications from webhook:",
    data.recipeModifications.updatedIngredients,
  );

  const normalizedData = {
    ...data,
    recipeModifications: {
      ...data.recipeModifications,
      updatedIngredients: data.recipeModifications.updatedIngredients
        .map((mod) => {
          const normalized: {
            name: string;
            quantity: number;
            unit: string;
            action: "add" | "remove" | "modify";
            reason?: string;
            originalQuantity?: number;
            originalUnit?: string;
          } = {
            ...mod,
            // Ensure required fields are present
            quantity: mod.quantity || 0,
            unit: mod.unit || "",
          };

          // For modified ingredients, find and store the original values
          if (mod.action === "modify") {
            const originalIngredient = originalRecipe.ingredients.find(
              (ing) => ing.name.toLowerCase() === mod.name.toLowerCase(),
            );
            if (originalIngredient) {
              normalized.originalQuantity = originalIngredient.quantity;
              normalized.originalUnit = originalIngredient.unit;
              console.log(
                `Found original values for ${mod.name}: ${originalIngredient.quantity} ${originalIngredient.unit}`,
              );
            } else {
              console.log(
                `Warning: Could not find original ingredient for modification: ${mod.name}`,
              );
            }
          }

          // For removed ingredients that don't exist in the original recipe, change to "skip"
          if (mod.action === "remove") {
            const exists = originalRecipe.ingredients.some(
              (ing) => ing.name.toLowerCase() === mod.name.toLowerCase(),
            );
            if (!exists) {
              console.log(
                `Skipping removal of non-existent ingredient: ${mod.name}`,
              );
              // Skip this modification as the ingredient doesn't exist
              return null;
            }
          }

          return normalized;
        })
        .filter(Boolean), // Remove null entries
      updatedInstructions: data.recipeModifications.updatedInstructions || [],
      additionalSteps: data.recipeModifications.additionalSteps || [],
    },
    nutritionalImpact: data.nutritionalImpact || {
      calories: { action: "no-change", estimation: 0 },
      fat: { action: "no-change", estimation: 0 },
      sugar: { action: "no-change", estimation: 0 },
      notes: "",
    },
  };

  console.log(
    "Normalized ingredients:",
    normalizedData.recipeModifications.updatedIngredients,
  );

  return normalizedData;
}

export async function fetchSubstitutionAnalysis(
  recipe: Recipe,
  substitutionRequests: SubstitutionRequest[],
): Promise<SubstitutionChanges> {
  const requestBody: SubstitutionAnalysisRequest = {
    id: recipe.id,
    displayTitle: recipe.displayTitle,
    displayDescription: recipe.displayDescription,
    cookTimeMinutes: recipe.cookTimeMinutes,
    ingredients: recipe.ingredients.map((ing) => ({
      name: ing.name,
      quantity: ing.quantity,
      unit: ing.unit,
    })),
    instructions: recipe.instructions.map((inst) => ({
      instruction: inst.instruction,
    })),
    substitutionRequests,
  };

  try {
    const response = await fetch(ANALYSIS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return normalizeSubstitutionChanges(data, recipe);
  } catch (error) {
    console.error("Error fetching substitution analysis:", error);
    throw error;
  }
}
