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

  const results = useMemo(() => {
    return decodeProductCandidates(items as AlgoliaHit[]);
  }, [items]);

  const handleInputChange = (text: string) => {
    refine(text);
  };

  const handleLoadMore = () => {
    if (!isLastPage) {
      showMore();
    }
  };

  const handleResultClick = (productId: string) => {
    const algoliaHit = items.find((item) => item.objectID === productId);
    if (algoliaHit) {
      sendEvent("click", algoliaHit, "Product Clicked");
    }
  };

  return {
    query,
    results,
    loading: false,
    handleInputChange,
    handleLoadMore,
    isLastPage,
    handleResultClick,
  };
}
