import { UNIT_SYSTEMS, UNIT_CATEGORIES } from "./constants";

export type UnitSystem = typeof UNIT_SYSTEMS[keyof typeof UNIT_SYSTEMS];
export type UnitCategory = typeof UNIT_CATEGORIES[keyof typeof UNIT_CATEGORIES];

export interface ConversionResult {
  value: number;
  unit: string;
  formatted: string;
  isConverted: boolean;
  originalValue: number;
  originalUnit: string;
}

export interface UnitConversionState {
  currentUnit: string;
  currentValue: number;
  originalUnit: string;
  originalValue: number;
  availableConversions: string[];
  category: UnitCategory;
  isConverted: boolean;
}

export interface UnitPreferences {
  [recipeId: string]: {
    [ingredientName: string]: {
      preferredUnit: string;
      systemOverride?: UnitSystem;
    };
  };
}

export interface GlobalUnitPreferences {
  defaultSystem: UnitSystem;
  autoConvert: boolean;
}

export interface ConversionOptions {
  precision?: number;
  preferredUnits?: string[];
  system?: UnitSystem;
}

export interface UnitToggleProps {
  currentUnit: string;
  currentValue: number;
  originalUnit: string;
  originalValue: number;
  onUnitChange: (unit: string, value: number) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}