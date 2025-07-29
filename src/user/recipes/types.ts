export type Ingredient = {
  name: string;
  quantity: number | null;
  unit: string | null;
};

export type Instruction = {
  instruction: string;
  startTimestamp: number; // in seconds for the video
  endTimestamp: number;
  timer: {
    durationMinutes: number | null;
  } | null;
};

export type Recipe = {
  id: string;
  source: string;
  displayTitle: string;
  displayDescription: string;
  cookTimeMinutes: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  thumbnail?: string;
  videoLink?: string;
  dynamicCover?: string;
  // Modification tracking fields
  hasModifications?: boolean;
  substitutionChanges?: any; // Using any to avoid circular dependency
  modifiedAt?: Date;
};
