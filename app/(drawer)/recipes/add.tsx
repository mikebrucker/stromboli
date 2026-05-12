import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function AddRecipeScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-gray-50">
      <Text>{t("recipe.addComingSoon")}</Text>
    </View>
  );
}
