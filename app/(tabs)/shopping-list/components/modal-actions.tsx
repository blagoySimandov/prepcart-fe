import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";

interface ModalActionsProps {
  onCancel: () => void;
  onSave: () => void;
  saveText: string;
}

export function ModalActions({
  onCancel,
  onSave,
  saveText,
}: ModalActionsProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.modalActions}>
      <TouchableOpacity
        style={[styles.modalButton, styles.cancelButton]}
        onPress={onCancel}>
        <Text style={styles.modalButtonText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.modalButton, styles.saveButton]}
        onPress={onSave}>
        <Text style={styles.modalButtonText}>{saveText}</Text>
      </TouchableOpacity>
    </View>
  );
}
