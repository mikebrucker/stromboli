import type { Recipe, Tag } from "@/types";
import { useState } from "react";

export function useRecipeFilter(recipes: Recipe[]) {
  const [activeTags, setActiveTags] = useState<Tag[]>([]);

  const toggleTag = (tag: Tag) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };

  const filteredRecipes = activeTags.length === 0
    ? recipes
    : recipes.filter(r => activeTags.every(t => r.tags.includes(t)));

  return { filteredRecipes, activeTags, toggleTag };
}
