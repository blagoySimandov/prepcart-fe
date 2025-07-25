import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { useStyles } from "../styles";
import { toTitleCase } from "../../../utils/string-helpers";

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
        <MaterialIcons name="remove-circle-outline" size={20} color="#FF4444" />
        <ThemedText style={[styles.candidateName, styles.removeText]}>
          Remove {toTitleCase(ingredientName)}
        </ThemedText>
      </View>
      <View style={[
        styles.checkIcon,
        isSelected && styles.checkIconSelected,
      ]}>
        {isSelected && (
          <MaterialIcons name="check" size={14} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
}