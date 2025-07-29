import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStyles } from './styles';
import { UnitConversionToggleProps } from './types';
import { formatQuantity } from '../../utils/unit-conversion/converter';
import { UI_CONSTANTS } from '../../utils/unit-conversion/constants';
import { ICON_NAMES } from '@/constants/icons';

export function UnitConversionToggle({
  currentUnit,
  currentValue,
  availableConversions,
  onConvert,
  isConverted,
  disabled = false,
  showLabel = true,
}: UnitConversionToggleProps) {
  const { styles, colors } = useStyles();
  const [modalVisible, setModalVisible] = useState(false);

  if (!availableConversions || availableConversions.length === 0 || disabled) {
    return null;
  }

  const handleTogglePress = () => {
    if (availableConversions.length === 1) {
      onConvert(availableConversions[0]);
    } else {
      setModalVisible(true);
    }
  };

  const handleUnitSelect = (unit: string) => {
    onConvert(unit);
    setModalVisible(false);
  };

  const formattedValue = formatQuantity(currentValue, currentUnit);
  const displayUnits = [currentUnit, ...availableConversions.filter(u => u !== currentUnit)];

  return (
    <>
      <TouchableOpacity
        style={[styles.toggle, isConverted && styles.toggleActive]}
        onPress={handleTogglePress}
        disabled={disabled}
      >
        <MaterialIcons
          name={ICON_NAMES.swapVert}
          size={UI_CONSTANTS.iconSize}
          color={isConverted ? colors.tint : colors.icon}
        />
        {showLabel && (
          <ThemedText style={[styles.toggleLabel, isConverted && styles.toggleLabelActive]}>
            {formattedValue}
          </ThemedText>
        )}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <ThemedView style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Convert Unit</ThemedText>
            <FlatList
              data={displayUnits}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isCurrentUnit = item === currentUnit;
                return (
                  <TouchableOpacity
                    style={[
                      styles.unitOption,
                      isCurrentUnit && styles.unitOptionActive,
                    ]}
                    onPress={() => handleUnitSelect(item)}
                  >
                    <ThemedText
                      style={[
                        styles.unitOptionText,
                        isCurrentUnit && styles.unitOptionTextActive,
                      ]}
                    >
                      {formatQuantity(currentValue, item)}
                    </ThemedText>
                    {isCurrentUnit && (
                      <MaterialIcons
                        name={ICON_NAMES.check}
                        size={UI_CONSTANTS.iconSize}
                        color={colors.tint}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </ThemedView>
        </TouchableOpacity>
      </Modal>
    </>
  );
}