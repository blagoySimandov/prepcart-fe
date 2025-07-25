import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "../styles";
import { SELECTOR_CONSTANTS } from "../constants";

interface ModalFooterProps {
  onCancel: () => void;
  onConfirm: () => void;
  isConfirmDisabled: boolean;
}

export function ModalFooter({ onCancel, onConfirm, isConfirmDisabled }: ModalFooterProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[styles.button, styles.cancelButton]} 
        onPress={onCancel}
      >
        <ThemedText style={[styles.buttonText, styles.cancelButtonText]}>
          {SELECTOR_CONSTANTS.CANCEL_TEXT}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.button, 
          styles.confirmButton,
          isConfirmDisabled && styles.confirmButtonDisabled
        ]} 
        onPress={onConfirm}
        disabled={isConfirmDisabled}
      >
        <ThemedText style={[styles.buttonText, styles.confirmButtonText]}>
          {SELECTOR_CONSTANTS.CONFIRM_TEXT}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}