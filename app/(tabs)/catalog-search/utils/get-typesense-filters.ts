const DAY_IN_SECONDS = 86400;
export const getTypesenseFilters = (
  selectedStores: string[],
  allStores: string[],
  isLoadingStores: boolean,
) => {
  //items are saved with 0 hours as valid_until. This means that we should actually check yesterday...
  const now = Math.floor(Date.now() / 1000) - DAY_IN_SECONDS;
  console.log(now);

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
