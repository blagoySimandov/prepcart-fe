export type Ingredient = {
  name: string;
  quantity: string | number;
  unit: string;
};

export type Instruction = {
  startTimestamp: number;
  endTimestamp: number;
  instruction: string;
  timer: { durationMinutes: number | null } | null;
};

export type Recipe = {
  description: string;
  displayTitle: string;
  displayDescription: string;
  cookTimeMinutes?: number;
  dynamicCover: string;
  result: Record<string, unknown>;
  ingredients: Ingredient[];
  instructions: Instruction[];
  source: string;
  thumbnail: string;
  videoLink: string;
};
