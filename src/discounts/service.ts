import { ShoppingItem } from "../user/shopping-list/types";
import {
  Discount,
  DiscountMatch,
  MatchShoppingListRequest,
  MatchShoppingListResponse,
  ShoppingListApiItem,
} from "./types";

/**
 * Service for fetching and matching product discounts using the Cloud Function API.
 */
export class DiscountService {
  private static readonly API_ENDPOINT =
    "https://europe-west1-prepcart-prod.cloudfunctions.net/matchShoppingList";

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
      // Convert shopping items to API format
      const apiItems: ShoppingListApiItem[] = items.map((item) => ({
        item: item.name,
        quantity: parseInt(item.quantity) || 1,
        notes: item.category !== "Other" ? item.category : undefined,
      }));

      const requestBody: MatchShoppingListRequest = {
        shopping_list: apiItems,
        max_results_per_item: maxResultsPerItem,
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

      // Create a map from item name to shopping item for quick lookup
      const itemNameToShoppingItem = new Map<string, ShoppingItem>();
      items.forEach((item) => {
        itemNameToShoppingItem.set(item.name.toLowerCase(), item);
      });

      // Process matches and group by shopping item ID
      data.matches.forEach((match) => {
        const shoppingItem = itemNameToShoppingItem.get(
          match.shopping_list_item.toLowerCase()
        );
        if (shoppingItem) {
          const existingDiscounts = itemDiscounts.get(shoppingItem.id) || [];
          existingDiscounts.push(match.matched_product);
          itemDiscounts.set(shoppingItem.id, existingDiscounts);
        }
      });

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

  /**
   * Legacy method for backward compatibility.
   * @deprecated Use findDiscountsForItems instead.
   */
  public async loadAllDiscounts(): Promise<void> {
    console.warn(
      "loadAllDiscounts is deprecated. Use findDiscountsForItems instead."
    );
    // No-op for backward compatibility
  }

  /**
   * Legacy method for backward compatibility.
   * @deprecated Use findDiscountsForItems instead.
   */
  public findDiscountsForItemsSync(
    shoppingList: ShoppingItem[]
  ): Map<string, Discount[]> {
    console.warn(
      "findDiscountsForItemsSync is deprecated. Use findDiscountsForItems instead."
    );
    return new Map();
  }

  /**
   * Legacy method for backward compatibility.
   * @deprecated Use findDiscountsForItems instead.
   */
  public async findDiscountsWithVectorSearch(
    items: ShoppingItem[],
    nearbyStoreIds: string[]
  ): Promise<Map<string, Discount[]>> {
    console.warn(
      "findDiscountsWithVectorSearch is deprecated. Use findDiscountsForItems instead."
    );
    const result = await this.findDiscountsForItems(items);
    return result.itemDiscounts;
  }
}
