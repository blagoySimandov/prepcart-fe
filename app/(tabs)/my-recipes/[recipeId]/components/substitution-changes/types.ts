export interface IngredientInfo {
  name: string;
  quantity: number;
  unit: string;
  function: string;
}

export interface SubstitutionAnalysis {
  originalIngredient: IngredientInfo;
  replacementIngredient: IngredientInfo;
  difficultyLevel: "easy" | "moderate" | "advanced";
  expectedOutcome: string;
}

export interface IngredientModification {
  name: string;
  quantity: number;
  unit: string;
  action: "remove" | "add" | "modify";
  reason: string;
  originalQuantity?: number;
  originalUnit?: string;
}

export interface InstructionTimer {
  durationMinutes: number;
}

export interface InstructionModification {
  stepNumber: number;
  action: "modify" | "remove" | "add";
  originalInstruction: string;
  modifiedInstruction: string;
  reasonForChange: string;
  timer: InstructionTimer;
}

export interface AdditionalStep {
  stepNumber: number;
  instruction: string;
  reason: string;
}

export interface RecipeModifications {
  updatedIngredients: IngredientModification[];
  updatedInstructions: InstructionModification[];
  additionalSteps: AdditionalStep[];
}

export interface NutritionalMetric {
  action: "increase" | "decrease" | "no-change";
  estimation: number;
}

export interface NutritionalImpact {
  calories: NutritionalMetric;
  fat: NutritionalMetric;
  sugar: NutritionalMetric;
  notes: string;
}

export interface SubstitutionChanges {
  substitutionAnalysis: SubstitutionAnalysis;
  recipeModifications: RecipeModifications;
  nutritionalImpact: NutritionalImpact;
}

export interface SubstitutionChangesModalProps {
  visible: boolean;
  onClose: () => void;
  changes: SubstitutionChanges | null;
  onApply: () => void;
  ingredientName: string;
}