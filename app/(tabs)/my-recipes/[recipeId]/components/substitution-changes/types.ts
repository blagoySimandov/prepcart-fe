export interface SubstitutionAnalysis {
  difficultyLevel: string;
  expectedOutcome: string;
}

export interface IngredientModification {
  name: string;
  action: "remove" | "add" | "modify";
  reason: string;
  quantity?: number;
  unit?: string;
  originalQuantity?: number;
  originalUnit?: string;
}

export interface InstructionModification {
  stepNumber: number;
  originalInstruction: string;
  modifiedInstruction: string;
  reasonForChange: string;
}

export interface RecipeModifications {
  updatedIngredients: IngredientModification[];
  updatedInstructions: InstructionModification[];
  additionalSteps: any[];
  cookingTimeAdjustment: number;
}

export interface SubstitutionChanges {
  substitutionAnalysis: SubstitutionAnalysis;
  recipeModifications: RecipeModifications;
  criticalTips: string[];
}

export interface SubstitutionChangesModalProps {
  visible: boolean;
  onClose: () => void;
  changes: SubstitutionChanges | null;
  onApply: () => void;
  ingredientName: string;
}

