import React, { useState } from "react";
import { View, Modal, TextInput, TouchableOpacity, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { RecipeImportPopupProps } from "./types";
import useStyles from "./styles";

export function RecipeImportPopup({
  visible,
  onClose,
  onImport,
  loading,
}: RecipeImportPopupProps) {
  const { styles, colors } = useStyles();
  const [url, setUrl] = useState("");

  const handleImport = () => {
    if (!url.trim()) {
      Alert.alert("Error", "Please enter a recipe URL");
      return;
    }
    onImport(url.trim());
    setUrl("");
  };

  const handleClose = () => {
    setUrl("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <ThemedText type="subtitle" style={styles.title}>
            Import Recipe
          </ThemedText>

          <ThemedText style={styles.description}>
            Enter a recipe URL to import ingredients and instructions
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="https://example.com/recipe..."
            placeholderTextColor={colors.icon}
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            keyboardType="url"
            autoCorrect={false}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}>
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.importButton,
                loading && styles.disabledButton,
              ]}
              onPress={handleImport}
              disabled={loading || !url.trim()}>
              <ThemedText style={styles.importButtonText}>
                {loading ? "Importing..." : "Import"}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
