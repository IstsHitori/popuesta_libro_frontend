import { useAuthStore } from "@/stores/auth.store";

export default function useAuth() {
  const authToken = useAuthStore((state) => state.authToken);
  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const clearAuthToken = useAuthStore((state) => state.clearAuthToken);

  return {
    authToken,
    setAuthToken,
    clearAuthToken,
  };
}
