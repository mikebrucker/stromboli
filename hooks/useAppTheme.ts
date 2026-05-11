import { useThemeStore } from "@/stores/useThemeStore";
import type { ColorMode } from "@/types/theme.types";
import { useColorScheme } from "nativewind";
import colors from "tailwindcss/colors";

export function useAppTheme() {
  const { accent, colorMode, setColorMode: storeSet, setAccent } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  return {
    accent,
    colorMode,
    accentVars: colors[accent],
    setColorMode: (mode: ColorMode) => {
      storeSet(mode);
      setColorScheme(mode);
    },
    setAccent,
  };
}
