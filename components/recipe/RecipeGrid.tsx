import type { Recipe } from "@/types/recipe.types";
import { FlatList, Text, View } from "react-native";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  recipes: Array<Recipe>;
  onPressRecipe: (id: string) => void;
}

export function RecipeGrid({ recipes, onPressRecipe }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <View className="flex-1 items-center justify-center mt-20">
        <Text className="text-4xl mb-3">🥘</Text>
        <Text className="text-gray-500 text-base">No recipes found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <RecipeCard recipe={item} onPress={onPressRecipe} />
      )}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
