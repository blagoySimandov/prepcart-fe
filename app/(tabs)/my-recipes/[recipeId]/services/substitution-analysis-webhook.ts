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
    return data as SubstitutionChanges;
  } catch (error) {
    console.error("Error fetching substitution analysis:", error);
    throw error;
  }
}
