import { Drawer } from "expo-router/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useNavigationState } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { t } from "i18next";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function DrawerBackButton() {
  const router = useRouter();
  const stackIndex = useNavigationState(state => {
    const activeRoute = state.routes[state.index];
    return activeRoute.state?.index ?? 0;
  });

  if (stackIndex === 0) return null;

  return (
    <Pressable onPress={() => router.back()}>
      <MaterialCommunityIcons name="arrow-left" size={24} />
    </Pressable>
  );
}

function DrawerMenuButton() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <MaterialCommunityIcons name="menu" size={24} />
    </Pressable>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerPosition: "right",
        headerTitleAlign: "center",
        headerLeft: () => <DrawerBackButton />,
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerRight: () => <DrawerMenuButton />,
        headerRightContainerStyle: { paddingRight: 16 },
      }}
    >
      <Drawer.Screen
        name="recipes"
        options={{ title: t("drawer.recipes") }}
      />
      <Drawer.Screen
        name="user"
        options={{ title: t("drawer.user") }}
      />
    </Drawer>
  );
}
