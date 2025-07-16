import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { Alert, Modal, TextInput, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";

interface DisplayNameModalProps {
  visible: boolean;
  onSave: (displayName: string) => Promise<void>;
  onSkip: () => void;
}

export function DisplayNameModal({
  visible,
  onSave,
  onSkip,
}: DisplayNameModalProps) {
  const [displayName, setDisplayName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const styles = useStyles();
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");
  const tint = useThemeColor({}, "tint");

  const handleSaveDisplayName = async () => {
    if (!displayName.trim()) {
      Alert.alert("Invalid Name", "Please enter a valid display name.");
      return;
    }

    setIsUpdating(true);
    try {
      await onSave(displayName.trim());
      setDisplayName(""); // Reset the input
    } catch (error) {
      console.error("Error updating display name:", error);
      Alert.alert("Error", "Failed to update display name. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSkip = () => {
    setDisplayName(""); // Reset the input
    onSkip();
  };

  const handleRequestClose = () => {
    if (!isUpdating) {
      handleSkip();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleRequestClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor }]}>
          <ThemedText type="title" style={styles.modalTitle}>
            Add Your Name
          </ThemedText>
          <ThemedText type="default" style={styles.modalSubtitle}>
            Help others recognize you by adding your display name (optional)
          </ThemedText>

          <TextInput
            style={[
              styles.textInput,
              {
                borderColor: borderColor || "#ccc",
                color: textColor,
                backgroundColor: backgroundColor,
              },
            ]}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your name"
            placeholderTextColor={textColor ? `${textColor}80` : "#999"}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleSaveDisplayName}
            editable={!isUpdating}
          />

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.skipButton,
                { borderColor: borderColor || "#ccc" },
              ]}
              onPress={handleSkip}
              disabled={isUpdating}>
              <ThemedText type="defaultSemiBold">Skip</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.saveButton,
                { backgroundColor: tint },
              ]}
              onPress={handleSaveDisplayName}
              disabled={isUpdating}>
              <ThemedText
                type="defaultSemiBold"
                lightColor="#fff"
                darkColor="#000">
                {isUpdating ? "Saving..." : "Save"}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
