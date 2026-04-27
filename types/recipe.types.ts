export type UnitSystem = "metric" | "imperial";

export type Tag
  = | "breakfast"
    | "lunch"
    | "dinner"
    | "dessert"
    | "snack"
    | "soup"
    | "salad"
    | "pasta"
    | "grill"
    | "baked"
    | "asian"
    | "austrian"
    | "vegetarian"
    | "vegan";

export type Difficulty = "easy" | "medium" | "hard";

export type ScaleMultiplier = 1 | 1.5 | 2 | 2.5;

export interface Macros {
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  macros: Macros;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  tags: Tag[];
  imageUri?: string;
  source?: string;
  isFavorite: boolean;
  ingredients: Ingredient[];
  steps: string[];
  createdAt: string;
  updatedAt: string;
}
