export const UnitSystems = { metric: "metric", imperial: "imperial" } as const;
export type UnitSystem = keyof typeof UnitSystems;

export const Tags = {
  breakfast: "breakfast",
  lunch: "lunch",
  dinner: "dinner",
  dessert: "dessert",
  snack: "snack",
  soup: "soup",
  salad: "salad",
  pasta: "pasta",
  grill: "grill",
  baked: "baked",
  asian: "asian",
  austrian: "austrian",
  vegetarian: "vegetarian",
  vegan: "vegan",
} as const;
export type Tag = keyof typeof Tags;

export const Difficulties = { easy: "easy", medium: "medium", hard: "hard" } as const;
export type Difficulty = keyof typeof Difficulties;

export const MetricUnits = { g: "g", kg: "kg", ml: "ml", l: "l", cm: "cm" } as const;
export type MetricUnit = keyof typeof MetricUnits;

export const ImperialUnits = {
  oz: "oz",
  lb: "lb",
  fl_oz: "fl_oz",
  cup: "cup",
  tbsp: "tbsp",
  tsp: "tsp",
  in: "in",
} as const;
export type ImperialUnit = keyof typeof ImperialUnits;

export const CountUnits = {
  piece: "piece",
  clove: "clove",
  pinch: "pinch",
  slice: "slice",
  whole: "whole",
} as const;
export type CountUnit = keyof typeof CountUnits;

export const Units = { ...MetricUnits, ...ImperialUnits, ...CountUnits } as const;
export type Unit = keyof typeof Units;

export const ScaleMultipliers = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4] as const;
export type ScaleMultiplier = typeof ScaleMultipliers[number];

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: Unit;
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
  tags: Array<Tag>;
  imageUri?: string;
  source?: string;
  isFavorite: boolean;
  ingredients: Array<Ingredient>;
  steps: Array<string>;
  createdAt: string;
  updatedAt: string;
}
