import { UserEditForm } from "@/components/user";
import { useRouter } from "expo-router";

export default function UserEditScreen() {
  const router = useRouter();

  return (
    <UserEditForm
      onSave={() => { router.back(); }}
      onCancel={() => { router.back(); }}
    />
  );
}
