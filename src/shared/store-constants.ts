/**
 * Shared mapping of store IDs to display names
 * Used by both catalog search and shopping list features
 */
export const STORE_NAMES: Record<string, string> = {
  "bila-bg": "Bila",
  "lidl-bg": "Lidl",
  "kaufland-bg": "Kaufland",
};

/**
 * Get a human-readable store name from a store ID
 * @param storeId - The store ID (e.g., "bila-bg", "lidl-bg")
 * @returns The human-readable store name or a formatted version if not found
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

/**
 * Get available store IDs
 * @returns Array of all available store IDs
 */
export const getAvailableStoreIds = (): string[] => {
  return Object.keys(STORE_NAMES);
};
