export const getTypesenseFilters = (
  selectedStores: string[],
  allStores: string[],
  isLoadingStores: boolean,
) => {
  const now = Math.floor(Date.now() / 1000);

  const storeFilter =
    !isLoadingStores ||
    (allStores.length > 0 && allStores.length < selectedStores.length)
      ? `storeId:=[${selectedStores}]`
      : undefined;

  const filters = [
    `discount.valid_until:>${now}`,
    `discount.valid_from:<${now}`,
  ];

  const allFilters = [...filters, storeFilter].filter(Boolean);

  const filterBy = allFilters.join(" && ");

  return filterBy;
};
