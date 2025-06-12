import { ShoppingItem } from "./shopping-list";

export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  createdAt: Date;
  shoppingList: ShoppingItem[];
}
