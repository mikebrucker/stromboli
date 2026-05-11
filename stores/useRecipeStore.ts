import { seeds } from "@/data/seeds";
import type { Recipe } from "@/types/recipe.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RecipeState {
  recipes: Array<Recipe>;
  seeded: boolean;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: string, updates: Partial<Recipe>) => void;
  removeRecipe: (id: string) => void;
  toggleFavorite: (id: string) => void;
  seedRecipes: () => void;
  getRecipeById: (id: string) => Recipe | undefined;
}

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      recipes: [],
      seeded: false,
      addRecipe: recipe =>
        set(state => ({ recipes: [...state.recipes, recipe] })),
      updateRecipe: (id, updates) =>
        set(state => ({
          recipes: state.recipes.map(r =>
            r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r,
          ),
        })),
      removeRecipe: id =>
        set(state => ({
          recipes: state.recipes.filter(r => r.id !== id),
        })),
      toggleFavorite: id =>
        set(state => ({
          recipes: state.recipes.map(r =>
            r.id === id ? { ...r, isFavorite: !r.isFavorite } : r,
          ),
        })),
      seedRecipes: () => {
        const state = get();
        if (!state.seeded || state.recipes.length === 0) {
          set({ recipes: seeds, seeded: true });
        }
      },
      getRecipeById: id => get().recipes.find(r => r.id === id),
    }),
    {
      name: "recipe-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
