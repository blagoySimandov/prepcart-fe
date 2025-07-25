import React from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "../styles";
import { toTitleCase } from "../../../utils/string-helpers";
import { CandidateOption } from "./candidate-option";
import { RemoveOption } from "./remove-option";

interface IngredientSectionProps {
  ingredient: string;
  candidates: string[];
  selectedCandidate: string | null | undefined;
  onCandidateSelect: (ingredient: string, candidate: string | null) => void;
}

export function IngredientSection({ 
  ingredient, 
  candidates, 
  selectedCandidate, 
  onCandidateSelect 
}: IngredientSectionProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.ingredientSection}>
      <View style={styles.ingredientHeader}>
        <ThemedText style={styles.ingredientName}>
          {toTitleCase(ingredient)}
        </ThemedText>
      </View>

      <View style={styles.candidatesContainer}>
        {candidates.map((candidate) => (
          <CandidateOption
            key={candidate}
            candidate={candidate}
            isSelected={selectedCandidate === candidate}
            onSelect={() => onCandidateSelect(ingredient, candidate)}
          />
        ))}
        
        <RemoveOption
          ingredientName={ingredient}
          isSelected={selectedCandidate === null}
          onSelect={() => onCandidateSelect(ingredient, null)}
        />
      </View>
    </View>
  );
}