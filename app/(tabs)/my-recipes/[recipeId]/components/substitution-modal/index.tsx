import React from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "./styles";
import { MODAL_CONSTANTS } from "./constants";
import { OptionItemProps, SubstitutionModalProps } from "./types";

function OptionItem({ option, onSelect }: OptionItemProps) {
  const { styles } = useStyles();

  return (
    <TouchableOpacity style={styles.optionItem} onPress={onSelect}>
      <View style={styles.optionHeader}>
        <ThemedText style={styles.optionName}>{option.name}</ThemedText>
        <ThemedText style={styles.optionQuantity}>
          {option.quantity} {option.unit}
        </ThemedText>
      </View>

      <View style={styles.optionDetail}>
        <ThemedText style={styles.optionDetailLabel}>
          {MODAL_CONSTANTS.REASON_PREFIX}
        </ThemedText>
        <ThemedText style={styles.optionDetailText}>{option.reason}</ThemedText>
      </View>

      <View style={styles.optionDetail}>
        <ThemedText style={styles.optionDetailLabel}>
          {MODAL_CONSTANTS.IMPACT_PREFIX}
        </ThemedText>
        <ThemedText style={styles.optionDetailText}>{option.impact}</ThemedText>
      </View>

      <TouchableOpacity style={styles.selectButton}>
        <ThemedText style={styles.selectButtonText}>
          {MODAL_CONSTANTS.SELECT_TEXT}
        </ThemedText>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export function SubstitutionModal({
  visible,
  onClose,
  ingredientName,
  onSelect,
  substitutionOptions,
}: SubstitutionModalProps) {
  const { styles } = useStyles();

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>
              {MODAL_CONSTANTS.MODAL_TITLE}
            </ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              {MODAL_CONSTANTS.MODAL_SUBTITLE} for {ingredientName}
            </ThemedText>
          </View>

          <ScrollView style={styles.scrollView}>
            {substitutionOptions.map((option) => (
              <OptionItem
                key={option.id}
                option={option}
                onSelect={() => onSelect(option)}
              />
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <ThemedText style={styles.closeButtonText}>
              {MODAL_CONSTANTS.CANCEL_TEXT}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}