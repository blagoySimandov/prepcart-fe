import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type RChildren = { children: React.ReactNode | React.ReactNode[] };

export interface Recipe extends FirebaseFirestoreTypes.DocumentData {
  id: string;
  title: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  servings?: number;
  prepTime?: number;
  cookTime?: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShoppingListItem extends FirebaseFirestoreTypes.DocumentData {
  id: string;
  name: string;
  quantity?: number;
  unit?: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends FirebaseFirestoreTypes.DocumentData {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  preferences?: {
    units?: 'metric' | 'imperial';
    dietaryRestrictions?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface FirestoreCollections {
  recipes: Recipe;
  shoppingListItems: ShoppingListItem;
  users: UserProfile;
}
