import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { useStyles } from "../styles";
import { toTitleCase } from "../../../utils/string-helpers";
import { SubstitutionCandidate } from "../types";
import { 
  getExecutionDifficulty, 
  getSubstitutionQuality,
  EXECUTION_DIFFICULTY_CONFIG,
  SUBSTITUTION_QUALITY_CONFIG 
} from "../constants";

interface CandidateOptionProps {
  candidate: SubstitutionCandidate;
  isSelected: boolean;
  onSelect: () => void;
}

export function CandidateOption({ candidate, isSelected, onSelect }: CandidateOptionProps) {
  const { styles } = useStyles();

  const qualityLevel = getSubstitutionQuality(candidate.score);
  const qualityConfig = SUBSTITUTION_QUALITY_CONFIG[qualityLevel];
  
  const difficultyLevel = getExecutionDifficulty(candidate.executionDifficulty);
  const difficultyConfig = EXECUTION_DIFFICULTY_CONFIG[difficultyLevel];

  return (
    <TouchableOpacity
      style={[
        styles.candidateButton,
        isSelected && styles.candidateSelected,
      ]}
      onPress={onSelect}
    >
      <View style={styles.candidateContent}>
        <ThemedText style={styles.candidateName}>
          {toTitleCase(candidate.name)}
        </ThemedText>
        
        <View style={styles.candidateMetrics}>
          <View style={[styles.qualityContainer, { backgroundColor: qualityConfig.backgroundColor }]}>
            <MaterialIcons 
              name={qualityConfig.icon} 
              size={12} 
              color={qualityConfig.color} 
            />
            <ThemedText style={[styles.qualityText, { color: qualityConfig.color }]}>
              {qualityLevel}
            </ThemedText>
          </View>
          
          <View style={[styles.difficultyContainer, { backgroundColor: difficultyConfig.backgroundColor }]}>
            <MaterialIcons 
              name={difficultyConfig.icon} 
              size={12} 
              color={difficultyConfig.color} 
            />
            <ThemedText style={[styles.difficultyText, { color: difficultyConfig.color }]}>
              {difficultyLevel}
            </ThemedText>
          </View>
        </View>
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