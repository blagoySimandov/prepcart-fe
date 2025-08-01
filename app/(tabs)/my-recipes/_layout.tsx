import { Stack } from "expo-router";

export default function MyRecipesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[recipeId]" />
    </Stack>
  );
}
