import { Ingredient } from "@/src/user/recipes/types";

export interface FormattedIngredient {
  name: string;
  quantity: number;
  unit: string;
  originalQuantity: number;
  originalUnit: string;
  shouldOmitQuantity: boolean;
  isToTaste: boolean;
}

const SMALL_QUANTITY_UNITS = [
  "tsp",
  "teaspoon",
  "teaspoons",
  "tbsp",
  "tablespoon",
  "tablespoons",
  "pinch",
  "dash",
  "drop",
  "drops",
  "sprinkle",
  "to taste",
];

const UNIT_CONVERSIONS: { [key: string]: string } = {
  teaspoon: "tsp",
  teaspoons: "tsp",
  tablespoon: "tbsp",
  tablespoons: "tbsp",
  cup: "cups",
  gram: "g",
  grams: "g",
  kilogram: "kg",
  kilograms: "kg",
  milliliter: "ml",
  milliliters: "ml",
  liter: "L",
  liters: "L",
  pound: "lb",
  pounds: "lb",
  ounce: "oz",
  ounces: "oz",
  piece: "pcs",
  pieces: "pcs",
};

export function formatIngredientForShoppingList(
  ingredient: Ingredient,
  servingMultiplier: number = 1,
): FormattedIngredient {
  // Check if this is a "to taste" ingredient (both quantity and unit are null)
  const isToTaste = ingredient.quantity === null && ingredient.unit === null;
  
  // Handle null/undefined quantity and unit
  const quantity = ingredient.quantity ?? 1;
  const unit = ingredient.unit || "";
  
  const normalizedUnit = normalizeUnit(unit);
  const shouldOmitQuantity = shouldOmitQuantityForUnit(normalizedUnit) || isToTaste;

  // Don't apply serving multiplier to "to taste" ingredients
  const adjustedQuantity = isToTaste ? 1 : quantity * servingMultiplier;

  return {
    name: capitalizeFirstLetter(ingredient.name),
    quantity: shouldOmitQuantity ? 1 : adjustedQuantity,
    unit: isToTaste ? "to taste" : (shouldOmitQuantity ? "pcs" : normalizedUnit),
    originalQuantity: quantity,
    originalUnit: unit,
    shouldOmitQuantity,
    isToTaste,
  };
}

export function combineIngredients(
  ingredients: FormattedIngredient[],
): FormattedIngredient[] {
  const combined = new Map<string, FormattedIngredient>();

  ingredients.forEach((ingredient) => {
    const key = `${ingredient.name.toLowerCase()}_${ingredient.unit}`;

    if (combined.has(key)) {
      const existing = combined.get(key)!;
      combined.set(key, {
        ...existing,
        quantity: existing.quantity + ingredient.quantity,
      });
    } else {
      combined.set(key, ingredient);
    }
  });

  return Array.from(combined.values());
}

function normalizeUnit(unit: string | null | undefined): string {
  if (!unit) return "pcs";
  const lowerUnit = unit.toLowerCase().trim();
  return UNIT_CONVERSIONS[lowerUnit] || lowerUnit || "pcs";
}

function shouldOmitQuantityForUnit(unit: string): boolean {
  return SMALL_QUANTITY_UNITS.includes(unit.toLowerCase());
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatQuantityDisplay(quantity: number | null | undefined, unit: string | null | undefined): string {
  // Handle null/undefined values
  const safeQuantity = quantity ?? 1;
  const safeUnit = unit || "pcs";
  
  if (safeQuantity === 1 && safeUnit === "pcs") {
    return "";
  }

  // Round to reasonable precision
  const rounded = Math.round(safeQuantity * 100) / 100;

  // Convert to mixed number for better readability (e.g., 1.5 → 1½)
  if (rounded % 1 !== 0) {
    const whole = Math.floor(rounded);
    const fraction = rounded - whole;

    if (Math.abs(fraction - 0.25) < 0.01) {
      return whole > 0 ? `${whole}¼ ${safeUnit}` : `¼ ${safeUnit}`;
    } else if (Math.abs(fraction - 0.33) < 0.01) {
      return whole > 0 ? `${whole}⅓ ${safeUnit}` : `⅓ ${safeUnit}`;
    } else if (Math.abs(fraction - 0.5) < 0.01) {
      return whole > 0 ? `${whole}½ ${safeUnit}` : `½ ${safeUnit}`;
    } else if (Math.abs(fraction - 0.67) < 0.01) {
      return whole > 0 ? `${whole}⅔ ${safeUnit}` : `⅔ ${safeUnit}`;
    } else if (Math.abs(fraction - 0.75) < 0.01) {
      return whole > 0 ? `${whole}¾ ${safeUnit}` : `¾ ${safeUnit}`;
    }
  }

  return `${rounded} ${safeUnit}`;
}

