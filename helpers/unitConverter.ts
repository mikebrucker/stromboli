import { CountUnits } from "@/types";
import type { ImperialUnit, MetricUnit, Unit } from "@/types";

interface ConvertedUnit {
  amount: number;
  unit: Unit;
}

const METRIC_TO_IMPERIAL: Record<MetricUnit, { factor: number; unit: ImperialUnit }> = {
  g: { factor: 0.035274, unit: "oz" },
  kg: { factor: 2.20462, unit: "lb" },
  ml: { factor: 0.033814, unit: "fl_oz" },
  l: { factor: 4.22675, unit: "cup" },
  cm: { factor: 0.393701, unit: "in" },
};

const IMPERIAL_TO_METRIC: Record<ImperialUnit, { factor: number; unit: MetricUnit }> = {
  oz: { factor: 28.3495, unit: "g" },
  lb: { factor: 453.592, unit: "g" },
  fl_oz: { factor: 29.5735, unit: "ml" },
  cup: { factor: 236.588, unit: "ml" },
  tbsp: { factor: 14.7868, unit: "ml" },
  tsp: { factor: 4.92892, unit: "ml" },
  in: { factor: 2.54, unit: "cm" },
};

export function toImperial(amount: number, unit: Unit): ConvertedUnit {
  if (unit in CountUnits) return { amount, unit };
  const conversion = METRIC_TO_IMPERIAL[unit as MetricUnit];
  return { amount: amount * conversion.factor, unit: conversion.unit };
}

export function toMetric(amount: number, unit: Unit): ConvertedUnit {
  if (unit in CountUnits) return { amount, unit };
  const conversion = IMPERIAL_TO_METRIC[unit as ImperialUnit];
  return { amount: amount * conversion.factor, unit: conversion.unit };
}
