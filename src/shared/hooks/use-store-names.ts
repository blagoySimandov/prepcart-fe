import { useRemoteConfig } from "@/src/remote-config/context";
import { useCallback } from "react";

interface UseStoreNamesResult {
  storeNames: Record<string, string>;
  availableStoreIds: string[];
  isLoading: boolean;
  getStoreName: (storeId: string) => string;
}

export function useStoreNames(): UseStoreNamesResult {
  const { storeNames, isLoading } = useRemoteConfig();

  const getStoreName = useCallback(
    (storeId: string): string => {
      if (storeNames[storeId]) {
        return storeNames[storeId];
      }

      const baseStore = storeId.split("-")[0];
      if (storeNames[baseStore]) {
        return storeNames[baseStore];
      }

      return storeId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    [storeNames],
  );

  const availableStoreIds = Object.keys(storeNames);

  return {
    storeNames,
    availableStoreIds,
    isLoading,
    getStoreName,
  };
}
