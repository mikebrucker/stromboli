import { useThemeStore } from "@/stores/useThemeStore";
import { ACCENT_SHADES, type ColorMode } from "@/types/theme.types";
import { useColorScheme } from "nativewind";
import { Appearance } from "react-native";

export function useAppTheme() {
  const { accent, colorMode, setColorMode: storeSet, setAccent } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  const accentVars = Object.fromEntries(
    ACCENT_SHADES.map(shade => [`--accent-${shade}`, `var(--color-${accent}-${shade})`]),
  );

  return {
    accent,
    colorMode,
    accentVars,
    setColorMode: (mode: ColorMode) => {
      storeSet(mode);
      setColorScheme(mode);
      if (mode === "system") {
        setColorScheme(Appearance.getColorScheme() === "dark" ? "dark" : "light");
      }
    },
    setAccent,
  };
}
