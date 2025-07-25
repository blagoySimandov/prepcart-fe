import { SubstitutionOption } from "./types";

const MOCK_SUBSTITUTION_DATA: Record<string, SubstitutionOption[]> = {
  "granulated sugar": [
    {
      id: "1",
      name: "honey",
      quantity: 1,
      unit: "cup",
      reason: "Added as a substitute for sugar, slightly less quantity due to higher sweetness and liquid content.",
      impact: "The cake will be moister and have a richer flavor due to honey's moisture content and natural sweetness.",
    },
    {
      id: "2",
      name: "maple syrup",
      quantity: 0.75,
      unit: "cup",
      reason: "Natural sweetener with distinct flavor profile, less quantity needed due to liquid form.",
      impact: "Adds a subtle maple flavor and makes the cake more moist. May brown faster due to natural sugars.",
    },
    {
      id: "3",
      name: "coconut sugar",
      quantity: 1,
      unit: "cup",
      reason: "1:1 replacement with similar texture to granulated sugar but lower glycemic index.",
      impact: "Adds a slight caramel flavor and maintains similar texture. Color will be slightly darker.",
    },
  ],
  "butter": [
    {
      id: "4",
      name: "coconut oil",
      quantity: 0.8,
      unit: "cup",
      reason: "Plant-based alternative that provides similar fat content and moisture.",
      impact: "Adds subtle coconut flavor and creates a slightly different texture. Good for dairy-free diets.",
    },
    {
      id: "5",
      name: "applesauce",
      quantity: 0.5,
      unit: "cup",
      reason: "Low-fat alternative that adds moisture and natural sweetness.",
      impact: "Creates a denser, moister texture. Reduces fat content significantly. May need to reduce sugar slightly.",
    },
  ],
  "all-purpose flour": [
    {
      id: "6",
      name: "almond flour",
      quantity: 1.25,
      unit: "cups",
      reason: "Gluten-free alternative with nutty flavor. Requires more volume due to different density.",
      impact: "Creates a denser, moister texture with nutty flavor. Good for gluten-free diets.",
    },
    {
      id: "7",
      name: "oat flour",
      quantity: 1,
      unit: "cup",
      reason: "Whole grain alternative that can be made from ground oats.",
      impact: "Adds mild oat flavor and creates slightly denser texture. Higher fiber content.",
    },
  ],
};

export const useSubstitutionOptions = (ingredientName: string): SubstitutionOption[] => {
  const normalizedName = ingredientName.toLowerCase().trim();
  
  // Check for exact match
  if (MOCK_SUBSTITUTION_DATA[normalizedName]) {
    return MOCK_SUBSTITUTION_DATA[normalizedName];
  }
  
  // Check for partial match
  for (const [key, options] of Object.entries(MOCK_SUBSTITUTION_DATA)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return options;
    }
  }
  
  // Return default substitutions if no match found
  return [
    {
      id: "default-1",
      name: "Alternative ingredient",
      quantity: 1,
      unit: "unit",
      reason: "Generic substitution suggestion.",
      impact: "May affect texture and flavor. Adjust other ingredients as needed.",
    },
  ];
};