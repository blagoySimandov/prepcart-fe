import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ImportRecipeModal } from "../import-recipe-modal";
import { useFab } from "./hooks";
import { useFabStyles } from "./styles";

interface FabProps {
  onImport: (url: string) => void;
}

export function Fab({ onImport }: FabProps) {
  const { styles, colors } = useFabStyles();
  const { importModalVisible, openImportModal, closeImportModal } = useFab();

  return (
    <>
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.tint }]}
        onPress={openImportModal}
        activeOpacity={0.8}>
        <MaterialIcons name="add" size={24} color={colors.buttonText} />
      </TouchableOpacity>

      <ImportRecipeModal
        visible={importModalVisible}
        onClose={closeImportModal}
        onImport={onImport}
      />
    </>
  );
}
