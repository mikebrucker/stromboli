import type { ColorScheme, Theme } from "@/types/theme.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ThemeState {
  colorScheme: ColorScheme;
  setColorScheme: (mode: ColorScheme) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      colorScheme: "system",
      setColorScheme: colorScheme => set({ colorScheme }),
      theme: "amber",
      setTheme: theme => set({ theme }),
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
