// Raw API response type (now from Typesense/Algolia)
export interface ProductCandidateApiResponse {
  id: string;
  objectID?: string; // Algolia uses objectID
  country: string;
  storeId: string;
  "discount.product_name": string;
  "discount.price_before_discount_local": number;
  "discount.discount_percent": number;
  "discount.page_number": number;
  "discount.validFrom": number;
  "discount.validUntil": number;
  "discount.requires_loyalty_card": boolean;
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
  validFrom: number;
  validUntil: number;
  requiresLoyaltyCard: boolean;
  sourceFileUri: string;
  _highlightResult?: any;
  _snippetResult?: any;
}

// Type for Algolia search hit (extends ProductCandidateApiResponse)
export interface AlgoliaHit extends ProductCandidateApiResponse {
  __position?: number;
  __queryID?: string;
}

// Type for Typesense search hit - has nested discount object
export interface TypesenseHit {
  id: string;
  objectID?: string;
  country: string;
  storeId: string;
  discount: {
    product_name: string;
    price_before_discount_local: number;
    discount_percent: number;
    page_number: number;
    requires_loyalty_card: boolean;
  };
  validFrom: number;
  validUntil: number;
  sourceFileUri?: string;
  _highlightResult?: any;
  _snippetResult?: any;
  text_match?: any;
  text_match_info?: any;
  highlights?: any;
}

// Decoder function to map API response to frontend type
export function decodeProductCandidate(
  apiResponse: ProductCandidateApiResponse | AlgoliaHit | TypesenseHit
): ProductCandidate {
  // Check if this is a Typesense hit with nested discount object
  if ("discount" in apiResponse && typeof apiResponse.discount === "object") {
    const typesenseHit = apiResponse as TypesenseHit;
    return {
      id: typesenseHit.id,
      objectID: typesenseHit.objectID || typesenseHit.id,
      country: typesenseHit.country,
      storeId: typesenseHit.storeId,
      productName: typesenseHit.discount.product_name,
      priceBeforeDiscount: typesenseHit.discount.price_before_discount_local,
      discountPercent: typesenseHit.discount.discount_percent,
      pageNumber: typesenseHit.discount.page_number,
      validFrom: typesenseHit.validFrom,
      validUntil: typesenseHit.validUntil,
      requiresLoyaltyCard: typesenseHit.discount.requires_loyalty_card,
      sourceFileUri: typesenseHit.sourceFileUri || "",
      _highlightResult: typesenseHit._highlightResult,
      _snippetResult: typesenseHit._snippetResult,
    };
  }

  // Handle Algolia format (flat with dot notation)
  const algoliaHit = apiResponse as ProductCandidateApiResponse | AlgoliaHit;
  return {
    id: algoliaHit.id,
    objectID: algoliaHit.objectID || algoliaHit.id,
    country: algoliaHit.country,
    storeId: algoliaHit.storeId,
    productName: algoliaHit["discount.product_name"],
    priceBeforeDiscount: algoliaHit["discount.price_before_discount_local"],
    discountPercent: algoliaHit["discount.discount_percent"],
    pageNumber: algoliaHit["discount.page_number"],
    validFrom: algoliaHit["discount.validFrom"],
    validUntil: algoliaHit["discount.validUntil"],
    requiresLoyaltyCard: algoliaHit["discount.requires_loyalty_card"],
    sourceFileUri: algoliaHit.sourceFileUri || "",
    _highlightResult: algoliaHit._highlightResult,
    _snippetResult: algoliaHit._snippetResult,
  };
}

// Helper function to decode an array of API responses
export function decodeProductCandidates(
  apiResponses: (ProductCandidateApiResponse | AlgoliaHit | TypesenseHit)[]
): ProductCandidate[] {
  return apiResponses.map(decodeProductCandidate);
}
