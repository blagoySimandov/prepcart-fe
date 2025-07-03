import { remoteConfigService } from "@/src/remote-config";
import { useCallback, useEffect, useState } from "react";

interface UseStoreNamesResult {
  storeNames: Record<string, string>;
  availableStoreIds: string[];
  isLoading: boolean;
  getStoreName: (storeId: string) => string;
  refetch: () => Promise<void>;
}

export function useStoreNames(): UseStoreNamesResult {
  const [storeNames, setStoreNames] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchStoreNames = useCallback(async () => {
    try {
      setIsLoading(true);
      await remoteConfigService.initialize();
      const names = remoteConfigService.getStoreNames();
      setStoreNames(names);
    } catch (error) {
      console.error("Error fetching store names from remote config:", error);
      // Remote config should always have defaults, but in case of complete failure
      setStoreNames({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStoreNames();
  }, [fetchStoreNames]);

  const getStoreName = useCallback((storeId: string): string => {
    return remoteConfigService.getStoreName(storeId);
  }, []);

  const availableStoreIds = Object.keys(storeNames);

  return {
    storeNames,
    availableStoreIds,
    isLoading,
    getStoreName,
    refetch: fetchStoreNames,
  };
}
