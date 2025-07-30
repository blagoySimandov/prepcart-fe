import { StoreFilterModal } from "@/components/shared/store-filter-modal";
import { useCountryRestriction } from "@/src/hooks/use-country-restriction";
import {
  TYPESENSE_COLLECTION_NAME,
  searchClient,
} from "@/src/catalog-search/typesense-config";
import React from "react";
import { Configure, InstantSearch } from "react-instantsearch-core";
import { CatalogSearchContent } from "./components/catalog-search-content";
import { useCatalogStoreFilter } from "./hooks/use-catalog-store-filter";
import { RestrictedCatalogSearch } from "./restricted-catalog-search";
import { getTypesenseFilters } from "./utils/get-typesense-filters";

export default function CatalogSearchScreen() {
  const { isCatalogSearchAvailable, isLoading: isCheckingCountry } = useCountryRestriction();
  const {
    selectedStores,
    modalVisible,
    allStores,
    toggleStore,
    selectAllStores,
    clearAllStores,
    isLoading,
    openModal,
    closeModal,
  } = useCatalogStoreFilter();

  // Show loading while checking country restrictions
  if (isCheckingCountry) {
    return null; // or a loading spinner
  }

  // Show restricted version if catalog search is not available
  if (isCatalogSearchAvailable === false) {
    return <RestrictedCatalogSearch />;
  }

  const filters = getTypesenseFilters(selectedStores, allStores, isLoading);
  console.log(filters);
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
          filters={filters}
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
