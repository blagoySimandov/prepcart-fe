import { ShoppingItem } from "../user/shopping-list/types";
import {
  ApiMatchRequest,
  ApiMatchResponse,
  ApiShoppingItem,
  DiscountSearchResult,
  FindDiscountsResult,
  ProductCandidate,
} from "./types";

const DEFAULT_LANGUAGE = "BG";

/**
 * Service for fetching and matching product discounts using the Cloud Function API.
 */
export class DiscountService {
  private static readonly API_ENDPOINT =
    "https://matchshoppinglist-bwddpfl55a-ew.a.run.app";

  private static readonly DEFAULT_FIND_DISOUNTS_RETURN = {
    matches: [],
    unmatched_items: [],
    processing_time_ms: 0,
  };

  private static encodeToApiItem(item: ShoppingItem): ApiShoppingItem {
    return {
      item: item.name,
      quantity: item.quantity,
      unit: item.unit,
    };
  }
  private static constructMatchShoppingListRequest(
    items: ShoppingItem[],
    maxResultsPerItem: number,
    storeIds?: string[],
  ): ApiMatchRequest {
    const apiItems = items.map(DiscountService.encodeToApiItem);

    return {
      shopping_list: apiItems,
      max_results_per_item: maxResultsPerItem,
      discount_language: DEFAULT_LANGUAGE,
      ...(storeIds && storeIds.length > 0 && { store_ids: storeIds }),
    };
  }
  private static async callEndpoint(
    requestBody: ApiMatchRequest,
  ): Promise<ApiMatchResponse> {
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

    return response.json() as Promise<ApiMatchResponse>;
  }

  private static createShoppingItemMap(
    items: ShoppingItem[],
  ): Map<string, ShoppingItem> {
    const itemMap = new Map<string, ShoppingItem>();
    items.forEach((item) => {
      itemMap.set(item.name.toLowerCase(), item);
    });
    return itemMap;
  }

  private static normalizeProductCandidates(
    products: any[],
    confidenceScore: number,
  ): ProductCandidate[] {
    return products
      .map((p): ProductCandidate | null => {
        if (!p.id) {
          return null;
        }
        return {
          ...p,
          id: p.id,
          similarity_score: p.similarity_score ?? 0,
          requires_loyalty_card: p.requires_loyalty_card ?? false,
          confidence_score: confidenceScore,
        };
      })
      .filter((p): p is ProductCandidate => p !== null);
  }

  private static transformApiResponse(
    apiResponse: ApiMatchResponse,
    shoppingItemMap: Map<string, ShoppingItem>,
  ): DiscountSearchResult[] {
    return apiResponse.matches
      .map(
        (
          match: ApiMatchResponse["matches"][0],
        ): DiscountSearchResult | null => {
          const shoppingItem = shoppingItemMap.get(
            match.shopping_list_item.item.toLowerCase(),
          );

          if (!shoppingItem) {
            return null;
          }

          const matched_products = DiscountService.normalizeProductCandidates(
            match.matched_products,
            match.confidence_score,
          );

          return {
            shopping_list_item: shoppingItem,
            matched_products,
          };
        },
      )
      .filter(
        (m: DiscountSearchResult | null): m is DiscountSearchResult =>
          m !== null,
      );
  }

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
  ): Promise<FindDiscountsResult> {
    if (items.length === 0) return DiscountService.DEFAULT_FIND_DISOUNTS_RETURN;

    try {
      const requestBody: ApiMatchRequest =
        DiscountService.constructMatchShoppingListRequest(
          items,
          maxResultsPerItem,
          storeIds,
        );
      const apiResponse = await DiscountService.callEndpoint(requestBody);

      const shoppingItemMap = DiscountService.createShoppingItemMap(items);
      const matches = DiscountService.transformApiResponse(
        apiResponse,
        shoppingItemMap,
      );

      return {
        matches,
        unmatched_items: apiResponse.unmatched_items,
        processing_time_ms: apiResponse.processing_time_ms,
      };
    } catch (error) {
      console.error("Failed to fetch discounts from API:", error);
      throw error;
    }
  }
}
