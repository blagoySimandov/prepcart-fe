import { Recipe } from "@/src/user/recipes/types";
import React from "react";
const Header = RecipeDetails.Header;

export default function RecipeScreen() {
  const recipe:Recipe = useRecipe(recipeId);
  return (
    <RecipeDetails>
      <Header>
        <RecipeDetails.Thumbnail />
        <Header.Title>recipe.displayTitle</Header.Title>
      </Header>
      <RecipeDetails.Description>recipe.displayDescription</RecipeDetails.Description>
      <RecipeDetails.Ingredients>
        {recipe.ingredients.map((ingredient, index) => (
          <RecipeDetails.Ingredient key={index}>
          <RecipeDetails.Ingredient.BaseContainer key={index}>
            <RecipeDetails.Ingredient.Amount>
              {ingredient.amount}
            </RecipeDetails.Ingredient.Amount>  
            <RecipeDetails.Ingredient.Unit>
              {ingredient.unit}
            </RecipeDetails.Ingredient.Unit>
            <RecipeDetails.Ingredient.Name>
              {ingredient.name}
            </RecipeDetails.Ingredient.Name> 
          </RecipeDetails.Ingredient.BaseContainer>
            <RecipeDetails.Ingredient.SwapIngredientBtn/>
          </RecipeDetails.Ingredient>
        ))}
      </RecipeDetails.Ingredient>
      <RecipeDetails.Instructions>
        {recipe.instructions.map((instruction, index) => (
          <RecipeDetails.Instruction key={index}>
            <RecipeDetails.Instruction.Video/>
            <RecipeDetails.Instruction.Text>
            {instruction}
            </RecipeDetails.Instruction.Text>
           if recipe.timer && recipe.timer.durationMinutes > 0 </RecipeDetails.Instruction.Timer>
        ))}
      </RecipeDetails.Instructions>
    </RecipeDetails>
  );
}
