import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import { useEarnedItemsStore } from "@/stores/earned-items.store";

export function useLogout() {
  const navigate = useNavigate();
  const clearAuthToken = useAuthStore((state) => state.clearAuthToken);
  const setUserProfile = useUserStore((state) => state.setUserProfile);
  const resetProgress = useEarnedItemsStore((state) => state.resetProgress);

  const logout = () => {
    // 1. Limpiar token de autenticación
    clearAuthToken();

    // 2. Resetear perfil de usuario a valores iniciales
    setUserProfile({
      id: 1,
      document: "test",
      name: "Usuario de Prueba",
      school: "Escuela de Prueba",
      gender: "Masculino",
      money: "0",
      level: 1,
      items: [],
    });

    // 3. Limpiar progreso de niveles y recompensas
    resetProgress();

    // 4. Limpiar completamente localStorage
    localStorage.clear();

    // 5. Redireccionar al login
    navigate("/login", { replace: true });
  };

  return { logout };
}
