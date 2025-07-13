export const getTypesenseFilters = (
  selectedStores: string[],
  allStores: string[],
) => {
  const now = Math.floor(Date.now() / 1000);

  const storeFilter =
    !selectedStores.length &&
    allStores.length > 0 &&
    allStores.length < selectedStores.length
      ? `(${allStores.map((storeId) => `storeId:=${storeId}`).join(" || ")})`
      : undefined;

  const filters = [
    `discount.valid_until:>${now}`,
    `discount.valid_from:<${now}`,
  ];

  const allFilters = [...filters, storeFilter].filter(Boolean);

  const filterBy = allFilters.join(" && ");

  return filterBy;
};
