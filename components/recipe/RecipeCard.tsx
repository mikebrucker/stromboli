import type { Recipe } from "@/types/recipe.types";
import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, View } from "react-native";

interface RecipeCardProps {
  recipe: Recipe;
  onPress: (id: string) => void;
}

export function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const { t } = useTranslation();
  const totalCalories = recipe.ingredients.reduce((sum, i) => sum + i.calories, 0);
  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  return (
    <Pressable
      onPress={() => { onPress(recipe.id); }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm mb-4 active:opacity-70"
    >
      {recipe.imageUri ? (
        <Image
          source={{ uri: recipe.imageUri }}
          className="w-full h-40"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-40 bg-amber-100 items-center justify-center">
          <Text className="text-4xl">🍽️</Text>
        </View>
      )}

      <View className="p-3">
        <Text className="text-lg font-bold text-gray-900" numberOfLines={1}>
          {recipe.title}
        </Text>
        <Text className="text-sm text-gray-500 mt-1" numberOfLines={2}>
          {recipe.description}
        </Text>

        <View className="flex-row items-center justify-between mt-3">
          <View className="flex-row gap-3">
            <Text className="text-xs text-gray-400">
              ⏱
              {totalMinutes}
              {t("unit.minute")}
            </Text>
            <Text className="text-xs text-gray-400">
              🔥
              {totalCalories}
              {" "}
              {t("unit.kcal")}
            </Text>
          </View>
          <DifficultyBadge difficulty={recipe.difficulty} />
        </View>

        {recipe.tags.length > 0 && (
          <View className="flex-row flex-wrap gap-1 mt-2">
            {recipe.tags.slice(0, 3).map(tag => (
              <View key={tag} className="bg-amber-50 rounded-full px-2 py-0.5">
                <Text className="text-xs text-amber-700">{t(`tags.${tag}`)}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: Recipe["difficulty"] }) {
  const { t } = useTranslation();
  const styles: Record<Recipe["difficulty"], string> = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  return (
    <View className={`rounded-full px-2 py-0.5 ${styles[difficulty].split(" ")[0]}`}>
      <Text className={`text-xs ${styles[difficulty].split(" ")[1]}`}>
        {t(`difficulty.${difficulty}`)}
      </Text>
    </View>
  );
}
