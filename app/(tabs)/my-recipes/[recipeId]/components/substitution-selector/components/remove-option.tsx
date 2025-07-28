import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { useStyles } from "../styles";
import { toTitleCase } from "../../../utils/string-helpers";
import { ICON_NAMES } from "@/constants/icons";
import { COMMON_COLORS } from "@/constants/colors";
import { ICON_SIZES } from "@/constants/ui";

interface RemoveOptionProps {
  ingredientName: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function RemoveOption({ ingredientName, isSelected, onSelect }: RemoveOptionProps) {
  const { styles } = useStyles();

  return (
    <TouchableOpacity
      style={[
        styles.candidateButton,
        styles.removeButton,
        isSelected && styles.candidateSelected,
      ]}
      onPress={onSelect}
    >
      <View style={styles.removeButtonContent}>
        <MaterialIcons name={ICON_NAMES.removeCircleOutline} size={ICON_SIZES.xl} color={COMMON_COLORS.error} />
        <ThemedText style={[styles.candidateName, styles.removeText]}>
          Remove {toTitleCase(ingredientName)}
        </ThemedText>
      </View>
      <View style={[
        styles.checkIcon,
        isSelected && styles.checkIconSelected,
      ]}>
        {isSelected && (
          <MaterialIcons name={ICON_NAMES.check} size={ICON_SIZES.small} color={COMMON_COLORS.white} />
        )}
      </View>
    </TouchableOpacity>
  );
}