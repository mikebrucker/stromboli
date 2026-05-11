import { RecipeFilter, RecipeGrid } from "@/components/recipe";
import { TAGS } from "@/constants/Tags";
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
        tags={TAGS}
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
