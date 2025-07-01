import { db } from "@/firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from "@react-native-firebase/firestore";
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
      if (docSnap.exists() && docSnap.data()?.shoppingList) {
        return docSnap.data()?.shoppingList as ShoppingItem[];
      } else {
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
        collection(db, "users", this.userId, "shoppingList"),
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
   * Adds a parsed item with enhanced metadata to Firestore.
   * @param {any} firestoreDocument The Firestore document from ItemParser.toFirestoreDocument().
   */
  async addParsedItem(firestoreDocument: any): Promise<void> {
    try {
      const newItemRef = doc(
        collection(db, "users", this.userId, "shoppingList"),
      );
      const newItem = { ...firestoreDocument, id: newItemRef.id };
      await updateDoc(this.userDocRef, {
        shoppingList: arrayUnion(newItem),
      });
    } catch (error) {
      console.error("Error adding parsed item to shopping list:", error);
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

  /**
   * Updates a single item in the user's shopping list.
   * @param {string} itemId The ID of the item to update.
   * @param {Partial<ShoppingItem>} updatedData The data to update.
   */
  async updateItem(
    itemId: string,
    updatedData: Partial<ShoppingItem>,
  ): Promise<void> {
    try {
      const currentList = await this.loadList();
      const itemIndex = currentList.findIndex((item) => item.id === itemId);
      if (itemIndex > -1) {
        currentList[itemIndex] = {
          ...currentList[itemIndex],
          ...updatedData,
        };
        await this.saveList(currentList);
      }
    } catch (error) {
      console.error("Error updating item in shopping list:", error);
      throw error;
    }
  }

  /**
   * Subscribes to real-time updates of the shopping list.
   * @param callback - Function to be called with the updated list.
   * @returns {() => void} An unsubscribe function.
   */
  onListUpdate(callback: (items: ShoppingItem[]) => void): () => void {
    const unsubscribe = onSnapshot(this.userDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data()?.shoppingList) {
        callback(docSnap.data()?.shoppingList as ShoppingItem[]);
      } else {
        callback([]);
      }
    });
    return unsubscribe;
  }

  /**
   * Subscribes to real-time updates of the shopping history.
   * @param callback - Function to be called with the history items.
   * @returns {() => void} An unsubscribe function.
   */
  onHistoryUpdate(callback: (items: ShoppingItem[]) => void): () => void {
    const historyCollectionRef = collection(
      db,
      "users",
      this.userId,
      "shoppingHistory",
    );
    const unsubscribe = onSnapshot(historyCollectionRef, (querySnapshot) => {
      const items = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as ShoppingItem,
      );
      callback(items);
    });
    return unsubscribe;
  }

  /**
   * Moves completed items from the active list to the history collection.
   * @param {ShoppingItem[]} completedItems - The items to archive.
   */
  async archiveCompletedItems(completedItems: ShoppingItem[]): Promise<void> {
    if (completedItems.length === 0) return;

    try {
      const batch = writeBatch(db);
      const historyCollectionRef = collection(
        db,
        "users",
        this.userId,
        "shoppingHistory",
      );

      // Add completed items to history and remove from active list
      completedItems.forEach((item) => {
        const historyDocRef = doc(historyCollectionRef, item.id);
        batch.set(historyDocRef, item);
        batch.update(this.userDocRef, {
          shoppingList: arrayRemove(item),
        });
      });

      await batch.commit();
    } catch (error) {
      console.error("Error archiving completed items:", error);
      throw error;
    }
  }
}
