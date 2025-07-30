import React from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useStyles } from "./styles";
import { ANIMATION } from "@/constants/ui";
import { CHANGES_CONSTANTS } from "./constants";
import {
  SubstitutionChangesModalProps,
  IngredientModification,
  InstructionModification,
  AdditionalStep,
} from "./types";

function IngredientChange({ change }: { change: IngredientModification }) {
  const { styles } = useStyles();
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
  const { styles, colors } = useStyles();
  const actionColor =
    CHANGES_CONSTANTS.ACTION_COLORS[change.action] || colors.text;

  return (
    <View style={styles.instructionChange}>
      <View style={styles.changeHeader}>
        <ThemedText style={styles.instructionStep}>
          Step {change.stepNumber}
        </ThemedText>
        <View style={[styles.changeAction, { backgroundColor: actionColor }]}>
          <ThemedText style={styles.changeActionText}>
            {CHANGES_CONSTANTS.ACTION_LABELS[change.action] ||
              change.action.toUpperCase()}
          </ThemedText>
        </View>
      </View>

      {change.action !== "add" && (
        <>
          <ThemedText style={styles.instructionLabel}>Original:</ThemedText>
          <ThemedText style={[styles.instructionText, styles.strikethrough]}>
            {change.originalInstruction}
          </ThemedText>
        </>
      )}

      <ThemedText style={styles.instructionLabel}>
        {change.action === "remove" ? "Removed:" : "Modified:"}
      </ThemedText>
      <ThemedText style={styles.instructionText}>
        {change.modifiedInstruction}
      </ThemedText>

      {change.timer && change.timer.durationMinutes > 0 && (
        <View style={styles.timerContainer}>
          <IconSymbol
            name="clock"
            size={14}
            color={colors.tint}
            style={styles.timerIcon}
          />
          <ThemedText style={styles.timerText}>
            {`${change.timer.durationMinutes} minutes`}
          </ThemedText>
        </View>
      )}

      <ThemedText style={styles.changeReason}>
        {change.reasonForChange}
      </ThemedText>
    </View>
  );
}

function AdditionalStepItem({ step }: { step: AdditionalStep }) {
  const { styles } = useStyles();

  return (
    <View style={styles.instructionChange}>
      <ThemedText style={styles.instructionStep}>
        New Step {step.stepNumber}
      </ThemedText>
      <ThemedText style={styles.instructionText}>{step.instruction}</ThemedText>
      <ThemedText style={styles.changeReason}>{step.reason}</ThemedText>
    </View>
  );
}

export function SubstitutionChangesModal({
  visible,
  onClose,
  changes,
  onApply,
}: SubstitutionChangesModalProps) {
  const { styles, colors } = useStyles();

  if (!changes) return null;

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType={ANIMATION.slide}
      transparent
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerDivider} />
            <ThemedText style={styles.headerTitle}>
              {CHANGES_CONSTANTS.MODAL_TITLE}
            </ThemedText>
          </View>

          <ScrollView style={styles.scrollView}>
            <View style={styles.analysisCard}>
              {changes.substitutionAnalysis.originalIngredient && (
                <View style={styles.analysisSection}>
                  <ThemedText style={styles.analysisSectionTitle}>
                    Original Ingredient
                  </ThemedText>
                  <ThemedText style={styles.analysisText}>
                    {`${changes.substitutionAnalysis.originalIngredient.name} (${changes.substitutionAnalysis.originalIngredient.quantity} ${changes.substitutionAnalysis.originalIngredient.unit})`}
                  </ThemedText>
                  <ThemedText style={styles.analysisSubtext}>
                    Function:{" "}
                    {changes.substitutionAnalysis.originalIngredient.function}
                  </ThemedText>
                </View>
              )}

              {changes.substitutionAnalysis.replacementIngredient && (
                <View style={styles.analysisSection}>
                  <ThemedText style={styles.analysisSectionTitle}>
                    Replacement Ingredient
                  </ThemedText>
                  <ThemedText style={styles.analysisText}>
                    {`${changes.substitutionAnalysis.replacementIngredient.name} (${changes.substitutionAnalysis.replacementIngredient.quantity} ${changes.substitutionAnalysis.replacementIngredient.unit})`}
                  </ThemedText>
                  <ThemedText style={styles.analysisSubtext}>
                    Function:{" "}
                    {
                      changes.substitutionAnalysis.replacementIngredient
                        .function
                    }
                  </ThemedText>
                </View>
              )}

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
              {changes.recipeModifications.updatedIngredients.map(
                (change, index) => (
                  <IngredientChange key={index} change={change} />
                ),
              )}
            </View>

            {changes.recipeModifications.updatedInstructions.length > 0 && (
              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>
                  {CHANGES_CONSTANTS.INSTRUCTIONS_SECTION}
                </ThemedText>
                {changes.recipeModifications.updatedInstructions.map(
                  (change, index) => (
                    <InstructionChange key={index} change={change} />
                  ),
                )}
              </View>
            )}

            {changes.recipeModifications.additionalSteps.length > 0 && (
              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>
                  Additional Steps
                </ThemedText>
                {changes.recipeModifications.additionalSteps.map(
                  (step, index) => (
                    <AdditionalStepItem key={index} step={step} />
                  ),
                )}
              </View>
            )}

            {changes.nutritionalImpact && (
              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>
                  Nutritional Impact
                </ThemedText>
                <View style={styles.nutritionalGrid}>
                  <View style={styles.nutritionalItem}>
                    <ThemedText style={styles.nutritionalLabel}>
                      Calories:
                    </ThemedText>
                    <View style={styles.nutritionalValueContainer}>
                      <IconSymbol
                        name={
                          changes.nutritionalImpact.calories.action ===
                          "increase"
                            ? "arrow.up"
                            : changes.nutritionalImpact.calories.action ===
                                "decrease"
                              ? "arrow.down"
                              : "equal"
                        }
                        size={16}
                        color={
                          changes.nutritionalImpact.calories.action ===
                          "increase"
                            ? "#FF6B6B"
                            : changes.nutritionalImpact.calories.action ===
                                "decrease"
                              ? "#51CF66"
                              : colors.secondaryText
                        }
                        style={styles.nutritionalIcon}
                      />
                      <ThemedText style={styles.nutritionalValue}>
                        {Math.abs(
                          changes.nutritionalImpact.calories.estimation,
                        )}
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.nutritionalItem}>
                    <ThemedText style={styles.nutritionalLabel}>
                      Fat:
                    </ThemedText>
                    <View style={styles.nutritionalValueContainer}>
                      <IconSymbol
                        name={
                          changes.nutritionalImpact.fat.action === "increase"
                            ? "arrow.up"
                            : changes.nutritionalImpact.fat.action ===
                                "decrease"
                              ? "arrow.down"
                              : "equal"
                        }
                        size={16}
                        color={
                          changes.nutritionalImpact.fat.action === "increase"
                            ? "#FF6B6B"
                            : changes.nutritionalImpact.fat.action ===
                                "decrease"
                              ? "#51CF66"
                              : colors.secondaryText
                        }
                        style={styles.nutritionalIcon}
                      />
                      <ThemedText style={styles.nutritionalValue}>
                        {Math.abs(changes.nutritionalImpact.fat.estimation)}g
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.nutritionalItem}>
                    <ThemedText style={styles.nutritionalLabel}>
                      Sugar:
                    </ThemedText>
                    <View style={styles.nutritionalValueContainer}>
                      <IconSymbol
                        name={
                          changes.nutritionalImpact.sugar.action === "increase"
                            ? "arrow.up"
                            : changes.nutritionalImpact.sugar.action ===
                                "decrease"
                              ? "arrow.down"
                              : "equal"
                        }
                        size={16}
                        color={
                          changes.nutritionalImpact.sugar.action === "increase"
                            ? "#FF6B6B"
                            : changes.nutritionalImpact.sugar.action ===
                                "decrease"
                              ? "#51CF66"
                              : colors.secondaryText
                        }
                        style={styles.nutritionalIcon}
                      />
                      <ThemedText style={styles.nutritionalValue}>
                        {Math.abs(changes.nutritionalImpact.sugar.estimation)}g
                      </ThemedText>
                    </View>
                  </View>
                </View>
                {changes.nutritionalImpact.notes && (
                  <ThemedText style={styles.nutritionalNotes}>
                    {changes.nutritionalImpact.notes}
                  </ThemedText>
                )}
              </View>
            )}
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
