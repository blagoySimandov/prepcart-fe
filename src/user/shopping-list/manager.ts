import { db } from "@/firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ShoppingItem } from "./types";

/**
 * Manages shopping list data in Firestore for a specific user.
 */
export class ShoppingListService {
  private userId: string;
  private userDocRef;

  constructor(userId: string) {
    if (!userId) {
      throw new Error("User ID is required for ShoppingListService.");
    }
    this.userId = userId;
    this.userDocRef = doc(db, "users", this.userId);
  }

  /**
   * Loads the user's shopping list from Firestore.
   * If no list exists, it creates an empty one.
   * @returns {Promise<ShoppingItem[]>} The user's shopping list.
   */
  async loadList(): Promise<ShoppingItem[]> {
    try {
      const docSnap = await getDoc(this.userDocRef);
      if (docSnap.exists() && docSnap.data().shoppingList) {
        return docSnap.data().shoppingList as ShoppingItem[];
      } else {
        // If the user document or shoppingList doesn't exist, create it.
        await setDoc(this.userDocRef, { shoppingList: [] }, { merge: true });
        return [];
      }
    } catch (error) {
      console.error("Error loading shopping list:", error);
      throw error;
    }
  }

  /**
   * Saves the entire shopping list to Firestore, overwriting the previous list.
   * @param {ShoppingItem[]} items The array of shopping items to save.
   */
  async saveList(items: ShoppingItem[]): Promise<void> {
    try {
      await setDoc(this.userDocRef, { shoppingList: items }, { merge: true });
    } catch (error) {
      console.error("Error saving shopping list:", error);
      throw error;
    }
  }

  /**
   * Adds a single item to the user's shopping list.
   * @param {ShoppingItem} item The item to add.
   */
  async addItem(item: Omit<ShoppingItem, "id">): Promise<void> {
    try {
      const newItemRef = doc(
        collection(db, "users", this.userId, "shoppingList")
      );
      const newItem = { ...item, id: newItemRef.id };
      await updateDoc(this.userDocRef, {
        shoppingList: arrayUnion(newItem),
      });
    } catch (error) {
      console.error("Error adding item to shopping list:", error);
      throw error;
    }
  }

  /**
   * Deletes a single item from the user's shopping list by its ID.
   * @param {string} itemId The ID of the item to delete.
   */
  async deleteItem(itemId: string): Promise<void> {
    try {
      const currentList = await this.loadList();
      const itemToDelete = currentList.find((item) => item.id === itemId);
      if (itemToDelete) {
        await updateDoc(this.userDocRef, {
          shoppingList: arrayRemove(itemToDelete),
        });
      }
    } catch (error) {
      console.error("Error deleting item from shopping list:", error);
      throw error;
    }
  }
}
