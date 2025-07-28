import { ReactNode } from "react";

export interface IngredientProps {
  children: ReactNode;
  status?: "add" | "modify" | "remove";
  modificationDetail?: {
    reason: string;
    originalQuantity?: string;
    originalUnit?: string;
  };
}

export interface BaseContainerProps {
  children: ReactNode;
}

export interface AmountProps {
  children: ReactNode;
}

export interface UnitProps {
  children: ReactNode;
}

export interface NameProps {
  children: ReactNode;
}

export interface SwapIngredientBtnProps {
  onPress?: () => void;
}
