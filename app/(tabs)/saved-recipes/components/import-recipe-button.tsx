import { ActionButton } from "@/src/ui/action-button";
import React, { useState } from "react";
import { Modal, TextInput, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";

export function ImportRecipeButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState("");
  const { styles } = useStyles();

  const handleCloseModal = () => {
    setModalVisible(false);
    setUrl("");
  };

  return (
    <>
      <ActionButton
        onPress={() => setModalVisible(true)}
        variant="primary"
        size="compact"
        style={{ width: "50%" }}
        roundness="pill">
        Import Recipe
      </ActionButton>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCloseModal}>
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={() => {}}>
            <TextInput
              style={styles.urlInput}
              placeholder="Paste TikTok recipe URL here..."
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              autoCorrect={false}
              multiline
            />

            <View style={styles.modalActions}>
              <ActionButton onPress={() => {}} size="compact" fullWidth>
                Import Recipe
              </ActionButton>
              <ActionButton
                onPress={handleCloseModal}
                variant="outline"
                size="compact"
                fullWidth>
                Cancel
              </ActionButton>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
