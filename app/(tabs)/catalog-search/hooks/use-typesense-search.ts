import {
  TypesenseHit,
  decodeProductCandidates,
} from "@/src/catalog-search/types";
import { remoteConfigService } from "@/src/remote-config";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import { useInfiniteHits, useSearchBox } from "react-instantsearch-core";

const DEBOUNCE_TIME = remoteConfigService.debounceTime();

export function useTypesenseSearch() {
  const { query, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);

  const { items, isLastPage, showMore, sendEvent } = useInfiniteHits({
    escapeHTML: false,
  });

  const results = useMemo(() => {
    const decoded = decodeProductCandidates(items as unknown as TypesenseHit[]);
    return decoded;
  }, [items]);

  const debouncedRefine = useMemo(
    () =>
      debounce((text: string) => {
        refine(text);
      }, DEBOUNCE_TIME),
    [refine],
  );

  const handleInputChange = (text: string) => {
    setInputValue(text);
    debouncedRefine(text);
  };

  const handleLoadMore = () => {
    if (!isLastPage) {
      showMore();
    }
  };

  const handleResultClick = (productId: string) => {
    const typesenseHit = items.find(
      (item) => item.objectID === productId || item.id === productId,
    );
    if (typesenseHit) {
      sendEvent("click", typesenseHit, "Product Clicked");
    } else {
    }
  };

  useEffect(() => {}, [inputValue, query, results.length, items.length]);

  return {
    query: inputValue,
    results,
    loading: false,
    handleInputChange,
    handleLoadMore,
    isLastPage,
    handleResultClick,
  };
}
