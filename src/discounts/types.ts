/**
 * Represents a single discounted product found in a store's brochure.
 */
export interface Discount {
  product_name: string;
  discount_percent: number;
  price_before_discount_eur: number;
  price_before_discount_local: number;
  currency_local: string;
  page_number: number;
  // Store information (can be derived from document ID or added manually)
  store_name?: string;
  store_id?: string;
  // We can add a 'brochureId' if we want to track the source
}

/**
 * Represents the structure of a document in the 'pdfAnalysisResults' collection.
 */
export interface PdfAnalysisResult {
  id: string;
  store_name?: string; // Optional store name at document level
  extractedData: {
    discounted_products: Discount[];
  };
}
