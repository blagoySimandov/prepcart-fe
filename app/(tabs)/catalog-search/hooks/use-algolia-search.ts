import {
  AlgoliaHit,
  decodeProductCandidates,
} from "@/src/catalog-search/types";
import { useMemo } from "react";
import { useInfiniteHits, useSearchBox } from "react-instantsearch-core";

export function useAlgoliaSearch() {
  // Use InstantSearch hooks
  const { query, refine } = useSearchBox();
  const { items, isLastPage, showMore, sendEvent } = useInfiniteHits({
    escapeHTML: false,
  });

  // Transform Algolia hits to ProductCandidate format
  const results = useMemo(() => {
    return decodeProductCandidates(items as AlgoliaHit[]);
  }, [items]);

  // Handle input changes
  const handleInputChange = (text: string) => {
    refine(text);
  };

  // Handle loading more results
  const handleLoadMore = () => {
    if (!isLastPage) {
      showMore();
    }
  };

  // Send click event for analytics
  const handleResultClick = (productId: string) => {
    const algoliaHit = items.find((item) => item.objectID === productId);
    if (algoliaHit) {
      sendEvent("click", algoliaHit, "Product Clicked");
    }
  };

  return {
    query,
    results,
    loading: false, // InstantSearch handles loading states internally
    handleInputChange,
    handleLoadMore,
    isLastPage,
    handleResultClick,
  };
}
