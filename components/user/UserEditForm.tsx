import { classNames } from "@/helpers/genericHelper";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useUserStore } from "@/stores/useUserStore";
import { languages } from "@/types/app.types";
import { unitSystems } from "@/types/recipe.types";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";

interface UserEditFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export function UserEditForm({ onSave, onCancel }: UserEditFormProps) {
  const { t } = useTranslation();
  const user = useUserStore(state => state.user);
  const updateName = useUserStore(state => state.updateName);
  const updatePreferredUnit = useUserStore(state => state.updatePreferredUnit);
  const updatePreferredLanguage = useUserStore(state => state.updatePreferredLanguage);
  const language = useLanguageStore(state => state.language);

  return (
    <View className="flex-1 p-4">
      <View className="bg-white rounded-2xl p-4 shadow-sm gap-4">

        <View>
          <Text className="text-sm text-gray-500 mb-1">{t("common.name")}</Text>
          <TextInput
            value={user?.name ?? ""}
            onChangeText={updateName}
            className="border border-gray-200 rounded-xl px-3 py-2 text-gray-900"
            placeholder={t("common.namePlaceholder")}
          />
        </View>

        <View>
          <Text className="text-sm text-gray-500 mb-2">{t("user.units")}</Text>
          <View className="flex-row gap-2">
            {unitSystems.map(unitSystem => {
              const unitSystemButtonClass = classNames({
                "flex-1 py-2 rounded-xl items-center active:opacity-70": true,
                "bg-amber-500": user?.preferredUnit === unitSystem,
                "bg-gray-100": user?.preferredUnit !== unitSystem,
              });
              const unitSystemLabelClass = classNames({
                "text-sm font-medium": true,
                "text-white": user?.preferredUnit === unitSystem,
                "text-gray-600": user?.preferredUnit !== unitSystem,
              });
              return (
                <Pressable
                  key={unitSystem}
                  onPress={() => { updatePreferredUnit(unitSystem); }}
                  className={unitSystemButtonClass}
                >
                  <Text className={unitSystemLabelClass}>
                    {t(`unitSystem.${unitSystem}`)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <Text className="text-sm text-gray-500 mb-2">{t("user.language")}</Text>
          <View className="flex-row gap-2">
            {languages.map(lang => {
              const languageButtonClass = classNames({
                "flex-1 py-2 rounded-xl items-center active:opacity-70": true,
                "bg-amber-500": language === lang,
                "bg-gray-100": language !== lang,
              });
              const languageLabelClass = classNames({
                "text-sm font-medium": true,
                "text-white": language === lang,
                "text-gray-600": language !== lang,
              });
              return (
                <Pressable
                  key={lang}
                  onPress={() => { updatePreferredLanguage(lang); }}
                  className={languageButtonClass}
                >
                  <Text className={languageLabelClass}>
                    {t(`language.${lang}`)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="flex-row gap-2 mt-2">
          <Pressable
            onPress={onCancel}
            className="flex-1 py-3 rounded-xl items-center bg-gray-100 active:opacity-70"
          >
            <Text className="text-gray-600 font-semibold">{t("common.cancel")}</Text>
          </Pressable>
          <Pressable
            onPress={onSave}
            className="flex-1 py-3 rounded-xl items-center bg-amber-500 active:opacity-70"
          >
            <Text className="text-white font-semibold">{t("common.save")}</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}
