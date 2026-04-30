import type { UnitSystem } from "./recipe.types";

export const Languages = { en: "en", de: "de" } as const;
export type Language = keyof typeof Languages;

export interface User {
  id: string;
  name: string;
  preferredUnit: UnitSystem;
  preferredLanguage: Language;
}
