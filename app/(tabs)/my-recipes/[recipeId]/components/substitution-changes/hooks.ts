import { SubstitutionChanges } from "./types";

const MOCK_SUBSTITUTION_CHANGES: SubstitutionChanges = {
  substitutionAnalysis: {
    difficultyLevel: "moderate",
    expectedOutcome: "The cake will be moister and have a richer flavor due to honey's moisture content and natural sweetness. Omitting raisins reduces texture contrast but simplifies the flavor profile."
  },
  recipeModifications: {
    updatedIngredients: [
      {
        name: "granulated sugar",
        action: "remove",
        reason: "Removed to substitute with honey which is sweeter and contains liquid."
      },
      {
        name: "honey",
        quantity: 1,
        unit: "cup",
        action: "add",
        reason: "Added as a substitute for sugar, slightly less quantity due to higher sweetness and liquid content."
      },
      {
        name: "raisins",
        action: "remove",
        reason: "Omitted as per substitution request."
      },
      {
        name: "butter",
        quantity: 0.8,
        unit: "cup",
        action: "modify",
        reason: "Reduced slightly to balance additional moisture from honey."
      }
    ],
    updatedInstructions: [
      {
        stepNumber: 1,
        originalInstruction: "Cream the butter and sugar until fluffy.",
        modifiedInstruction: "Cream the softened butter; gradually add honey and beat until combined and fluffy.",
        reasonForChange: "Adjusting method because honey is liquid and cannot be creamed like granulated sugar."
      },
      {
        stepNumber: 3,
        originalInstruction: "Fold in raisins at the end.",
        modifiedInstruction: "Skip folding in raisins as they have been omitted.",
        reasonForChange: "Raisins omitted as per substitution; step is removed."
      }
    ],
    additionalSteps: [],
    cookingTimeAdjustment: 5
  },
  criticalTips: [
    "When substituting honey for sugar, reduce oven temperature by 25°F (about 15°C) to prevent over-browning due to honey's sugars.",
    "Reduce butter slightly to balance the moisture honey adds.",
    "Honey will make the cake more moist and tender but can also increase browning.",
    "Do not add raisins or replace their texture with other dried fruits if avoiding them."
  ]
};

export const useSubstitutionChanges = (
  originalIngredient: string,
  substitutionIngredient: string | null
): SubstitutionChanges | null => {
  if (!originalIngredient) return null;
  
  return MOCK_SUBSTITUTION_CHANGES;
};