import type { UnitSystem } from "./recipe.types";

export type Language = "en" | "de-at";

export interface User {
  id: string;
  name: string;
  preferredUnit: UnitSystem;
  preferredLanguage: Language;
}
