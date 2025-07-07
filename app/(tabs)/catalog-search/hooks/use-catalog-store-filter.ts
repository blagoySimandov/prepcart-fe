import { useStoreNames } from "@/src/shared/hooks/use-store-names";
import { useOnceAsync } from "@/src/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";

const STORAGE_KEY = "catalog_selected_stores";

export function useCatalogStoreFilter() {
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { availableStoreIds, isLoading: isLoadingStoreNames } = useStoreNames();
  const totalStores = availableStoreIds.length;

  useOnceAsync(async () => {
    if (availableStoreIds.length === 0) return;

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedStores = JSON.parse(stored);
        const validStores = parsedStores.filter((id: string) =>
          availableStoreIds.includes(id),
        );
        setSelectedStores(validStores);
      } else {
        setSelectedStores(availableStoreIds);
      }
    } catch (error) {
      console.error("Error loading selected stores:", error);
      setSelectedStores(availableStoreIds);
    }
  }, availableStoreIds.length > 0);

  const saveSelectedStores = async (stores: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
    } catch (error) {
      console.error("Error saving selected stores:", error);
    }
  };

  const toggleStore = useCallback((storeId: string) => {
    setSelectedStores((prev) => {
      const newStores = prev.includes(storeId)
        ? prev.filter((id) => id !== storeId)
        : [...prev, storeId];
      saveSelectedStores(newStores);
      return newStores;
    });
  }, []);

  const selectAllStores = useCallback(() => {
    setSelectedStores(availableStoreIds);
    saveSelectedStores(availableStoreIds);
  }, [availableStoreIds]);

  const clearAllStores = useCallback(() => {
    setSelectedStores([]);
    saveSelectedStores([]);
  }, []);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return {
    selectedStores,
    modalVisible,
    allStores: availableStoreIds,
    totalStores,
    isLoading: isLoadingStoreNames,
    toggleStore,
    selectAllStores,
    clearAllStores,
    openModal,
    closeModal,
  };
}
