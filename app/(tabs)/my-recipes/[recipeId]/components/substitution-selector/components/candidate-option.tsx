import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { useStyles } from "../styles";
import { toTitleCase } from "../../../utils/string-helpers";

interface CandidateOptionProps {
  candidate: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function CandidateOption({ candidate, isSelected, onSelect }: CandidateOptionProps) {
  const { styles } = useStyles();

  return (
    <TouchableOpacity
      style={[
        styles.candidateButton,
        isSelected && styles.candidateSelected,
      ]}
      onPress={onSelect}
    >
      <ThemedText style={styles.candidateName}>
        {toTitleCase(candidate)}
      </ThemedText>
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