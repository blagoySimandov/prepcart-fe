import React from "react";
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "./styles";
import { DetailModalProps } from "./types";
import { ANIMATION, ICON_SIZES } from "@/constants/ui";
import { ICON_NAMES } from "@/constants/icons";

export function DetailModal({ visible, onClose, title, children }: DetailModalProps) {
  const { styles, colors } = useStyles();

  return (
    <Modal
      visible={visible}
      transparent
      animationType={ANIMATION.modal.type}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <View style={styles.header}>
                <ThemedText style={styles.title}>{title}</ThemedText>
                <TouchableOpacity onPress={onClose}>
                  <MaterialIcons name={ICON_NAMES.close} size={ICON_SIZES.xl} color={colors.icon} />
                </TouchableOpacity>
              </View>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}