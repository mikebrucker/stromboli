import { Stack } from "expo-router";

export default function RecipesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="add" options={{ presentation: "modal", headerShown: false }} />
      <Stack.Screen name="[recipeId]/index" options={{ headerShown: false }} />
    </Stack>
  );
}
