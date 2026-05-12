import { BarChart } from "@/components/chart/BarChart";
import { PieChart } from "@/components/chart/PieChart";
import type { Recipe } from "@/types/recipe.types";
import { useTranslation } from "react-i18next";

interface Props {
  recipe: Recipe;
}

export default function RecipeCharts({ recipe }: Props) {
  const { t } = useTranslation();

  const macroData = [
    {
      id: "1",
      label: t("recipe.macros.protein"),
      value: recipe.ingredients.reduce((s, i) => s + i.macros.protein, 0),
      color: "#f59e0b",
    },
    {
      id: "2",
      label: t("recipe.macros.carbs"),
      value: recipe.ingredients.reduce((s, i) => s + i.macros.carbs, 0),
      color: "#10b981",
    },
    {
      id: "3",
      label: t("recipe.macros.fat"),
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
      <PieChart data={macroData} title={t("recipe.macroSplit")} />
      <BarChart data={calorieData} title={t("recipe.caloriesPerIngredient")} unit="kcal" />
    </>
  );
}
