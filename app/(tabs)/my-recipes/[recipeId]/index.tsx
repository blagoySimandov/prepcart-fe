import { ThemedView } from "@/components/ThemedView";
import {
  Ingredient as IngredientType,
  Instruction as InstructionType,
} from "@/src/user/recipes/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useMemo, useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Description,
  Header,
  Ingredient,
  Ingredients,
  Instruction,
  Instructions,
  RecipeDetails,
  Thumbnail,
  UnitSystemToggle,
} from "./components";
import { SubstitutionSelectorModal } from "./components/substitution-selector";
import { SubstitutionSelection } from "./components/substitution-selector/types";
import { SubstitutionChangesModal } from "./components/substitution-changes";
import { SubstitutionChanges } from "./components/substitution-changes/types";
import { AnalysisLoadingModal } from "./components/analysis-loading-modal";
import { AddToShoppingListModal } from "./components/add-to-shopping-list-modal";
import {
  fetchReplacementCandidates,
  SubstitutionTarget,
} from "./services/substitution-webhook";
import {
  fetchSubstitutionAnalysis,
  SubstitutionRequest,
} from "./services/substitution-analysis-webhook";
import {
  saveRecipeModification,
  deleteRecipeModification,
} from "./services/recipe-modifications-firestore";
import { useAuth } from "@/src/auth/hooks";
import { ModificationTracker } from "./utils/recipe-reconciliation";
import { createModificationTracker } from "./utils/modification-tracker";
import { applyModificationsToRecipe } from "./utils/apply-modifications";
import { MESSAGES, BUTTON_LABELS } from "./messages";
import { ICON_NAMES } from "@/constants/icons";
import { COMMON_COLORS } from "@/constants/colors";
import { ICON_SIZES } from "@/constants/ui";
import { MODIFICATION_STATUS } from "./constants";
import { useRecipe, useGlobalUnitPreferences } from "./hooks";
import { useStyles } from "./styles";
import { UNIT_SYSTEMS } from "./utils/unit-conversion/constants";
import { convertUnit, isConvertibleUnit, getAvailableConversions } from "./utils/unit-conversion";
import { ThemedText } from "@/components/ThemedText";
import { useAlert } from "@/components/providers/alert-provider";

export default function RecipeScreen() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  const recipe = useRecipe(recipeId || "");
  const { styles } = useStyles();
  const [selectorModalVisible, setSelectorModalVisible] = useState(false);
  const [changesModalVisible, setChangesModalVisible] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedSubstitutions, setSelectedSubstitutions] = useState<
    SubstitutionSelection[]
  >([]);
  const [replacementCandidates, setReplacementCandidates] = useState<
    SubstitutionTarget[]
  >([]);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(false);
  const [candidatesError, setCandidatesError] = useState<string | null>(null);
  const [appliedModifications, setAppliedModifications] =
    useState<SubstitutionChanges | null>(null);
  const [modificationTracker, setModificationTracker] =
    useState<ModificationTracker | null>(null);
  const [convertedUnits, setConvertedUnits] = useState<{[key: string]: {unit: string, value: number}}>({});
  const globalUnitPrefs = useGlobalUnitPreferences();
  const [currentUnitSystem, setCurrentUnitSystem] = useState(UNIT_SYSTEMS.original);

  const [substitutionChanges, setSubstitutionChanges] =
    useState<SubstitutionChanges | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [isApplyingChanges, setIsApplyingChanges] = useState(false);
  const [shoppingListModalVisible, setShoppingListModalVisible] = useState(false);
  const { user } = useAuth();
  const { showAlert } = useAlert();

  const handleSwapPress = async (ingredient: IngredientType) => {
    if (!recipe) return;

    setSelectedIngredients([ingredient.name]);
    setSelectorModalVisible(true);
    setIsLoadingCandidates(true);
    setCandidatesError(null);

    try {
      const response = await fetchReplacementCandidates(recipe, [
        ingredient.name,
      ]);
      setReplacementCandidates(response.replacementCandidates);
    } catch (error) {
      setCandidatesError(MESSAGES.failedToLoadSubstitutions);
      console.error("Error fetching candidates:", error);
    } finally {
      setIsLoadingCandidates(false);
    }
  };

  const handleSubstitutionsConfirm = async (
    selections: SubstitutionSelection[],
  ) => {
    setSelectedSubstitutions(selections);
    setSelectorModalVisible(false);

    // Include both substitutions and removals
    if (selections.length > 0 && recipe) {
      setIsLoadingAnalysis(true);
      try {
        const substitutionRequests: SubstitutionRequest[] = selections.map(
          (s) => ({
            original: s.ingredient,
            replacement: s.selectedCandidate,
          }),
        );

        // Reset unit conversions before sending for analysis
        // This ensures the analysis works with original recipe values
        setConvertedUnits({});
        setCurrentUnitSystem(UNIT_SYSTEMS.original);

        const analysis = await fetchSubstitutionAnalysis(
          recipe,
          substitutionRequests,
        );
        setSubstitutionChanges(analysis);
        setIsLoadingAnalysis(false);
        setChangesModalVisible(true);
      } catch (error) {
        console.error("Error fetching analysis:", error);
        setIsLoadingAnalysis(false);
        // Small delay to ensure modal is closed before showing alert
        setTimeout(() => {
          showAlert(
            MESSAGES.analysisFailedTitle,
            MESSAGES.analysisFailedMessage,
            [{ text: BUTTON_LABELS.ok }],
          );
        }, 100);
      }
    }
  };

  const handleApplyChanges = async () => {
    if (recipe && substitutionChanges && user?.uid && !isApplyingChanges) {
      setIsApplyingChanges(true);
      setChangesModalVisible(false);

      try {
        await saveRecipeModification(
          user.uid,
          recipe.id,
          recipe,
          substitutionChanges,
        );

        const tracker = createModificationTracker(substitutionChanges);

        // Update UI state
        setAppliedModifications(substitutionChanges);
        setModificationTracker(tracker);
        
        // Clear converted units to force recalculation with new quantities
        // This ensures unit conversions are recalculated based on the new ingredient quantities
        setConvertedUnits({});

        // Small delay before showing success
        setTimeout(() => {
          showAlert(MESSAGES.successTitle, MESSAGES.successMessage, [
            { text: BUTTON_LABELS.ok },
          ]);
        }, 100);
      } catch (error) {
        console.error("Error saving modification:", error);
        // Small delay before showing error
        setTimeout(() => {
          showAlert(MESSAGES.saveFailedTitle, MESSAGES.saveFailedMessage, [
            {
              text: BUTTON_LABELS.ok,
              onPress: () => {
                // Re-open the changes modal so user can try again
                setChangesModalVisible(true);
              },
            },
          ]);
        }, 100);
      } finally {
        setIsApplyingChanges(false);
      }
    }
  };

  const displayRecipe = useMemo(() => {
    // If recipe already has modifications applied (loaded from DB), don't apply them again
    if (recipe && recipe.hasModifications) {
      return recipe;
    }
    // Only apply modifications if this is a fresh recipe that needs modifications applied
    if (recipe && appliedModifications) {
      return applyModificationsToRecipe(recipe, appliedModifications);
    }
    return recipe;
  }, [recipe, appliedModifications]);

  React.useEffect(() => {
    if (recipe && recipe.hasModifications && recipe.substitutionChanges) {
      try {
        const tracker = createModificationTracker(recipe.substitutionChanges);

        setAppliedModifications(recipe.substitutionChanges);
        setModificationTracker(tracker);
        
        // Clear converted units to ensure they're recalculated with modified quantities
        setConvertedUnits({});
      } catch (error) {
        console.error("Error loading saved modifications:", error);
      }
    }
  }, [recipe]);

  const convertIngredientsToSystem = useCallback((system: typeof UNIT_SYSTEMS[keyof typeof UNIT_SYSTEMS]) => {
    if (!displayRecipe) return;
    
    const newConvertedUnits: {[key: string]: {unit: string, value: number}} = {};
    
    displayRecipe.ingredients.forEach((ingredient) => {
      if (!ingredient.unit || !ingredient.quantity) return;
      
      if (system === UNIT_SYSTEMS.original) {
        // Clear conversions to show original
        return;
      }
      
      if (isConvertibleUnit(ingredient.unit)) {
        const availableConversions = getAvailableConversions(ingredient.unit);
        const isMetric = system === UNIT_SYSTEMS.metric;
        
        // Filter conversions based on system
        const targetUnits = availableConversions.filter(unit => {
          const metricUnits = ['ml', 'l', 'g', 'kg'];
          const imperialUnits = ['tsp', 'Tbs', 'fl-oz', 'cup', 'pnt', 'qt', 'gal', 'oz', 'lb'];
          
          if (isMetric) {
            return metricUnits.includes(unit);
          } else {
            return imperialUnits.includes(unit);
          }
        });
        
        if (targetUnits.length > 0) {
          // Find the best unit that gives a reasonable value (between 0.1 and 1000)
          let bestUnit = targetUnits[0];
          for (const targetUnit of targetUnits) {
            const result = convertUnit(ingredient.quantity, ingredient.unit, targetUnit);
            if (result.value >= 0.1 && result.value <= 1000) {
              bestUnit = targetUnit;
              break;
            }
          }
          
          const result = convertUnit(ingredient.quantity, ingredient.unit, bestUnit);
          if (result.isConverted) {
            newConvertedUnits[ingredient.name] = {
              unit: result.unit,
              value: result.value
            };
          }
        }
      }
    });
    
    setConvertedUnits(newConvertedUnits);
  }, [displayRecipe]);

  const handleClearModifications = async () => {
    if (recipe && user?.uid) {
      try {
        const restoredRecipe = await deleteRecipeModification(
          user.uid,
          recipe.id,
        );
        if (restoredRecipe) {
          // Clear local state
          setAppliedModifications(null);
          setModificationTracker(null);
          setConvertedUnits({});

          // The recipe will be updated through the Firestore listener
          showAlert(MESSAGES.successTitle, MESSAGES.restoreSuccessMessage);
        }
      } catch (error) {
        console.error("Error deleting modification:", error);
        showAlert(MESSAGES.errorTitle, MESSAGES.restoreFailed);
      }
    }
  };

  if (!recipe || !displayRecipe) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          {/* Loading or error state */}
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <RecipeDetails>
          <Header>
            <Thumbnail imageUrl={displayRecipe.thumbnail} />
            <Header.Title isModified={!!appliedModifications}>
              {displayRecipe.displayTitle}
            </Header.Title>
          </Header>
          <View style={styles.unitSystemToggleContainer}>
            <UnitSystemToggle
              currentSystem={currentUnitSystem}
              onSystemChange={(system) => {
                setCurrentUnitSystem(system);
                globalUnitPrefs.setDefaultSystem(system);
                convertIngredientsToSystem(system);
              }}
            />
          </View>
          {appliedModifications && (
            <View style={styles.resetSection}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleClearModifications}
              >
                <MaterialIcons
                  name={ICON_NAMES.refresh}
                  size={ICON_SIZES.xl}
                  color={COMMON_COLORS.warning}
                />
                <ThemedText style={styles.resetButtonText}>
                  {MESSAGES.resetButtonText}
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}
          <Description>{displayRecipe.displayDescription}</Description>
          <Ingredients>
            {displayRecipe.ingredients.map(
              (ingredient: IngredientType, index: number) => {
                const changeDetail = modificationTracker?.ingredientChanges.get(
                  ingredient.name,
                );
                const convertedUnit = convertedUnits[ingredient.name];
                const displayQuantity = convertedUnit?.value ?? ingredient.quantity;
                
                return (
                  <Ingredient
                    key={index}
                    status={changeDetail?.status}
                    modificationDetail={
                      changeDetail
                        ? {
                            reason: changeDetail.reason,
                            originalQuantity: changeDetail.originalQuantity,
                            originalUnit: changeDetail.originalUnit,
                          }
                        : undefined
                    }
                    ingredientName={ingredient.name}
                    recipeId={recipeId || ''}
                  >
                    <Ingredient.BaseContainer>
                      <Ingredient.Amount value={displayQuantity}>
                        {displayQuantity}
                      </Ingredient.Amount>
                      <Ingredient.Unit 
                        value={ingredient.unit}
                        quantity={ingredient.quantity}
                        ingredientName={ingredient.name}
                        recipeId={recipeId || ''}
                        currentConversion={convertedUnit}
                        onUnitConverted={(unit, value) => {
                          setConvertedUnits(prev => ({
                            ...prev,
                            [ingredient.name]: { unit, value }
                          }));
                        }}
                      >
                        {ingredient.unit}
                      </Ingredient.Unit>
                      <Ingredient.Name
                        isRemoved={
                          changeDetail?.status === MODIFICATION_STATUS.remove
                        }
                      >
                        {ingredient.name}
                      </Ingredient.Name>
                    </Ingredient.BaseContainer>
                    {changeDetail?.status !== MODIFICATION_STATUS.remove && (
                      <Ingredient.SwapIngredientBtn
                        onPress={() => handleSwapPress(ingredient)}
                      />
                    )}
                  </Ingredient>
                );
              },
            )}
          </Ingredients>
          <Instructions>
            {displayRecipe.instructions.map(
              (instruction: InstructionType, index: number) => {
                const changeDetail =
                  modificationTracker?.instructionChanges.get(index);
                return (
                  <Instruction
                    key={index}
                    isModified={!!changeDetail}
                    modificationDetail={changeDetail}
                  >
                    <Instruction.Video
                      videoLink={displayRecipe.videoLink}
                      startTimestamp={instruction.startTimestamp}
                      endTimestamp={instruction.endTimestamp}
                    />
                    <Instruction.Text>
                      {instruction.instruction}
                    </Instruction.Text>
                    {instruction.timer &&
                      instruction.timer.durationMinutes &&
                      instruction.timer.durationMinutes > 0 && (
                        <Instruction.Timer
                          durationMinutes={instruction.timer.durationMinutes}
                        />
                      )}
                  </Instruction>
                );
              },
            )}
          </Instructions>
        </RecipeDetails>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setShoppingListModalVisible(true)}
        >
          <MaterialIcons
            name="add-shopping-cart"
            size={ICON_SIZES.xl}
            color={COMMON_COLORS.white}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <SubstitutionSelectorModal
        visible={selectorModalVisible}
        onClose={() => setSelectorModalVisible(false)}
        ingredientsToReplace={selectedIngredients}
        replacementCandidates={replacementCandidates}
        onConfirm={handleSubstitutionsConfirm}
        isLoading={isLoadingCandidates}
        error={candidatesError}
      />
      <AnalysisLoadingModal visible={isLoadingAnalysis} />
      <SubstitutionChangesModal
        visible={changesModalVisible}
        onClose={() => setChangesModalVisible(false)}
        changes={substitutionChanges}
        onApply={handleApplyChanges}
        ingredientName={selectedSubstitutions[0]?.ingredient || ""}
      />
      <AddToShoppingListModal
        visible={shoppingListModalVisible}
        onClose={() => setShoppingListModalVisible(false)}
        ingredients={displayRecipe.ingredients}
      />
    </ThemedView>
  );
}
