import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { FILTER_OPTIONS } from "./constants";
import { useStyles } from "./styles";
import { FilterModalProps } from "./types";

export function FilterModal({
  visible,
  onClose,
  selectedFilter,
  onFilterSelect,
}: FilterModalProps) {
  const { styles, colors } = useStyles();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}>
        <View
          style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View
            style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Filter Recipes
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Text
                style={[styles.modalCloseButtonText, { color: colors.icon }]}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalOptions}>
            {FILTER_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.modalOption,
                  { borderBottomColor: colors.border },
                  selectedFilter === option.key && {
                    backgroundColor: colors.tint + "10",
                  },
                ]}
                onPress={() => {
                  onFilterSelect(option.key);
                  onClose();
                }}>
                <View style={styles.modalOptionContent}>
                  <Text
                    style={[styles.modalOptionLabel, { color: colors.text }]}>
                    {option.label}
                  </Text>
                  <Text
                    style={[
                      styles.modalOptionDescription,
                      { color: colors.icon },
                    ]}>
                    {option.description}
                  </Text>
                </View>
                {selectedFilter === option.key && (
                  <View
                    style={[
                      styles.modalSelectedIndicator,
                      { backgroundColor: colors.tint },
                    ]}>
                    <Text
                      style={[
                        styles.modalCheckmarkText,
                        { color: colors.buttonText },
                      ]}>
                      ✓
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
