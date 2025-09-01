import { useUserStore } from "@/stores/user.store";

export default function useUserProfile() {
  const userProfile = useUserStore((state) => state.userProfile);
  const setUserProfile = useUserStore((state) => state.setUserProfile);

  return {
    userProfile,
    setUserProfile,
  };
}
