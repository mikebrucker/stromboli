import { Str } from "@/components/i18n/Str";
import { Accordion } from "@/components/ui/Accordion";
import { classNames } from "@/helpers/genericHelper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { themes, type ColorScheme, type Theme } from "@/types/theme.types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerActions, useNavigation, useNavigationState } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { t } from "i18next";
import { useState, type ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";

type MaterialCommunityIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const COLOR_SCHEME_OPTIONS: Array<{ scheme: ColorScheme; icon: MaterialCommunityIconName }> = [
  { scheme: "system", icon: "theme-light-dark" },
  { scheme: "light", icon: "white-balance-sunny" },
  { scheme: "dark", icon: "moon-waning-crescent" },
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

interface ColorSchemeOptionProps {
  scheme: ColorScheme;
  icon: MaterialCommunityIconName;
  active: boolean;
  onPress: () => void;
}

function ColorSchemeOption({ scheme, icon, active, onPress }: ColorSchemeOptionProps) {
  const optionClassName = classNames({
    "flex-row items-center px-4 py-3 rounded-lg": true,
    "opacity-100": active,
    "opacity-60": !active,
  });

  return (
    <Pressable onPress={onPress} className={optionClassName}>
      <MaterialCommunityIcons name={icon} size={20} className="text-foreground" />
      <Str className="ml-3 text-foreground">scheme.{scheme}</Str>
    </Pressable>
  );
}

function ColorSchemeAccordion() {
  const { internalColorScheme, setColorScheme } = useAppTheme();
  const [accordionValue, setAccordionValue] = useState("");

  const activeOption = COLOR_SCHEME_OPTIONS.find(option => option.scheme === internalColorScheme) ?? COLOR_SCHEME_OPTIONS[0];

  return (
    <View className="mt-2">
      <Accordion
        rootClasses="bg-surface-raised rounded-lg"
        itemClasses="flex-row items-center px-4 py-3 rounded-lg"
        value={accordionValue}
        onValueChange={setAccordionValue}
        header={(
          <View className="flex-row items-center">
            <MaterialCommunityIcons name={activeOption.icon} size={20} className="text-foreground" />
            <Str className="ml-3 text-foreground font-semibold">scheme.{activeOption.scheme}</Str>
          </View>
        )}
      >
        {COLOR_SCHEME_OPTIONS.map(({ scheme, icon }) => (
          <ColorSchemeOption
            key={scheme}
            scheme={scheme}
            icon={icon}
            active={internalColorScheme === scheme}
            onPress={() => {
              setColorScheme(scheme);
              setAccordionValue("");
            }}
          />
        ))}
      </Accordion>
    </View>
  );
}

interface ThemeBoxProps {
  themeColor: Theme;
  active: boolean;
  onPress: () => void;
}

function ThemeBox({ themeColor, active, onPress }: ThemeBoxProps) {
  const boxClassName = classNames({
    "rounded-md border-2 flex-row items-center justify-center": true,
    "border-foreground": active,
    "border-transparent": !active,
  });

  return (
    <Pressable onPress={onPress} style={{ width: "25%" }} className="p-1">
      <View
        className={boxClassName}
        style={{ backgroundColor: `var(--color-${themeColor}-600)`, aspectRatio: 16 / 9 }}
      >
        <Str className="text-foreground font-semibold capitalize">{themeColor}</Str>
      </View>
    </Pressable>
  );
}

function ThemeAccordion() {
  const { theme, setTheme } = useAppTheme();
  const [accordionValue, setAccordionValue] = useState("");

  const activeOption = themes.find(item => item === theme) ?? themes[0];

  return (
    <View className="mt-2">
      <Accordion
        rootClasses="bg-surface-raised rounded-lg"
        itemClasses="flex-row items-center px-4 py-3 rounded-lg"
        value={accordionValue}
        onValueChange={setAccordionValue}
        header={(
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="palette" size={20} className="text-foreground" />
            <Str className="ml-3 text-foreground font-semibold capitalize">{activeOption}</Str>
          </View>
        )}
      >
        <View className="flex-row flex-wrap px-2 pb-3">
          {themes.map(item => (
            <ThemeBox
              key={item}
              themeColor={item}
              active={item === theme}
              onPress={() => {
                setTheme(item);
                setAccordionValue("");
              }}
            />
          ))}
        </View>
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
          "flex-row items-center px-4 py-3 rounded-lg": true,
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
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <CustomDrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="px-4 pb-4">
        <ColorSchemeAccordion />
        <ThemeAccordion />
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerPosition: "right",
        drawerStyle: { backgroundColor: "var(--color-surface)" },
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
