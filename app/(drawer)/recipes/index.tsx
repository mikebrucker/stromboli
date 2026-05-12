import { RecipeFilter } from "@/components/recipe/RecipeFilter";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";
import { useRecipeFilter } from "@/hooks/useRecipeFilter";
import { useRecipeStore } from "@/stores/useRecipeStore";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function RecipesScreen() {
  const router = useRouter();
  const recipes = useRecipeStore(state => state.recipes);
  const { filteredRecipes, activeTags, toggleTag } = useRecipeFilter(recipes);

  return (
    <View className="flex-1 bg-gray-50">
      <RecipeFilter
        activeTags={activeTags}
        onToggleTag={toggleTag}
      />
      <RecipeGrid
        recipes={filteredRecipes}
        onPressRecipe={id => { router.push(`/recipes/${id}`); }}
      />
    </View>
  );
}
