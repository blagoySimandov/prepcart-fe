import { ShoppingItem } from "../user/shopping-list/types";
import {
  FindDiscountsResponse,
  MatchShoppingListRequest,
  MatchShoppingListResponse,
  MatchedProduct,
  ProductCandidate,
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
    maxResultsPerItem: number = 5,
    storeIds?: string[],
  ): Promise<FindDiscountsResponse> {
    if (items.length === 0) {
      return {
        matches: [],
        unmatched_items: [],
        processing_time_ms: 0,
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
        ...(storeIds && storeIds.length > 0 && { store_ids: storeIds }),
      };

      const response = await fetch(DiscountService.API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`,
        );
      }

      const data: MatchShoppingListResponse = await response.json();
      console.log("data", data.matches[0].matched_products);

      const itemNameToShoppingItem = new Map<string, ShoppingItem>();
      items.forEach((item) => {
        itemNameToShoppingItem.set(item.name.toLowerCase(), item);
      });

      const matches: MatchedProduct[] = data.matches
        .map((match): MatchedProduct | null => {
          const shoppingItem = itemNameToShoppingItem.get(
            match.shopping_list_item.item.toLowerCase(),
          );

          if (!shoppingItem) {
            return null;
          }

          const matched_products: ProductCandidate[] = match.matched_products
            .map((p): ProductCandidate | null => {
              if (!p.id) {
                return null;
              }
              return {
                ...p,
                id: p.id,
                similarity_score: p.similarity_score ?? 0,
                quantity: p.quantity_multiplier?.toString() ?? "",
                requires_loyalty_card: p.requires_loyalty_card ?? false,
                confidence_score: match.confidence_score,
                is_exact_match: match.is_exact_match,
              };
            })
            .filter((p): p is ProductCandidate => p !== null);

          return {
            shopping_list_item: shoppingItem,
            matched_products,
          };
        })
        .filter((m): m is MatchedProduct => m !== null);

      return {
        matches,
        unmatched_items: data.unmatched_items,
        processing_time_ms: data.processing_time_ms,
      };
    } catch (error) {
      console.error("Failed to fetch discounts from API:", error);
      throw error;
    }
  }
}
