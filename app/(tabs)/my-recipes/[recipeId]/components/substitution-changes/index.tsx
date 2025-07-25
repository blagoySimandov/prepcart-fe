import React from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useStyles } from "./styles";
import { CHANGES_CONSTANTS } from "./constants";
import { SubstitutionChangesModalProps, IngredientModification, InstructionModification } from "./types";

function IngredientChange({ change }: { change: IngredientModification }) {
  const { styles, colors } = useStyles();
  const actionColor = CHANGES_CONSTANTS.ACTION_COLORS[change.action];

  return (
    <View style={styles.changeItem}>
      <View style={styles.changeHeader}>
        <ThemedText style={styles.changeName}>{change.name}</ThemedText>
        <View style={[styles.changeAction, { backgroundColor: actionColor }]}>
          <ThemedText style={styles.changeActionText}>
            {CHANGES_CONSTANTS.ACTION_LABELS[change.action]}
          </ThemedText>
        </View>
      </View>
      {change.quantity && change.unit && (
        <ThemedText style={styles.changeQuantity}>
          {change.quantity} {change.unit}
        </ThemedText>
      )}
      <ThemedText style={styles.changeReason}>{change.reason}</ThemedText>
    </View>
  );
}

function InstructionChange({ change }: { change: InstructionModification }) {
  const { styles } = useStyles();

  return (
    <View style={styles.instructionChange}>
      <ThemedText style={styles.instructionStep}>
        Step {change.stepNumber}
      </ThemedText>
      
      <ThemedText style={styles.instructionLabel}>Original:</ThemedText>
      <ThemedText style={[styles.instructionText, styles.strikethrough]}>
        {change.originalInstruction}
      </ThemedText>
      
      <ThemedText style={styles.instructionLabel}>Modified:</ThemedText>
      <ThemedText style={styles.instructionText}>
        {change.modifiedInstruction}
      </ThemedText>
      
      <ThemedText style={styles.changeReason}>
        {change.reasonForChange}
      </ThemedText>
    </View>
  );
}

export function SubstitutionChangesModal({
  visible,
  onClose,
  changes,
  onApply,
  ingredientName,
}: SubstitutionChangesModalProps) {
  const { styles } = useStyles();

  if (!changes) return null;

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
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>
              {CHANGES_CONSTANTS.MODAL_TITLE}
            </ThemedText>
          </View>

          <ScrollView style={styles.scrollView}>
            <View style={styles.analysisCard}>
              <View style={styles.analysisRow}>
                <ThemedText style={styles.analysisLabel}>
                  {CHANGES_CONSTANTS.DIFFICULTY_LABEL}
                </ThemedText>
                <ThemedText style={styles.analysisText}>
                  {changes.substitutionAnalysis.difficultyLevel}
                </ThemedText>
              </View>
              <View style={styles.analysisRow}>
                <ThemedText style={styles.analysisLabel}>
                  {CHANGES_CONSTANTS.EXPECTED_OUTCOME_LABEL}
                </ThemedText>
                <ThemedText style={styles.analysisText}>
                  {changes.substitutionAnalysis.expectedOutcome}
                </ThemedText>
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>
                {CHANGES_CONSTANTS.INGREDIENTS_SECTION}
              </ThemedText>
              {changes.recipeModifications.updatedIngredients.map((change, index) => (
                <IngredientChange key={index} change={change} />
              ))}
            </View>

            {changes.recipeModifications.updatedInstructions.length > 0 && (
              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>
                  {CHANGES_CONSTANTS.INSTRUCTIONS_SECTION}
                </ThemedText>
                {changes.recipeModifications.updatedInstructions.map((change, index) => (
                  <InstructionChange key={index} change={change} />
                ))}
              </View>
            )}

            {changes.recipeModifications.cookingTimeAdjustment !== 0 && (
              <View style={styles.cookingTimeAdjustment}>
                <ThemedText style={styles.cookingTimeLabel}>
                  {CHANGES_CONSTANTS.COOKING_TIME_ADJUSTMENT}
                </ThemedText>
                <ThemedText style={styles.cookingTimeValue}>
                  +{changes.recipeModifications.cookingTimeAdjustment} {CHANGES_CONSTANTS.MINUTES_SUFFIX}
                </ThemedText>
              </View>
            )}

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>
                {CHANGES_CONSTANTS.TIPS_SECTION}
              </ThemedText>
              {changes.criticalTips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <ThemedText style={styles.tipBullet}>•</ThemedText>
                  <ThemedText style={styles.tipText}>{tip}</ThemedText>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <ThemedText style={[styles.buttonText, styles.cancelButtonText]}>
                {CHANGES_CONSTANTS.CANCEL_BUTTON}
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.applyButton]} 
              onPress={onApply}
            >
              <ThemedText style={[styles.buttonText, styles.applyButtonText]}>
                {CHANGES_CONSTANTS.APPLY_BUTTON}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}