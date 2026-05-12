import { Tags, type Tag } from "@/types/recipe.types";
import { Pressable, ScrollView, Text } from "react-native";

interface RecipeFilterProps {
  activeTags: Array<Tag>;
  onToggleTag: (tag: Tag) => void;
}

export function RecipeFilter({ activeTags, onToggleTag }: RecipeFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="py-2"
      contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
    >
      {Object.values(Tags).map(tag => {
        const isActive = activeTags.includes(tag);
        return (
          <Pressable
            key={tag}
            onPress={() => { onToggleTag(tag); }}
            className={`rounded-full px-4 py-1.5 active:opacity-70 ${
              isActive ? "bg-amber-500" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-sm capitalize font-medium ${
                isActive ? "text-white" : "text-gray-600"
              }`}
            >
              {tag}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
