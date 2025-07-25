import { ThemedView } from "@/components/ThemedView";
import {
  Ingredient as IngredientType,
  Instruction as InstructionType,
} from "@/src/user/recipes/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
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
} from "./components";
import { SubstitutionSelectorModal } from "./components/substitution-selector";
import { SubstitutionSelection } from "./components/substitution-selector/types";
import { SubstitutionChangesModal } from "./components/substitution-changes";
import { SubstitutionChanges } from "./components/substitution-changes/types";
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
  getRecipeModification,
  deleteRecipeModification,
} from "./services/recipe-modifications-firestore";
import { useAuth } from "@/src/auth/hooks";
import {
  reconcileRecipeWithModifications,
  ModificationTracker,
} from "./utils/recipe-reconciliation";
import { useRecipe } from "./hooks";
import { useStyles } from "./styles";
import { ThemedText } from "@/components/ThemedText";
import { useOnceAsync } from "@/src/utils";

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

  const [substitutionChanges, setSubstitutionChanges] =
    useState<SubstitutionChanges | null>(null);
  const { user } = useAuth();

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
      setCandidatesError("Failed to load substitution options");
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
      try {
        const substitutionRequests: SubstitutionRequest[] = selections.map(
          (s) => ({
            original: s.ingredient,
            replacement: s.selectedCandidate,
          }),
        );

        const analysis = await fetchSubstitutionAnalysis(
          recipe,
          substitutionRequests,
        );
        setSubstitutionChanges(analysis);
        setChangesModalVisible(true);
      } catch (error) {
        console.error("Error fetching analysis:", error);
      } finally {
      }
    }
  };

  const handleApplyChanges = async () => {
    if (recipe && substitutionChanges && user?.uid) {
      const result = reconcileRecipeWithModifications(
        recipe,
        substitutionChanges.recipeModifications,
      );
      setAppliedModifications(substitutionChanges);
      setModificationTracker(result.tracker);
      setChangesModalVisible(false);

      // Save to Firestore
      try {
        await saveRecipeModification(
          user.uid,
          recipe.id,
          recipe,
          substitutionChanges,
        );
      } catch (error) {
        console.error("Error saving modification:", error);
      }
    }
  };

  const displayRecipe =
    appliedModifications && recipe
      ? reconcileRecipeWithModifications(
          recipe,
          appliedModifications.recipeModifications,
        ).modifiedRecipe
      : recipe;

  // Load saved modifications on mount
  useOnceAsync(async () => {
    if (recipe && user?.uid && !appliedModifications) {
      try {
        const savedModification = await getRecipeModification(
          user.uid,
          recipe.id,
        );
        if (savedModification) {
          const result = reconcileRecipeWithModifications(
            recipe,
            savedModification.substitutionChanges.recipeModifications,
          );
          setAppliedModifications(savedModification.substitutionChanges);
          setModificationTracker(result.tracker);
        }
      } catch (error) {
        console.error("Error loading saved modifications:", error);
      }
    }
  });

  const handleClearModifications = async () => {
    setAppliedModifications(null);
    setModificationTracker(null);

    // Delete from Firestore
    if (recipe && user?.uid) {
      try {
        await deleteRecipeModification(user.uid, recipe.id);
      } catch (error) {
        console.error("Error deleting modification:", error);
      }
    }
  };

  if (!recipe) {
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
          {appliedModifications && (
            <View style={styles.resetSection}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleClearModifications}
              >
                <MaterialIcons name="refresh" size={20} color="#FF9944" />
                <ThemedText style={styles.resetButtonText}>
                  Reset to Original Recipe
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
                  >
                    <Ingredient.BaseContainer>
                      <Ingredient.Amount>
                        {ingredient.quantity}
                      </Ingredient.Amount>
                      <Ingredient.Unit>{ingredient.unit}</Ingredient.Unit>
                      <Ingredient.Name>{ingredient.name}</Ingredient.Name>
                    </Ingredient.BaseContainer>
                    <Ingredient.SwapIngredientBtn
                      onPress={() => handleSwapPress(ingredient)}
                    />
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
      <SubstitutionChangesModal
        visible={changesModalVisible}
        onClose={() => setChangesModalVisible(false)}
        changes={substitutionChanges}
        onApply={handleApplyChanges}
        ingredientName={selectedSubstitutions[0]?.ingredient || ""}
      />
    </ThemedView>
  );
}
