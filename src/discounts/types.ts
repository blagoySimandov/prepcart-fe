/**
 * Represents a single discount for a product.
 * This is the canonical discount object used throughout the app.
 */
export interface Discount {
  id?: string;
  product_name: string;
  store_id: string;
  country: string;
  discount_percent: number;
  price_before_discount_local: number;
  currency_local: string;
  page_number: number;
  similarity_score?: number;
}

/**
 * Represents a shopping list item for the Cloud Function API
 */
export interface ShoppingListApiItem {
  item: string;
  quantity: number;
  unit: string;
}

/**
 * Request structure for the matchShoppingList Cloud Function
 */
export interface MatchShoppingListRequest {
  shopping_list: ShoppingListApiItem[];
  country?: string;
  store_ids?: string[];
  max_results_per_item?: number;
  discount_language?: string;
}

/**
 * Individual match result from the Cloud Function
 */
export interface DiscountMatch {
  shopping_list_item: ShoppingListApiItem;
  matched_products: Discount[];
  confidence_score: number;
  match_reasoning: string;
  is_exact_match: boolean;
}

/**
 * Response structure from the matchShoppingList Cloud Function
 */
export interface MatchShoppingListResponse {
  matches: DiscountMatch[];
  unmatched_items: string[];
  total_potential_savings_by_currency: Record<string, number>;
  processing_time_ms: number;
}

/**
 * represents a discount object enriched with its vector embedding and store info.
 * this is the final structure that will be stored in the 'discountembeddings' collection.
 */
export interface EmbeddedDiscount extends Discount {
  id: string; // composite id, e.g., "pdfanalysisdocid_productindex"
  store_id: string; // e.g., 'lidl_de', 'kaufland_bg'
  store_name?: string; // e.g., 'lidl germany'
  product_name_embedding: number[]; // vector representation of the product name
}

/**
 * Represents the structure of a document in the 'pdfAnalysisResults' collection.
 */
export interface PdfAnalysisResult {
  id: string;
  store_id: string;
  store_name?: string;
  archived_at?: Date | null;
  extractedData: {
    discounted_products: Discount[];
  };
}

export interface ShoppingListMatch {
  shopping_list_item: string;
  matched_products: Discount[];
}
