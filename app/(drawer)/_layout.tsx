import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="recipes" options={{ title: "Recipes" }} />
      <Drawer.Screen name="user" options={{ title: "Profile" }} />
    </Drawer>
  );
}
