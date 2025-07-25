import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useStyles } from "./styles";
import { SubstitutionSelectorModalProps, SubstitutionSelection } from "./types";
import {
  LoadingState,
  ErrorState,
  ModalHeader,
  ModalFooter,
  IngredientSection,
} from "./components";

export function SubstitutionSelectorModal({
  visible,
  onClose,
  ingredientsToReplace,
  replacementCandidates,
  onConfirm,
  isLoading = false,
  error = null,
}: SubstitutionSelectorModalProps) {
  const { styles } = useStyles();
  const [selections, setSelections] = useState<Record<string, string | null>>({});

  const handleCandidateSelect = (ingredient: string, candidate: string | null) => {
    setSelections(prev => ({
      ...prev,
      [ingredient]: candidate,
    }));
  };

  const handleConfirm = () => {
    const finalSelections: SubstitutionSelection[] = ingredientsToReplace.map(ingredient => ({
      ingredient,
      selectedCandidate: selections[ingredient] || null,
    }));
    onConfirm(finalSelections);
  };

  const allSelected = ingredientsToReplace.every(ing => 
    selections[ing] !== undefined
  );

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
          <ModalHeader />

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState onRetry={onClose} />
          ) : (
            <>
              <ScrollView style={styles.scrollView}>
                {replacementCandidates.map((item) => (
                  <IngredientSection
                    key={item.ingredient}
                    ingredient={item.ingredient}
                    candidates={item.candidates}
                    selectedCandidate={selections[item.ingredient]}
                    onCandidateSelect={handleCandidateSelect}
                  />
                ))}
              </ScrollView>

              <ModalFooter
                onCancel={onClose}
                onConfirm={handleConfirm}
                isConfirmDisabled={!allSelected}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}