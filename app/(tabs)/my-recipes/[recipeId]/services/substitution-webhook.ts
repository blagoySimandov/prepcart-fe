import { Ingredient } from "@/src/user/recipes/types";

const WEBHOOK_URL = "http://localhost:5678/webhook-test/c1297b7e-cefc-4b43-a3c9-c2a0ca926dfa";

export interface SubstitutionTarget {
  ingredient: string;
  candidates: string[];
}

export interface ReplacementCandidatesResponse {
  replacementCandidates: SubstitutionTarget[];
}

export interface SubstitutionWebhookRequest {
  displayTitle: string;
  displayDescription: string;
  cookTimeMinutes: number;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  substitutionTargets: string[];
}

export async function fetchReplacementCandidates(
  recipe: {
    displayTitle: string;
    displayDescription: string;
    cookTimeMinutes: number;
    ingredients: Ingredient[];
  },
  targetIngredients: string[]
): Promise<ReplacementCandidatesResponse> {
  const requestBody: SubstitutionWebhookRequest = {
    displayTitle: recipe.displayTitle,
    displayDescription: recipe.displayDescription,
    cookTimeMinutes: recipe.cookTimeMinutes,
    ingredients: recipe.ingredients.map(ing => ({
      name: ing.name,
      quantity: parseFloat(ing.quantity) || 1,
      unit: ing.unit,
    })),
    substitutionTargets: targetIngredients,
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
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
    return data as ReplacementCandidatesResponse;
  } catch (error) {
    console.error("Error fetching replacement candidates:", error);
    throw error;
  }
}