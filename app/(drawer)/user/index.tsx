import { UserProfile } from "@/components/user/UserProfile";
import { useRouter } from "expo-router";

export default function UserScreen() {
  const router = useRouter();

  return (
    <UserProfile onEditPress={() => { router.push("/user/edit"); }} />
  );
}
