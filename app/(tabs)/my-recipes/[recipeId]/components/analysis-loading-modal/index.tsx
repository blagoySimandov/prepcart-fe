import React from "react";
import { Modal, View, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "./styles";
import { MODAL_TITLES, MESSAGES } from "../../messages";
import { ANIMATION } from "@/constants/ui";

interface AnalysisLoadingModalProps {
  visible: boolean;
}

export function AnalysisLoadingModal({ visible }: AnalysisLoadingModalProps) {
  const { styles, colors } = useStyles();

  return (
    <Modal
      visible={visible}
      transparent
      animationType={ANIMATION.modal.type}
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <ActivityIndicator 
            size="large" 
            color={colors.tint} 
            style={styles.loader}
          />
          <ThemedText style={styles.title}>{MODAL_TITLES.analyzingSubstitutions}</ThemedText>
          <ThemedText style={styles.message}>
            {MESSAGES.analyzingSubstitutions}
          </ThemedText>
        </View>
      </View>
    </Modal>
  );
}