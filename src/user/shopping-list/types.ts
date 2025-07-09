import { Discount } from "@/src/discounts/types";

export type BaseShoppingListItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
};

export interface ShoppingItem extends BaseShoppingListItem {
  completed: boolean;
  createdAt: Date;
  detectedDiscounts?: Discount[];
  calculatedSavings?: {
    amount: number;
    currency: string;
    bestDiscountId?: string;
  };
  userId?: string;
  parsedData?: {
    originalName: string;
    numericQuantity: number;
    unit: string;
    confidence: number;
    parsedAt: Date;
  };
}
