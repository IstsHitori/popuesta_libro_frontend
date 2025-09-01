import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/hooks/auth/useAuth";
import { useQueryUserProfile } from "@/hooks/profile/useQueryUserProfile";
import HomeHeader from "@/components/home/HomeHeader";

export default function PrivateLayout() {
  const { authToken } = useAuth();
  const { loading, error } = useQueryUserProfile();

  if (!authToken) return <Navigate to="/auth/iniciar-sesion" replace />;

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
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <MobileNav />
            <Link to="/app/dashboard" className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <img src={winzy} alt="UPC Logo" className="rounded-full" />
              </div>
              <h1 className="hidden md:block text-xl font-bold bg-clip-text tracking-widest text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
                WINZY
              </h1>
            </Link>
          </div>
          <UserNav />
        </div>
      </header> */}

      <div className="flex flex-1">
        <main className="flex-1 overflow-auto">
          <HomeHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
