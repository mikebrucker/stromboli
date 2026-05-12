import { Str } from "@/components/i18n/Str";
import { Accordion } from "@/components/ui/Accordion";
import { classNames } from "@/helpers/genericHelper";
import { useAppTheme } from "@/hooks/useAppTheme";
import type { ColorMode } from "@/types/theme.types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerActions, useNavigation, useNavigationState } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { t } from "i18next";
import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";

type MaterialCommunityIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const COLOR_MODE_OPTIONS: Array<{ mode: ColorMode; icon: MaterialCommunityIconName }> = [
  { mode: "system", icon: "theme-light-dark" },
  { mode: "light", icon: "white-balance-sunny" },
  { mode: "dark", icon: "moon-waning-crescent" },
];

function DrawerBackButton() {
  const router = useRouter();
  const stackIndex = useNavigationState(state => {
    const activeRoute = state.routes[state.index];
    return activeRoute.state?.index ?? 0;
  });

  if (stackIndex === 0) return null;

  return (
    <Pressable onPress={() => router.back()}>
      <MaterialCommunityIcons name="arrow-left" size={24} className="text-foreground" />
    </Pressable>
  );
}

function DrawerMenuButton() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <MaterialCommunityIcons name="menu" size={24} className="text-foreground" />
    </Pressable>
  );
}

interface ColorModeOptionProps {
  mode: ColorMode;
  icon: MaterialCommunityIconName;
  active: boolean;
  onPress: () => void;
}

function ColorModeOption({ mode, icon, active, onPress }: ColorModeOptionProps) {
  const optionClassName = classNames({
    "flex-row items-center p-3": true,
    "opacity-100": active,
    "opacity-60": !active,
  });

  return (
    <Pressable onPress={onPress} className={optionClassName}>
      <MaterialCommunityIcons name={icon} size={20} className="text-foreground" />
      <Str className="ml-3 text-foreground">mode.{mode}</Str>
    </Pressable>
  );
}

function ColorModeAccordion() {
  const { colorMode, setColorMode } = useAppTheme();

  const activeOption = COLOR_MODE_OPTIONS.find(option => option.mode === colorMode) ?? COLOR_MODE_OPTIONS[0];

  return (
    <View className="mt-2">
      <Accordion
        header={(
          <View className="flex-row items-center">
            <MaterialCommunityIcons name={activeOption.icon} size={20} className="text-foreground" />
            <Str className="ml-3 text-foreground">mode.{activeOption.mode}</Str>
          </View>
        )}
      >
        {COLOR_MODE_OPTIONS.map(({ mode, icon }) => (
          <ColorModeOption
            key={mode}
            mode={mode}
            icon={icon}
            active={colorMode === mode}
            onPress={() => setColorMode(mode)}
          />
        ))}
      </Accordion>
    </View>
  );
}

function CustomDrawerItemList({ state, navigation, descriptors }: DrawerContentComponentProps) {
  return (
    <>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;

        const itemClassName = classNames({
          "flex-row items-center px-4 py-3 rounded-lg mx-2 my-0.5": true,
          "bg-surface-raised": focused,
        });

        const labelClassName = classNames({
          "text-base": true,
          "text-foreground font-semibold": focused,
          "text-muted": !focused,
        });

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            className={itemClassName}
          >
            <Text className={labelClassName}>{label}</Text>
          </Pressable>
        );
      })}
    </>
  );
}

function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} className="bg-surface">
      <CustomDrawerItemList {...props} />
      <ColorModeAccordion />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  // todo system fix
  const { colorMode } = useAppTheme();
  let backgroundColor = "#999";
  switch (colorMode) {
    case "dark": {
      backgroundColor = "#333";
      break;
    }
    case "light": {
      backgroundColor = "#ccc";
      break;
    }
  }
  return (
    <Drawer
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerPosition: "right",
        drawerStyle: { backgroundColor },
        headerTitleAlign: "center",
        headerBackground: () => <View className="flex-1 bg-surface border-b border-border" />,
        headerTitle: ({ children }) => {
          const titleClassName = classNames({ "text-foreground text-base font-semibold": true });
          return <Text className={titleClassName}>{children}</Text>;
        },
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
