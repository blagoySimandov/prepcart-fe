import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { useStyles } from "./feature-unavailable-modal-styles";

interface FeatureUnavailableModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function FeatureUnavailableModal({
  visible,
  onClose,
  title = "Feature Unavailable",
  message = "This feature is currently only available in Bulgaria.",
}: FeatureUnavailableModalProps) {
  const styles = useStyles();
  const backgroundColor = useThemeColor({}, "background");
  const tint = useThemeColor({}, "tint");

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor }]}>
          <View style={styles.iconContainer}>
            <IconSymbol 
              name="exclamationmark.triangle"
              size={48}
              color={tint}
            />
          </View>
          
          <ThemedText type="title" style={styles.modalTitle}>
            {title}
          </ThemedText>
          
          <ThemedText type="default" style={styles.modalMessage}>
            {message}
          </ThemedText>
          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: tint }]}
            onPress={onClose}
          >
            <ThemedText
              type="defaultSemiBold"
              lightColor="#fff"
              darkColor="#000"
            >
              OK
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}