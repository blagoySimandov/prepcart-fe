import { ShoppingItem } from "../user/shopping-list/types";
import {
  Discount,
  DiscountMatch,
  MatchShoppingListRequest,
  MatchShoppingListResponse,
  ShoppingListApiItem,
} from "./types";

const DEFAULT_LANGUAGE = "BG";

/**
 * Service for fetching and matching product discounts using the Cloud Function API.
 */
export class DiscountService {
  private static readonly API_ENDPOINT =
    "https://matchshoppinglist-bwddpfl55a-ew.a.run.app";

  /**
   * Finds discounts for a list of shopping items using the Cloud Function API.
   * @param items The user's shopping list items.
   * @param maxResultsPerItem Maximum number of discount matches per item (default: 5).
   * @returns A Map where the key is the shopping item's ID and the value is an array of matching discounts.
   */
  public async findDiscountsForItems(
    items: ShoppingItem[],
    maxResultsPerItem: number = 5
  ): Promise<{
    itemDiscounts: Map<string, Discount[]>;
    totalSavings: Record<string, number>;
    unmatchedItems: string[];
    matches: DiscountMatch[];
  }> {
    const itemDiscounts = new Map<string, Discount[]>();

    if (items.length === 0) {
      return {
        itemDiscounts,
        totalSavings: {},
        unmatchedItems: [],
        matches: [],
      };
    }

    try {
      const apiItems: ShoppingListApiItem[] = items.map((item) => ({
        item: item.name,
        quantity: item.quantity || 1,
        unit: item.unit,
      }));

      const requestBody: MatchShoppingListRequest = {
        shopping_list: apiItems,
        max_results_per_item: maxResultsPerItem,
        discount_language: DEFAULT_LANGUAGE,
      };

      console.log("Calling discount API with:", requestBody);

      const response = await fetch(DiscountService.API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      const data: MatchShoppingListResponse = await response.json();

      console.log("Discount API response:", data);

      const itemNameToShoppingItem = new Map<string, ShoppingItem>();
      items.forEach((item) => {
        itemNameToShoppingItem.set(item.name.toLowerCase(), item);
      });

      for (const match of data.matches) {
        if (match.matched_products && match.matched_products.length > 0) {
          const shoppingItem = itemNameToShoppingItem.get(
            match.shopping_list_item.item.toLowerCase()
          );
          if (shoppingItem) {
            const existingDiscounts = itemDiscounts.get(shoppingItem.id) || [];
            for (const product of match.matched_products) {
              if (product.discount_percent > 0) {
                existingDiscounts.push(product);
              }
            }
            itemDiscounts.set(shoppingItem.id, existingDiscounts);
          }
        }
      }

      return {
        itemDiscounts,
        totalSavings: data.total_potential_savings_by_currency,
        unmatchedItems: data.unmatched_items,
        matches: data.matches,
      };
    } catch (error) {
      console.error("Failed to fetch discounts from API:", error);
      throw error;
    }
  }
}
