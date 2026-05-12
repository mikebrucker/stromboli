import { useAppTheme } from "@/hooks/useAppTheme";
import { useRecipeStore } from "@/stores/useRecipeStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme, vars } from "nativewind";
import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import "@/lib/i18n";
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
  const { colorMode, accentVars } = useAppTheme();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(colorMode);
  }, []);

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[{ flex: 1 }, vars(accentVars)]}>
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
    </GestureHandlerRootView>
  );
}
