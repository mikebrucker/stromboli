import type { Recipe, Tag } from "@/types/recipe.types";
import { useState } from "react";

export function useRecipeFilter(recipes: Array<Recipe>) {
  const [activeTags, setActiveTags] = useState<Array<Tag>>([]);

  const toggleTag = (tag: Tag) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };

  const filteredRecipes = activeTags.length === 0 ? recipes : recipes.filter(r => activeTags.every(t => r.tags.includes(t)));

  return { filteredRecipes, activeTags, toggleTag };
}
