import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CalorieAnalysisPopupProps } from "./types";
import useStyles from "./styles";

export function CalorieAnalysisPopup({
  visible,
  onClose,
  onAnalyze,
  loading,
}: CalorieAnalysisPopupProps) {
  const { styles } = useStyles();

  const handleTakePhoto = () => {
    // TODO: Implement camera functionality
    Alert.alert("Camera", "Camera functionality will be implemented soon!");
  };

  const handleUploadPhoto = () => {
    // TODO: Implement photo picker functionality
    Alert.alert(
      "Upload",
      "Photo upload functionality will be implemented soon!"
    );
  };

  const handleClose = () => {
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
            Calorie Analysis
          </ThemedText>

          <ThemedText style={styles.description}>
            Take a photo or upload an image to analyze calories and macros
          </ThemedText>

          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[styles.optionButton, styles.cameraButton]}
              onPress={handleTakePhoto}
              disabled={loading}>
              <ThemedText style={styles.cameraIcon}>📷</ThemedText>
              <ThemedText style={styles.optionTitle}>Take Photo</ThemedText>
              <ThemedText style={styles.optionDescription}>
                Use camera to capture food
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, styles.uploadButton]}
              onPress={handleUploadPhoto}
              disabled={loading}>
              <ThemedText style={styles.uploadIcon}>📎</ThemedText>
              <ThemedText style={styles.optionTitle}>Upload Photo</ThemedText>
              <ThemedText style={styles.optionDescription}>
                Select from gallery
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}>
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
