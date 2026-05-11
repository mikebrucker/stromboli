import { useRecipeStore } from "@/stores/useRecipeStore";
import { useLocalSearchParams } from "expo-router";
import { lazy, Suspense } from "react";
import { Platform, ScrollView, Text, View } from "react-native";

const RecipeCharts = Platform.OS === "web" ? lazy(async () => {
  const { LoadSkiaWeb } = await import("@shopify/react-native-skia/lib/module/web");
  await LoadSkiaWeb({ locateFile: () => "/canvaskit.wasm" });
  return import("@/components/recipe/RecipeCharts");
}) : lazy(() => import("@/components/recipe/RecipeCharts"));

export default function RecipeDetailScreen() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  const getRecipeById = useRecipeStore(state => state.getRecipeById);
  const recipe = getRecipeById(recipeId);

  if (!recipe) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4 gap-6">
        <Text className="text-2xl font-bold text-gray-900">{recipe.title}</Text>
        <Text className="text-gray-500">{recipe.description}</Text>
        <Suspense fallback={null}>
          <RecipeCharts recipe={recipe} />
        </Suspense>
      </View>
    </ScrollView>
  );
}
