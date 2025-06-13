export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  completed: boolean;
  detectedDiscounts?: Discount[];
  createdAt: Date;
}

export interface Discount {
  productName: string;
  discountPercentage: number; // 0.0 - 1.0
  createdAt: Date;
}
