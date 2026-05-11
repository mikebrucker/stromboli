import type { Accent, ColorMode } from "@/types/theme.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ThemeState {
  colorMode: ColorMode;
  accent: Accent;
  setColorMode: (mode: ColorMode) => void;
  setAccent: (accent: Accent) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      colorMode: "system",
      accent: "amber",
      setColorMode: colorMode => set({ colorMode }),
      setAccent: accent => set({ accent }),
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
