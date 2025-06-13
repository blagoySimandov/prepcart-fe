import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ShoppingItem } from "../user/shopping-list/types";
import { Discount } from "./types";

/**
 * Service for fetching and matching product discounts from Firestore.
 */
export class DiscountService {
  private allDiscounts: Discount[] = [];
  private hasLoadedDiscounts = false;

  /**
   * Loads all available discounts from the 'pdfAnalysisResults' collection in Firestore.
   * This method is designed to be called explicitly by the user and will only fetch
   * data from Firestore once per session.
   * @returns {Promise<void>}
   */
  public async loadAllDiscounts(): Promise<void> {
    if (this.hasLoadedDiscounts) {
      console.log("Discounts have already been loaded.");
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, "pdfAnalysisResults"));
      const discounts: Discount[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as any; // Using any to be safe with nested structure
        if (data.extractedData && data.extractedData.discounted_products) {
          discounts.push(...data.extractedData.discounted_products);
        }
      });
      this.allDiscounts = discounts;
      this.hasLoadedDiscounts = true;
    } catch (error) {
      console.error("Error loading all discounts:", error);
      throw error; // Re-throw to allow UI to handle it
    }
  }

  /**
   * Finds matching discounts for a given list of shopping items.
   * @param shoppingList - An array of items from the user's shopping list.
   * @returns A Map where the key is the shopping item's ID and the value is an array of matching discounts.
   */
  public findDiscountsForItems(
    shoppingList: ShoppingItem[]
  ): Map<string, Discount[]> {
    const itemDiscounts = new Map<string, Discount[]>();

    if (this.allDiscounts.length === 0) {
      return itemDiscounts;
    }

    shoppingList.forEach((item) => {
      const matches: Discount[] = [];
      const itemNameLower = item.name.toLowerCase();

      this.allDiscounts.forEach((discount) => {
        // Simple matching logic: check if the shopping list item name is a substring
        // of the discounted product name. This can be improved with fuzzy search.
        if (discount.product_name.toLowerCase().includes(itemNameLower)) {
          matches.push(discount);
        }
      });

      if (matches.length > 0) {
        itemDiscounts.set(item.id, matches);
      }
    });

    return itemDiscounts;
  }
}
