import { Discount } from "@/src/discounts/types";

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  completed: boolean;
  createdAt: Date;
  detectedDiscounts?: Discount[];
  userId?: string;
  parsedData?: {
    originalName: string;
    numericQuantity: number;
    unit: string;
    confidence: number;
    parsedAt: Date;
  };
}
