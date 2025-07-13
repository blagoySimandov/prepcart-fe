import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

export const TYPESENSE_HOST = "p8qx4bsv7e5hfrnwp-1.a1.typesense.net";

export const TYPESENSE_API_KEY = process.env.EXPO_PUBLIC_TYPESENSE_API_KEY;
export const TYPESENSE_COLLECTION_NAME = "products";

export const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: TYPESENSE_API_KEY || "",
    nodes: [
      {
        host: TYPESENSE_HOST,
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "discount.product_name",
    per_page: 20,
  },
});

export const searchClient = typesenseInstantsearchAdapter.searchClient;
