import { ThemedView } from "@/components/ThemedView";
import {
  Ingredient as IngredientType,
  Instruction as InstructionType,
} from "@/src/user/recipes/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { useRecipe } from "./hooks";
import { useStyles } from "./styles";

export default function RecipeScreen() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  const recipe = useRecipe(recipeId || "");
  const { styles } = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientType | null>(null);
  
  const substitutionOptions = useSubstitutionOptions(selectedIngredient?.name || "");
  
  const handleSwapPress = (ingredient: IngredientType) => {
    setSelectedIngredient(ingredient);
    setModalVisible(true);
  };
  
  const handleSubstitutionSelect = (option: SubstitutionOption) => {
    console.log("Selected substitution:", option);
    setModalVisible(false);
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
            <Thumbnail imageUrl={recipe.thumbnail} />
            <Header.Title>{recipe.displayTitle}</Header.Title>
          </Header>
          <Description>{recipe.displayDescription}</Description>
          <Ingredients>
            {recipe.ingredients.map(
              (ingredient: IngredientType, index: number) => (
                <Ingredient key={index}>
                  <Ingredient.BaseContainer>
                    <Ingredient.Amount>{ingredient.quantity}</Ingredient.Amount>
                    <Ingredient.Unit>{ingredient.unit}</Ingredient.Unit>
                    <Ingredient.Name>{ingredient.name}</Ingredient.Name>
                  </Ingredient.BaseContainer>
                  <Ingredient.SwapIngredientBtn
                    onPress={() => handleSwapPress(ingredient)}
                  />
                </Ingredient>
              ),
            )}
          </Ingredients>
          <Instructions>
            {recipe.instructions.map(
              (instruction: InstructionType, index: number) => (
                <Instruction key={index}>
                  <Instruction.Video
                    videoLink={recipe.videoLink}
                    startTimestamp={instruction.startTimestamp}
                    endTimestamp={instruction.endTimestamp}
                  />
                  <Instruction.Text>{instruction.instruction}</Instruction.Text>
                  {instruction.timer &&
                    instruction.timer.durationMinutes &&
                    instruction.timer.durationMinutes > 0 && (
                      <Instruction.Timer
                        durationMinutes={instruction.timer.durationMinutes}
                      />
                    )}
                </Instruction>
              ),
            )}
          </Instructions>
        </RecipeDetails>
      </SafeAreaView>
      {selectedIngredient && (
        <SubstitutionModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          ingredientName={selectedIngredient.name}
          onSelect={handleSubstitutionSelect}
          substitutionOptions={substitutionOptions}
        />
      )}
    </ThemedView>
  );
}
