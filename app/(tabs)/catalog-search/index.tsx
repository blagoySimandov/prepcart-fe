import {
  ALGOLIA_INDEX_NAME,
  searchClient,
} from "@/src/catalog-search/algolia-config";
import React from "react";
import { Configure, InstantSearch } from "react-instantsearch-core";
import { CatalogSearchContent } from "./components/catalog-search-content";

export default function CatalogSearchScreen() {
  const now = Math.floor(Date.now());

  const numericFilters = [`validUntil >= ${now}`, `validFrom <= ${now}`];

  return (
    <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
      <Configure
        highlightPreTag="<mark>"
        highlightPostTag="</mark>"
        hitsPerPage={20}
        numericFilters={numericFilters}
      />
      <CatalogSearchContent />
    </InstantSearch>
  );
}
