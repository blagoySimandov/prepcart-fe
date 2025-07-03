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
    isLoading,
    toggleStore,
    selectAllStores,
    clearAllStores,
    openModal,
    closeModal,
  } = useCatalogStoreFilter();

  const numericFilters = [`validUntil >= ${now}`, `validFrom <= ${now}`];

  // Only apply store filters when stores are loaded and some are selected
  const storeFilter =
    !isLoading &&
    selectedStores.length > 0 &&
    selectedStores.length < allStores.length
      ? `(${selectedStores
          .map((storeId) => `storeId:${storeId}`)
          .join(" OR ")})`
      : undefined;

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
