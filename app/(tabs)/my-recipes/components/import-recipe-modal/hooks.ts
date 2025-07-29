import { useState } from "react";
import { Alert } from "react-native";
import { IMPORT_RECIPE_MODAL_STRINGS } from "./constants";

export function useImportRecipeModal(
  onImport: (url: string) => void,
  onClose: () => void
) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    if (!url.trim()) {
      Alert.alert("Error", IMPORT_RECIPE_MODAL_STRINGS.errors.emptyUrl);
      return;
    }

    if (!url.includes("tiktok.com")) {
      Alert.alert("Error", IMPORT_RECIPE_MODAL_STRINGS.errors.invalidUrl);
      return;
    }

    setIsLoading(true);
    try {
      await onImport(url.trim());
      setUrl("");
      onClose();
    } catch {
      Alert.alert("Error", IMPORT_RECIPE_MODAL_STRINGS.errors.importFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUrl("");
    onClose();
  };

  return {
    url,
    setUrl,
    isLoading,
    handleImport,
    handleClose,
  };
}