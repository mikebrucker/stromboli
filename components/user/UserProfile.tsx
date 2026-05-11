import { useLanguageStore } from "@/stores/useLanguageStore";
import { useUserStore } from "@/stores/useUserStore";
import { Pressable, Text, View } from "react-native";

interface UserProfileProps {
  onEditPress: () => void;
}

export function UserProfile({ onEditPress }: UserProfileProps) {
  const user = useUserStore(state => state.user);
  const language = useLanguageStore(state => state.language);

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500 text-base">No user found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <View className="bg-white rounded-2xl p-4 shadow-sm">
        <View className="items-center mb-4">
          <View className="w-20 h-20 rounded-full bg-amber-100 items-center justify-center mb-2">
            <Text className="text-4xl">👤</Text>
          </View>
          <Text className="text-xl font-bold text-gray-900">{user.name}</Text>
        </View>

        <View className="gap-3">
          <ProfileRow label="Language" value={language === "en" ? "🇬🇧 English" : "🇦🇹 Deutsch"} />
          <ProfileRow label="Units" value={user.preferredUnit === "metric" ? "Metric (g, ml)" : "Imperial (oz, fl oz)"} />
        </View>

        <Pressable
          onPress={onEditPress}
          className="mt-6 bg-amber-500 rounded-xl py-3 items-center active:opacity-70"
        >
          <Text className="text-white font-semibold">Edit Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
      <Text className="text-gray-500 text-sm">{label}</Text>
      <Text className="text-gray-900 text-sm font-medium">{value}</Text>
    </View>
  );
}
