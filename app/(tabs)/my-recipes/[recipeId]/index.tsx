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
import { useSubstitutionChanges } from "./components/substitution-changes/hooks";
import { fetchReplacementCandidates, SubstitutionTarget } from "./services/substitution-webhook";
import {
  reconcileRecipeWithModifications,
  ModificationTracker,
} from "./utils/recipe-reconciliation";
import { useRecipe } from "./hooks";
import { useStyles } from "./styles";
import { ThemedText } from "@/components/ThemedText";

export default function RecipeScreen() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  const recipe = useRecipe(recipeId || "");
  const { styles } = useStyles();
  const [selectorModalVisible, setSelectorModalVisible] = useState(false);
  const [changesModalVisible, setChangesModalVisible] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedSubstitutions, setSelectedSubstitutions] = useState<SubstitutionSelection[]>([]);
  const [replacementCandidates, setReplacementCandidates] = useState<SubstitutionTarget[]>([]);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(false);
  const [candidatesError, setCandidatesError] = useState<string | null>(null);
  const [appliedModifications, setAppliedModifications] = useState<
    typeof substitutionChanges | null
  >(null);
  const [modificationTracker, setModificationTracker] =
    useState<ModificationTracker | null>(null);

  const substitutionChanges = useSubstitutionChanges(
    selectedSubstitutions[0]?.ingredient || "",
    selectedSubstitutions[0]?.selectedCandidate || null,
  );

  const handleSwapPress = async (ingredient: IngredientType) => {
    if (!recipe) return;
    
    setSelectedIngredients([ingredient.name]);
    setSelectorModalVisible(true);
    setIsLoadingCandidates(true);
    setCandidatesError(null);
    
    try {
      const response = await fetchReplacementCandidates(recipe, [ingredient.name]);
      setReplacementCandidates(response.replacementCandidates);
    } catch (error) {
      setCandidatesError("Failed to load substitution options");
      console.error("Error fetching candidates:", error);
    } finally {
      setIsLoadingCandidates(false);
    }
  };

  const handleSubstitutionsConfirm = (selections: SubstitutionSelection[]) => {
    setSelectedSubstitutions(selections);
    setSelectorModalVisible(false);
    
    const hasSubstitutions = selections.some(s => s.selectedCandidate !== null);
    if (hasSubstitutions) {
      setChangesModalVisible(true);
    }
  };

  const handleApplyChanges = () => {
    if (recipe && substitutionChanges) {
      const result = reconcileRecipeWithModifications(
        recipe,
        substitutionChanges.recipeModifications,
      );
      setAppliedModifications(substitutionChanges);
      setModificationTracker(result.tracker);
      setChangesModalVisible(false);
    }
  };

  const displayRecipe =
    appliedModifications && recipe
      ? reconcileRecipeWithModifications(
          recipe,
          appliedModifications.recipeModifications,
        ).modifiedRecipe
      : recipe;

  const handleClearModifications = () => {
    setAppliedModifications(null);
    setModificationTracker(null);
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
                <ThemedText style={styles.resetButtonText}>Reset to Original Recipe</ThemedText>
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
                    modificationDetail={changeDetail ? {
                      reason: changeDetail.reason,
                      originalQuantity: changeDetail.originalQuantity,
                      originalUnit: changeDetail.originalUnit,
                    } : undefined}
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
                const changeDetail = modificationTracker?.instructionChanges.get(index);
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
      {selectedSubstitutions.length > 0 && (
        <SubstitutionChangesModal
          visible={changesModalVisible}
          onClose={() => setChangesModalVisible(false)}
          changes={substitutionChanges}
          onApply={handleApplyChanges}
          ingredientName={selectedSubstitutions[0]?.ingredient || ""}
        />
      )}
    </ThemedView>
  );
}
