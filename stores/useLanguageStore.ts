import i18n from "@/lib/i18n";
import type { Language } from "@/types/app.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    set => ({
      language: "en",
      setLanguage: language => {
        void i18n.changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: "language-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
