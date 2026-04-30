import { useLanguageStore, useUserStore } from "@/stores";
import type { Language, UnitSystem } from "@/types";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface UserEditFormProps {
  onSave: () => void;
  onCancel: () => void;
}

export function UserEditForm({ onSave, onCancel }: UserEditFormProps) {
  const user = useUserStore(state => state.user);
  const updateName = useUserStore(state => state.updateName);
  const updatePreferredUnit = useUserStore(state => state.updatePreferredUnit);
  const updatePreferredLanguage = useUserStore(state => state.updatePreferredLanguage);
  const language = useLanguageStore(state => state.language);

  const [name, setName] = useState(user?.name ?? "");
  const [unit, setUnit] = useState<UnitSystem>(user?.preferredUnit ?? "metric");
  const [lang, setLang] = useState<Language>(language);

  const handleSave = () => {
    updateName(name);
    updatePreferredUnit(unit);
    updatePreferredLanguage(lang);
    onSave();
  };

  return (
    <View className="flex-1 p-4">
      <View className="bg-white rounded-2xl p-4 shadow-sm gap-4">

        <View>
          <Text className="text-sm text-gray-500 mb-1">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="border border-gray-200 rounded-xl px-3 py-2 text-gray-900"
            placeholder="Your name"
          />
        </View>

        <View>
          <Text className="text-sm text-gray-500 mb-2">Units</Text>
          <View className="flex-row gap-2">
            {(["metric", "imperial"] as Array<UnitSystem>).map(u => (
              <Pressable
                key={u}
                onPress={() => { setUnit(u); }}
                className={`flex-1 py-2 rounded-xl items-center active:opacity-70 ${
                  unit === u ? "bg-amber-500" : "bg-gray-100"
                }`}
              >
                <Text className={`text-sm font-medium capitalize ${
                  unit === u ? "text-white" : "text-gray-600"
                }`}
                >
                  {u}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          <Text className="text-sm text-gray-500 mb-2">Language</Text>
          <View className="flex-row gap-2">
            {(["en", "de"] as Array<Language>).map(l => (
              <Pressable
                key={l}
                onPress={() => { setLang(l); }}
                className={`flex-1 py-2 rounded-xl items-center active:opacity-70 ${
                  lang === l ? "bg-amber-500" : "bg-gray-100"
                }`}
              >
                <Text className={`text-sm font-medium ${
                  lang === l ? "text-white" : "text-gray-600"
                }`}
                >
                  {l === "en" ? "🇬🇧 English" : "🇦🇹 Deutsch"}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="flex-row gap-2 mt-2">
          <Pressable
            onPress={onCancel}
            className="flex-1 py-3 rounded-xl items-center bg-gray-100 active:opacity-70"
          >
            <Text className="text-gray-600 font-semibold">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={handleSave}
            className="flex-1 py-3 rounded-xl items-center bg-amber-500 active:opacity-70"
          >
            <Text className="text-white font-semibold">Save</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}
