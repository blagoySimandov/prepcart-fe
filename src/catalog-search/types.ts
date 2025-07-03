// Raw API response type (now from Algolia)
export interface ProductCandidateApiResponse {
  id: string;
  objectID: string;
  country: string;
  storeId: string;
  "discount.product_name": string;
  "discount.price_before_discount_local": number;
  "discount.discount_percent": number;
  "discount.page_number": number;
  _highlightResult?: any;
  _snippetResult?: any;
  archivedAt?: number;
  lastmodified?: any;
  path?: string;
  sourceFileUri?: string;
}

// Clean frontend type
export interface ProductCandidate {
  id: string;
  objectID: string;
  country: string;
  storeId: string;
  productName: string;
  priceBeforeDiscount: number;
  discountPercent: number;
  pageNumber: number;
  sourceFileUri: string;
  _highlightResult?: any;
  _snippetResult?: any;
}

// Type for Algolia search hit (extends ProductCandidateApiResponse)
export interface AlgoliaHit extends ProductCandidateApiResponse {
  __position?: number;
  __queryID?: string;
}

// Decoder function to map API response to frontend type
export function decodeProductCandidate(
  apiResponse: ProductCandidateApiResponse | AlgoliaHit
): ProductCandidate {
  return {
    id: apiResponse.id,
    objectID: apiResponse.objectID,
    country: apiResponse.country,
    storeId: apiResponse.storeId,
    productName: apiResponse["discount.product_name"],
    priceBeforeDiscount: apiResponse["discount.price_before_discount_local"],
    discountPercent: apiResponse["discount.discount_percent"],
    pageNumber: apiResponse["discount.page_number"],
    sourceFileUri: apiResponse.sourceFileUri || "",
    _highlightResult: apiResponse._highlightResult,
    _snippetResult: apiResponse._snippetResult,
  };
}

// Helper function to decode an array of API responses
export function decodeProductCandidates(
  apiResponses: (ProductCandidateApiResponse | AlgoliaHit)[]
): ProductCandidate[] {
  return apiResponses.map(decodeProductCandidate);
}
