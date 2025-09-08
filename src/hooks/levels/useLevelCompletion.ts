import { useCallback, useState } from 'react';
import { completeLevel as completeLevelService } from '@/services/levels.service';
import { getUserProfile } from '@/services/auth.service';
import useUserProfile from '@/hooks/profile/useUserProfile';
import { useCoinsStore } from '@/stores/coins.store';
import { toast } from 'react-toastify';

export function useLevelCompletion() {
  const { setUserProfile } = useUserProfile();
  const { coins } = useCoinsStore();
  const [isCompletingLevel, setIsCompletingLevel] = useState(false);

  const completeLevel = useCallback(async (levelNumber: number, timeSpent: number) => {
    if (isCompletingLevel) return; // Evitar múltiples peticiones simultáneas
    
    setIsCompletingLevel(true);
    
    try {
      console.log(`Completando nivel ${levelNumber} con ${coins} monedas en ${timeSpent} segundos...`);
      
      // 1. Hacer la petición para completar el nivel con las monedas actuales y tiempo
      await completeLevelService(coins, timeSpent);
      
      // 2. Obtener el perfil actualizado del usuario desde el backend
      const updatedProfile = await getUserProfile();
      
      // 3. Actualizar el perfil del usuario en el store
      setUserProfile(updatedProfile);
      
      // 4. Mostrar mensaje de éxito
      const formattedTime = `${Math.floor(timeSpent / 60)}:${(timeSpent % 60).toString().padStart(2, '0')}`;
      toast.success(`¡Felicidades! Has completado el nivel ${levelNumber} en ${formattedTime}`);
      
      console.log('Nivel completado exitosamente:', {
        level: levelNumber,
        coinsEarned: coins,
        timeSpent,
        updatedProfile
      });
      
    } catch (error) {
      console.error('Error al completar nivel:', error);
      toast.error('Error al guardar el progreso del nivel');
      throw error; // Re-throw para que el componente pueda manejarlo si es necesario
    } finally {
      setIsCompletingLevel(false);
    }
  }, [coins, setUserProfile, isCompletingLevel]);

  return {
    completeLevel,
    isCompletingLevel
  };
}
