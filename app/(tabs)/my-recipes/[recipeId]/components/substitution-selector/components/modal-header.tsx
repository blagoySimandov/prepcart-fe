import React from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "../styles";
import { SELECTOR_CONSTANTS } from "../constants";

export function ModalHeader() {
  const { styles } = useStyles();

  return (
    <View style={styles.header}>
      <ThemedText style={styles.headerTitle}>
        {SELECTOR_CONSTANTS.MODAL_TITLE}
      </ThemedText>
      <ThemedText style={styles.headerSubtitle}>
        {SELECTOR_CONSTANTS.MODAL_SUBTITLE}
      </ThemedText>
    </View>
  );
}