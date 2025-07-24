import { useState } from "react";

export function useFab() {
  const [importModalVisible, setImportModalVisible] = useState(false);

  const openImportModal = () => setImportModalVisible(true);
  const closeImportModal = () => setImportModalVisible(false);

  return {
    importModalVisible,
    openImportModal,
    closeImportModal,
  };
}
