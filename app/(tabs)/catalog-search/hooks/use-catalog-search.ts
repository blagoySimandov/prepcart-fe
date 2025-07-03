import { analytics } from "@/firebaseConfig";
import { CatalogService } from "@/src/catalog-search";
import { ProductCandidate } from "@/src/catalog-search/types";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useCatalogSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductCandidate[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.length > 2) {
      setLoading(true);
      try {
        analytics.logSearch({ search_term: searchQuery });
        const searchResults = await CatalogService.search(searchQuery);
        console.log("Search results:", searchResults);
        setResults(searchResults);
        if (searchResults.length === 0) {
          analytics.logEvent("search_no_results", {
            search_term: searchQuery,
          });
        }
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  }, []);

  const debouncedSearch = useMemo(() => debounce(search, 500), [search]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  return { query, results, loading, handleInputChange, setResults };
}
