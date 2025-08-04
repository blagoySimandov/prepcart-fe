import React from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "../styles";
import { toTitleCase } from "../../../utils/string-helpers";
import { CandidateOption } from "./candidate-option";
import { RemoveOption } from "./remove-option";
import { SubstitutionCandidate } from "../types";

interface IngredientSectionProps {
  ingredient: string;
  candidates: SubstitutionCandidate[];
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
            key={candidate.name}
            candidate={candidate}
            isSelected={selectedCandidate === candidate.name}
            onSelect={() => onCandidateSelect(ingredient, candidate.name)}
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