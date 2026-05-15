import { getThemeShades } from "@/helpers/themeHelper";
import { useAppTheme } from "@/hooks/useAppTheme";
import "@/lib/i18n";
import "@/lib/iconInterop";
import { useRecipeStore } from "@/stores/useRecipeStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme, vars } from "nativewind";
import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "react-native-reanimated";
// eslint-disable-next-line no-restricted-imports
import "../global.css";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const seedRecipes = useRecipeStore(state => state.seedRecipes);
  const { colorScheme, internalColorScheme, theme } = useAppTheme();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    if (internalColorScheme !== "system") setColorScheme(internalColorScheme);
  }, [internalColorScheme]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      seedRecipes();
      SplashScreen.hideAsync();
    }
  }, [loaded, seedRecipes]);

  if (!loaded) return null;
  const themeShades = getThemeShades(colorScheme === "dark");

  // [ 0,   1,   2,   3, 400, 500, 600, 700, 800, 900,  10]
  // [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const themeVars = {
    "--color-background": `var(--color-${theme}-${themeShades[10]})`,
    "--color-surface": `var(--color-${theme}-${themeShades[9]})`,
    "--color-surface-raised": `var(--color-${theme}-${themeShades[8]})`,
    "--color-foreground": `var(--color-${theme}-${themeShades[0]})`,
    "--color-muted": `var(--color-${theme}-${themeShades[4]})`,
    "--color-muted-fg": `var(--color-${theme}-${themeShades[5]})`,
    "--color-border": `var(--color-${theme}-${themeShades[8]})`,
    ...Object.fromEntries(themeShades.map(shade => [`--accent-${shade}`, `var(--color-${theme}-${shade})`])),
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1" style={vars(themeVars)}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(drawer)"
            options={{ headerShown: false }}
          />
        </Stack>
      </View>
      <PortalHost />
    </GestureHandlerRootView>
  );
}
