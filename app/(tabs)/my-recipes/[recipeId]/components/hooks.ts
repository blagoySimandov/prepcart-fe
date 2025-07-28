import { useState } from "react";

export function useDetailModal() {
  const [showDetail, setShowDetail] = useState(false);

  const openModal = () => setShowDetail(true);
  const closeModal = () => setShowDetail(false);

  return {
    isVisible: showDetail,
    open: openModal,
    close: closeModal,
  };
}