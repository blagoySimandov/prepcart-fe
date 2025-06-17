/**
 * Mapping of store IDs to display names
 */
export const STORE_DISPLAY_NAMES: Record<string, string> = {
  "bila-bg": "BILA",
  "lidl-bg": "LIDL",
  "kaufland-bg": "KAUFLAND",
  "fantastico-bg": "FANTASTICO",
  "metro-bg": "METRO",
};

/**
 * Get display name for a store ID
 * @param storeId The store identifier
 * @returns The display name for the store
 */
export function getStoreName(storeId: string): string {
  return STORE_DISPLAY_NAMES[storeId] || storeId.toUpperCase();
}
