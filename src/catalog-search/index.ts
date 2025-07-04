import { searchClient } from "./algolia-config";
import {
  decodeProductCandidates,
  ProductCandidate,
  ProductCandidateApiResponse,
} from "./types";

export class CatalogService {
  /**
   * Search for products using Algolia
   * @param query - The search query
   * @param page - The page number (1-based)
   * @returns Promise<ProductCandidate[]>
   */
  static async search(
    query: string,
    page: number = 1
  ): Promise<ProductCandidate[]> {
    try {
      const params = new URLSearchParams({
        query,
        page: (page - 1).toString(),
        hitsPerPage: "20",
        highlightPreTag: "<mark>",
        highlightPostTag: "</mark>",
      }).toString();

      const response = await searchClient.search({
        requests: [
          {
            indexName: "discounted_products",
            params,
          },
        ],
      });

      const results = response.results[0];
      if ("hits" in results) {
        const apiResponse = {
          results: results.hits as ProductCandidateApiResponse[],
        };
        return decodeProductCandidates(apiResponse.results);
      }

      return [];
    } catch (error) {
      console.error("Algolia search error:", error);
      throw error;
    }
  }
}

// Re-export types for convenience
export * from "./algolia-config";
export * from "./types";
