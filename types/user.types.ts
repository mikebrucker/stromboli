import type { UnitSystem } from "./recipe.types";

export type Language = "en" | "de";

export interface User {
  id: string;
  name: string;
  preferredUnit: UnitSystem;
  preferredLanguage: Language;
}
