import { useStyles } from "@/app/(tabs)/my-recipes/styles";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ImportRecipeModalProps {
  visible: boolean;
  onClose: () => void;
  onImport: (url: string) => void;
}

export function ImportRecipeModal({
  visible,
  onClose,
  onImport,
}: ImportRecipeModalProps) {
  const { colors } = useStyles();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    if (!url.trim()) {
      Alert.alert("Error", "Please enter a TikTok URL");
      return;
    }

    if (!url.includes("tiktok.com")) {
      Alert.alert("Error", "Please enter a valid TikTok URL");
      return;
    }

    setIsLoading(true);
    try {
      await onImport(url.trim());
      setUrl("");
      onClose();
    } catch {
      Alert.alert("Error", "Failed to import recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUrl("");
    onClose();
  };

  const modalStyles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      margin: 20,
      minWidth: 300,
      width: "90%",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "600",
    },
    closeButton: {
      padding: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.background,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 12,
    },
    button: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    importButton: {
      backgroundColor: colors.tint,
    },
    cancelButton: {
      backgroundColor: colors.secondary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.buttonText,
    },
    disabledButton: {
      backgroundColor: colors.disabled,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}>
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.modalHeader}>
            <ThemedText style={modalStyles.modalTitle}>
              Import Recipe
            </ThemedText>
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={handleClose}>
              <MaterialIcons name="close" size={24} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <ThemedText style={{ marginBottom: 12 }}>
            Enter a TikTok URL to import the recipe:
          </ThemedText>

          <TextInput
            style={modalStyles.input}
            placeholder="https://www.tiktok.com/@username/video/..."
            placeholderTextColor={colors.icon}
            value={url}
            onChangeText={setUrl}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.cancelButton]}
              onPress={handleClose}
              disabled={isLoading}>
              <Text style={modalStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                modalStyles.button,
                modalStyles.importButton,
                isLoading && modalStyles.disabledButton,
              ]}
              onPress={handleImport}
              disabled={isLoading}>
              <Text style={modalStyles.buttonText}>
                {isLoading ? "Importing..." : "Import"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
