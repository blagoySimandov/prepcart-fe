import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Keyboard,
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
  const [inputFocused, setInputFocused] = useState(false);

  const handleOverlayPress = () => {
    if (!isLoading) {
      Keyboard.dismiss();
      handleClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}>
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={handleOverlayPress}>
        <TouchableOpacity 
          style={styles.modalContent}
          activeOpacity={1}
          onPress={() => {}}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>
              {IMPORT_RECIPE_MODAL_STRINGS.title}
            </ThemedText>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              disabled={isLoading}>
              <MaterialIcons name="close" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.descriptionText}>
            {IMPORT_RECIPE_MODAL_STRINGS.description}
          </ThemedText>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              TikTok URL
            </Text>
            <TextInput
              style={[
                styles.input,
                inputFocused && styles.inputFocused,
              ]}
              placeholder={IMPORT_RECIPE_MODAL_STRINGS.placeholder}
              placeholderTextColor={colors.icon}
              value={url}
              onChangeText={setUrl}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              disabled={isLoading}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>
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
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={colors.buttonText} />
                  <Text style={styles.loadingText}>
                    {IMPORT_RECIPE_MODAL_STRINGS.importingButton}
                  </Text>
                </View>
              ) : (
                <Text style={[styles.buttonText, styles.importButtonText]}>
                  {IMPORT_RECIPE_MODAL_STRINGS.importButton}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}