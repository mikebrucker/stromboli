import { useRecipeStore } from "@/stores";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

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
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="recipes" options={{ headerShown: false }} />
      <Stack.Screen name="user" options={{ headerShown: false }} />
      {/* <Stack.Screen name="user/edit" options={{ presentation: "modal", title: "Edit Profile" }} /> */}
      {/* <Stack.Screen name="settings" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
