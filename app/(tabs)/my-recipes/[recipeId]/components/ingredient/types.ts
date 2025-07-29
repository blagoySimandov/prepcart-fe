import { ReactNode } from "react";

export interface IngredientProps {
  children: ReactNode;
  status?: "add" | "modify" | "remove";
  modificationDetail?: {
    reason: string;
    originalQuantity?: string;
    originalUnit?: string;
  };
  ingredientName?: string;
  recipeId?: string;
}

export interface BaseContainerProps {
  children: ReactNode;
}

export interface AmountProps {
  children: ReactNode;
  value?: number | null;
}

export interface UnitProps {
  children: ReactNode;
  value?: string | null;
  quantity?: number | null;
  ingredientName?: string;
  recipeId?: string;
  onUnitConverted?: (unit: string, value: number) => void;
  currentConversion?: { unit: string; value: number } | null;
}

export interface NameProps {
  children: ReactNode;
}

export interface SwapIngredientBtnProps {
  onPress?: () => void;
}
