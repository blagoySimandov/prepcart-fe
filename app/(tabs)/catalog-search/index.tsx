import { StoreFilterModal } from "@/components/shared/store-filter-modal";
import {
  TYPESENSE_COLLECTION_NAME,
  searchClient,
} from "@/src/catalog-search/typesense-config";
import React from "react";
import { Configure, InstantSearch } from "react-instantsearch-core";
import { CatalogSearchContent } from "./components/catalog-search-content";
import { useCatalogStoreFilter } from "./hooks/use-catalog-store-filter";

export default function CatalogSearchScreen() {
  const now = Math.floor(Date.now()) / 1000;

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

  const numericFilters = [`validUntil:>${now}`, `validFrom:<${now}`];
  const storeFilter =
    !isLoading &&
    selectedStores.length > 0 &&
    selectedStores.length < allStores.length
      ? `(${selectedStores
          .map((storeId) => `storeId:=${storeId}`)
          .join(" || ")})`
      : undefined;

  return (
    <>
      <InstantSearch
        searchClient={searchClient}
        indexName={TYPESENSE_COLLECTION_NAME}
      >
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
