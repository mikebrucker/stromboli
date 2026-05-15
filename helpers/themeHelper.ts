import { THEME_SHADES_DARK, THEME_SHADES_LIGHT } from "@/types/theme.types";

/** `themeShades[0-10]:` `50, 100, 200, 300 ... 900, 950` */
export const getThemeShades = (isDark = false) => isDark ? THEME_SHADES_DARK : THEME_SHADES_LIGHT;
