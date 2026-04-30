import type { Recipe, ScaleMultiplier } from "@/types";

export function scaleRecipe(recipe: Recipe, multiplier: ScaleMultiplier = 1): Recipe {
  if (multiplier === 1) return recipe;

  return {
    ...recipe,
    servings: recipe.servings * multiplier,
    ingredients: recipe.ingredients.map(ingredient => ({
      ...ingredient,
      amount: ingredient.amount * multiplier,
      calories: ingredient.calories * multiplier,
      macros: {
        protein: ingredient.macros.protein * multiplier,
        carbs: ingredient.macros.carbs * multiplier,
        fat: ingredient.macros.fat * multiplier,
      },
    })),
  };
}
