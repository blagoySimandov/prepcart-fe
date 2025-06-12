import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { ShoppingItem } from "./types";
import { tryCatch } from "@/app/utils";

export class ShoppingListManager {
  static async saveList(items: ShoppingItem[], userId: string): Promise<void> {
    const userDocRef = doc(db, "users", userId);

    const [data, err] = await tryCatch(
      setDoc(userDocRef, {
        id: userId,
        shoppingList: items,
      }),
    );
    if (err) {
      console.error("Error saving shopping list:", err);
      return;
    }
    return data;
  }

  static async loadList(): Promise<ShoppingItem[]> {
    // TODO: Implement loading from AsyncStorage or backend API
    console.log("Loading shopping list from storage");
    return [];
  }

  static async syncList(items: ShoppingItem[]): Promise<void> {
    // TODO: Implement backend synchronization for cross-device access
    console.log("Syncing shopping list with backend:", items);
  }
}
