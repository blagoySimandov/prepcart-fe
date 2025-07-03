/**
 * Map of store IDs to human-readable store names
 */
export const STORE_NAMES: Record<string, string> = {
  "bila-bg": "Bila",
  "lidl-bg": "Lidl Bulgaria",
  "kaufland-bg": "Kaufland Bulgaria",
  "fantastico-bg": "Fantastico",
  "t-market-bg": "T-Market",
  "metro-bg": "Metro Bulgaria",
  "carrefour-bg": "Carrefour Bulgaria",
  "billa-bg": "Billa Bulgaria",
};

/**
 * Get a human-readable store name from a store ID
 * @param storeId - The store ID (e.g., "bila-bg", "lidl-bg")
 * @returns The human-readable store name or the original ID if not found
 */
export const getStoreName = (storeId: string): string => {
  if (STORE_NAMES[storeId]) {
    return STORE_NAMES[storeId];
  }

  const baseStore = storeId.split("-")[0];
  if (STORE_NAMES[baseStore]) {
    return STORE_NAMES[baseStore];
  }

  return storeId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
