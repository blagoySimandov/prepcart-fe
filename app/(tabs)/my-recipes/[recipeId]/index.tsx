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
import { SubstitutionModal } from "./components/substitution-modal";
import { useSubstitutionOptions } from "./components/substitution-modal/hooks";
import { SubstitutionOption } from "./components/substitution-modal/types";
import { SubstitutionChangesModal } from "./components/substitution-changes";
import { useSubstitutionChanges } from "./components/substitution-changes/hooks";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [changesModalVisible, setChangesModalVisible] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<IngredientType | null>(null);
  const [selectedSubstitution, setSelectedSubstitution] =
    useState<SubstitutionOption | null>(null);
  const [appliedModifications, setAppliedModifications] = useState<
    typeof substitutionChanges | null
  >(null);
  const [modificationTracker, setModificationTracker] =
    useState<ModificationTracker | null>(null);

  const substitutionOptions = useSubstitutionOptions(
    selectedIngredient?.name || "",
  );
  const substitutionChanges = useSubstitutionChanges(
    selectedIngredient?.name || "",
    selectedSubstitution?.name || null,
  );

  const handleSwapPress = (ingredient: IngredientType) => {
    setSelectedIngredient(ingredient);
    setModalVisible(true);
  };

  const handleSubstitutionSelect = (option: SubstitutionOption) => {
    setSelectedSubstitution(option);
    setModalVisible(false);
    setChangesModalVisible(true);
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
      {selectedIngredient && (
        <>
          <SubstitutionModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            ingredientName={selectedIngredient.name}
            onSelect={handleSubstitutionSelect}
            substitutionOptions={substitutionOptions}
          />
          <SubstitutionChangesModal
            visible={changesModalVisible}
            onClose={() => setChangesModalVisible(false)}
            changes={substitutionChanges}
            onApply={handleApplyChanges}
            ingredientName={selectedIngredient.name}
          />
        </>
      )}
    </ThemedView>
  );
}
