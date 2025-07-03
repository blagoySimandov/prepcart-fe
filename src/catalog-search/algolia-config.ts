import { liteClient as algoliasearch } from "algoliasearch/lite";

// Algolia configuration
export const ALGOLIA_APP_ID = "T4UOWXSOVE";
export const ALGOLIA_SEARCH_API_KEY = "217922da351a0c5f8542b3cfad2dbb51";
export const ALGOLIA_INDEX_NAME = "discounted_products";

// Create the search client
export const searchClient = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_API_KEY
);
