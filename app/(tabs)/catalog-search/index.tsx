import { StoreFilterModal } from "@/components/shared/store-filter-modal";
import {
  ALGOLIA_INDEX_NAME,
  searchClient,
} from "@/src/catalog-search/algolia-config";
import React from "react";
import { Configure, InstantSearch } from "react-instantsearch-core";
import { CatalogSearchContent } from "./components/catalog-search-content";
import { useCatalogStoreFilter } from "./hooks/use-catalog-store-filter";

export default function CatalogSearchScreen() {
  const now = Math.floor(Date.now());

  const {
    selectedStores,
    modalVisible,
    allStores,
    toggleStore,
    selectAllStores,
    clearAllStores,
    openModal,
    closeModal,
  } = useCatalogStoreFilter();

  const numericFilters = [`validUntil >= ${now}`, `validFrom <= ${now}`];

  const storeFilter = `(${selectedStores
    .map((storeId) => `storeId:${storeId}`)
    .join(" OR ")})`;

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
        <Configure
          highlightPreTag="<mark>"
          highlightPostTag="</mark>"
          hitsPerPage={20}
          numericFilters={numericFilters}
          filters={storeFilter}
        />
        <CatalogSearchContent onOpenStoreFilter={openModal} />
      </InstantSearch>

      <StoreFilterModal
        visible={modalVisible}
        onClose={closeModal}
        selectedStores={selectedStores}
        allStores={allStores}
        onStoreToggle={toggleStore}
        onSelectAll={selectAllStores}
        onClearAll={clearAllStores}
      />
    </>
  );
}
