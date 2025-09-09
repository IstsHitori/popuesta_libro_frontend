import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "@/hooks/auth/useAuth";
import { useQueryUserProfile } from "@/hooks/profile/useQueryUserProfile";
import HomeHeader from "@/components/home/HomeHeader";

export default function PrivateLayout() {
  const { authToken } = useAuth();
  const { loading, error } = useQueryUserProfile();
  const location = useLocation();

  if (!authToken) return <Navigate to="/auth/login" replace />;

  // Verificar si el usuario ya vio el video intro
  const hasSeenIntro = localStorage.getItem('hasSeenIntro');
  
  // Si no ha visto el intro y no está en la página de intro, redirigir al intro
  if (!hasSeenIntro && location.pathname !== '/intro') {
    return <Navigate to="/intro" replace />;
  }

  // Mientras se carga el perfil
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-700">Cargando perfil del usuario...</p>
        </div>
      </div>
    );
  }

  // En caso de error al obtener el perfil
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-center">
          Error al cargar el perfil del usuario. Por favor, intenta nuevamente.
        </p>
      </div>
    );
  }

  // Layout principal
  return (
    <div className="flex flex-1">
      <main
        id="game-screen"
        className="min-h-screen bg-[url('/niveles/bg_numerika.webp')] bg-no-repeat bg-center bg-cover w-full"
      >
        <HomeHeader />
        <Outlet />
      </main>
    </div>
  );
}
