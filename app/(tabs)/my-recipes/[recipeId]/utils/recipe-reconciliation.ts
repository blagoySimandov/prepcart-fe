export interface IngredientChangeDetail {
  status: "add" | "remove" | "modify";
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

