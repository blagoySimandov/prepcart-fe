import { Discount } from "@/src/discounts/types";

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  completed: boolean;
  createdAt: Date;
  detectedDiscounts?: Discount[];
}
