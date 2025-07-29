import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useStyles } from './styles';
import { UnitSystemToggleProps } from './types';
import { UNIT_SYSTEMS } from '../../utils/unit-conversion/constants';
import { ICON_NAMES } from '@/constants/icons';
import { ICON_SIZES } from '@/constants/ui';

export function UnitSystemToggle({
  currentSystem,
  onSystemChange,
  disabled = false,
}: UnitSystemToggleProps) {
  const { styles, colors } = useStyles();

  const getNextSystem = () => {
    switch (currentSystem) {
      case UNIT_SYSTEMS.original:
        return UNIT_SYSTEMS.metric;
      case UNIT_SYSTEMS.metric:
        return UNIT_SYSTEMS.imperial;
      case UNIT_SYSTEMS.imperial:
        return UNIT_SYSTEMS.original;
      default:
        return UNIT_SYSTEMS.original;
    }
  };

  const getSystemLabel = () => {
    switch (currentSystem) {
      case UNIT_SYSTEMS.metric:
        return 'Metric';
      case UNIT_SYSTEMS.imperial:
        return 'Imperial';
      case UNIT_SYSTEMS.original:
        return 'Original';
      default:
        return 'Original';
    }
  };

  const getSystemIcon = () => {
    switch (currentSystem) {
      case UNIT_SYSTEMS.metric:
        return 'straighten';
      case UNIT_SYSTEMS.imperial:
        return 'square-foot';
      case UNIT_SYSTEMS.original:
        return 'restore';
      default:
        return 'restore';
    }
  };

  const handlePress = () => {
    if (!disabled) {
      onSystemChange(getNextSystem());
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        currentSystem !== UNIT_SYSTEMS.original && styles.containerActive,
        disabled && styles.containerDisabled,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <MaterialIcons
        name={getSystemIcon() as any}
        size={ICON_SIZES.small}
        color={currentSystem !== UNIT_SYSTEMS.original ? colors.tint : colors.icon}
      />
      <ThemedText
        style={[
          styles.label,
          currentSystem !== UNIT_SYSTEMS.original && styles.labelActive,
        ]}
      >
        {getSystemLabel()}
      </ThemedText>
      <MaterialIcons
        name={ICON_NAMES.arrowDropDown}
        size={ICON_SIZES.small}
        color={currentSystem !== UNIT_SYSTEMS.original ? colors.tint : colors.icon}
      />
    </TouchableOpacity>
  );
}