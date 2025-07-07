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
  currencyLocal: string;
  sourceFileUri: string;
  _highlightResult?: any;
  _snippetResult?: any;
}

export interface TypesenseHit {
  id: string;
  objectID?: string;
  country: string;
  storeId: string;
  discount: {
    product_name: string;
    price_before_discount_local: number;
    currency_local: string;
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

export function decodeProductCandidate(
  apiResponse: TypesenseHit,
): ProductCandidate {
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
    currencyLocal: typesenseHit.discount.currency_local,
    validFrom: typesenseHit.validFrom,
    validUntil: typesenseHit.validUntil,
    requiresLoyaltyCard: typesenseHit.discount.requires_loyalty_card,
    sourceFileUri: typesenseHit.sourceFileUri || "",
    _highlightResult: typesenseHit._highlightResult,
    _snippetResult: typesenseHit._snippetResult,
  };
}

export function decodeProductCandidates(
  apiResponses: TypesenseHit[],
): ProductCandidate[] {
  return apiResponses.map(decodeProductCandidate);
}
