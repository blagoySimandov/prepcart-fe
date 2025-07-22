export type Ingredient = {
  name: string;
  quantity: string;
  unit: string;
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
  displayTitle: string;
  displayDescription: string;
  cookTimeMinutes: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  thumbnail?: string;
  videoLink?: string;
};
