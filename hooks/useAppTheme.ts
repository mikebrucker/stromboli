import { useThemeStore } from "@/stores/useThemeStore";
import { type ColorScheme } from "@/types/theme.types";
import { useColorScheme } from "nativewind";
import { Appearance } from "react-native";

export function useAppTheme() {
  const { theme, colorScheme, setColorScheme: storeSet, setTheme } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  return {
    theme,
    setTheme,
    colorScheme: colorScheme !== "system" ? colorScheme : (Appearance.getColorScheme() === "dark" ? "dark" : "light"),
    internalColorScheme: colorScheme,
    setColorScheme: (scheme: ColorScheme) => {
      storeSet(scheme);
      setColorScheme(scheme);
      if (scheme === "system") {
        setColorScheme(Appearance.getColorScheme() === "dark" ? "dark" : "light");
      }
    },
  };
}
