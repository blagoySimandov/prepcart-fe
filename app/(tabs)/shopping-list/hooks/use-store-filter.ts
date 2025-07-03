import { getAvailableStoreIds } from "@/src/shared/store-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "shopping_list_selected_stores";

export function useStoreFilter() {
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const allStores = getAvailableStoreIds();
  const totalStores = allStores.length;

  useEffect(() => {
    loadSelectedStores();
  }, []);

  const loadSelectedStores = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedStores = JSON.parse(stored);
        setSelectedStores(parsedStores);
      } else {
        setSelectedStores(allStores);
      }
    } catch (error) {
      console.error("Error loading selected stores:", error);
      setSelectedStores(allStores);
    }
  };

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
    setSelectedStores(allStores);
    saveSelectedStores(allStores);
  }, [allStores]);

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
    allStores,
    totalStores,
    toggleStore,
    selectAllStores,
    clearAllStores,
    openModal,
    closeModal,
  };
}
