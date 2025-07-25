import React from "react";
import { Modal, View, Image, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "./styles";

interface ImportProgressModalProps {
  visible: boolean;
  thumbnail?: string;
  title?: string;
}

export function ImportProgressModal({ 
  visible, 
  thumbnail,
  title = "Importing Recipe..."
}: ImportProgressModalProps) {
  const { styles, colors } = useStyles();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {thumbnail && (
            <Image 
              source={{ uri: thumbnail }} 
              style={styles.thumbnail}
              resizeMode="cover"
            />
          )}
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ActivityIndicator 
            size="large" 
            color={colors.tint} 
            style={styles.loader}
          />
          <ThemedText style={styles.message}>
            Please wait while we process your recipe...
          </ThemedText>
        </View>
      </View>
    </Modal>
  );
}