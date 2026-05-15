export const ColorSchemes = { system: "system", light: "light", dark: "dark" } as const;
export type ColorScheme = keyof typeof ColorSchemes;
export const colorSchemes: Array<ColorScheme> = Object.values(ColorSchemes);

export const Themes = {
  slate: "slate",
  gray: "gray",
  zinc: "zinc",
  neutral: "neutral",
  stone: "stone",
  red: "red",
  orange: "orange",
  amber: "amber",
  yellow: "yellow",
  lime: "lime",
  green: "green",
  emerald: "emerald",
  teal: "teal",
  cyan: "cyan",
  sky: "sky",
  blue: "blue",
  indigo: "indigo",
  violet: "violet",
  purple: "purple",
  fuchsia: "fuchsia",
  pink: "pink",
  rose: "rose",
} as const;
export type Theme = keyof typeof Themes;
export const themes: Array<Theme> = Object.values(Themes);
export const THEME_SHADES_DARK = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export const THEME_SHADES_LIGHT = [950, 900, 800, 700, 600, 500, 400, 300, 200, 100, 50] as const;
