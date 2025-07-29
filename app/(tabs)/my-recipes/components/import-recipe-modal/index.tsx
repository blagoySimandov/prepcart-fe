import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStyles } from "./styles";
import { ImportRecipeModalProps } from "./types";
import { useImportRecipeModal } from "./hooks";
import { IMPORT_RECIPE_MODAL_STRINGS } from "./constants";

export function ImportRecipeModal({
  visible,
  onClose,
  onImport,
}: ImportRecipeModalProps) {
  const { styles, colors } = useStyles();
  const {
    url,
    setUrl,
    isLoading,
    handleImport,
    handleClose,
  } = useImportRecipeModal(onImport, onClose);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>
              {IMPORT_RECIPE_MODAL_STRINGS.title}
            </ThemedText>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}>
              <MaterialIcons name="close" size={24} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.descriptionText}>
            {IMPORT_RECIPE_MODAL_STRINGS.description}
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder={IMPORT_RECIPE_MODAL_STRINGS.placeholder}
            placeholderTextColor={colors.icon}
            value={url}
            onChangeText={setUrl}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              disabled={isLoading}>
              <Text style={styles.buttonText}>
                {IMPORT_RECIPE_MODAL_STRINGS.cancelButton}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.importButton,
                isLoading && styles.disabledButton,
              ]}
              onPress={handleImport}
              disabled={isLoading}>
              <Text style={styles.buttonText}>
                {isLoading 
                  ? IMPORT_RECIPE_MODAL_STRINGS.importingButton 
                  : IMPORT_RECIPE_MODAL_STRINGS.importButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}