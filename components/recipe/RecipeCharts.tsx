import { BarChart, PieChart } from "@/components/charts";
import type { Recipe } from "@/types";

interface Props {
  recipe: Recipe;
}

export default function RecipeCharts({ recipe }: Props) {
  const macroData = [
    {
      id: "1",
      label: "Protein",
      value: recipe.ingredients.reduce((s, i) => s + i.macros.protein, 0),
      color: "#f59e0b",
    },
    {
      id: "2",
      label: "Carbs",
      value: recipe.ingredients.reduce((s, i) => s + i.macros.carbs, 0),
      color: "#10b981",
    },
    {
      id: "3",
      label: "Fat",
      value: recipe.ingredients.reduce((s, i) => s + i.macros.fat, 0),
      color: "#ef4444",
    },
  ];

  const calorieData = recipe.ingredients.map(i => ({
    label: i.name,
    value: i.calories,
  }));

  return (
    <>
      <PieChart data={macroData} title="Macro Split" />
      <BarChart data={calorieData} title="Calories per Ingredient" unit="kcal" />
    </>
  );
}
