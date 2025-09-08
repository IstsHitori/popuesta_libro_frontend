import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useUserProfile from '@/hooks/profile/useUserProfile';

interface LevelAccess {
  level: number;
  isUnlocked: boolean;
  isCurrent: boolean;
  canAccess: boolean;
}

export function useLevelAccess() {
  const { userProfile } = useUserProfile();
  const location = useLocation();

  // Determinar el nivel actual basado en la URL
  const currentLevelFromUrl = useMemo(() => {
    const pathMatch = location.pathname.match(/\/niveles\/(\d+)/);
    return pathMatch ? parseInt(pathMatch[1], 10) : 1;
  }, [location.pathname]);

  // Calcular el acceso para cada nivel
  const levelAccess = useMemo((): LevelAccess[] => {
    // Si no hay perfil de usuario, default a nivel 1
    const userLevel = userProfile?.level ?? 1;
    
    return [1, 2, 3, 4].map(level => ({
      level,
      isUnlocked: level <= userLevel,
      isCurrent: level === currentLevelFromUrl,
      canAccess: level <= userLevel
    }));
  }, [userProfile?.level, currentLevelFromUrl]);

  // Verificar si el usuario puede acceder al nivel actual
  const canAccessCurrentLevel = useMemo(() => {
    const userLevel = userProfile?.level ?? 1;
    return currentLevelFromUrl <= userLevel;
  }, [userProfile?.level, currentLevelFromUrl]);

  // Obtener el nivel máximo desbloqueado
  const maxUnlockedLevel = useMemo(() => {
    return userProfile?.level ?? 1;
  }, [userProfile?.level]);

  return {
    levelAccess,
    canAccessCurrentLevel,
    maxUnlockedLevel,
    currentLevel: currentLevelFromUrl,
    userLevel: userProfile?.level ?? 1
  };
}
