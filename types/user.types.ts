import { Language } from "@/types/app.types";
import type { UnitSystem } from "@/types/recipe.types";

export interface User {
  id: string;
  name: string;
  preferredUnit: UnitSystem;
  preferredLanguage: Language;
}
