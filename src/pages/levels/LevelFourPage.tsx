
import { useEffect, useState } from "react";
import FortressGame from "@/components/levels/level-4/FortressGame";
import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import LevelLoadingScreen from "@/components/levels/LevelLoadingScreen";
import CompletionModal from "@/components/ui/CompletionModal";
import LevelProtector from "@/components/levels/LevelProtector";
import LevelTimer from "@/components/ui/LevelTimer";
import { useLevelLoading } from "@/hooks/ui/useLevelLoading";
import { useCompletionModal } from "@/hooks/ui/useCompletionModal";
import { useEarnedItemsStore } from "@/stores/earned-items.store";
import { useGameTimer } from "@/hooks/ui/useGameTimer";
import { LEVEL_LOADING_CONFIG } from "@/constants/level-loading";

export default function LevelFourPage() {
  const { isLoading, completeLoading } = useLevelLoading({ duration: 3500 });
  const { isVisible, showModal, hideModal } = useCompletionModal();
  const { shouldShowModal } = useEarnedItemsStore();
  const { addLevelTime} = useGameTimer();
  const [levelTime, setLevelTime] = useState(0);
  const [isLevelActive, setIsLevelActive] = useState(false);

  // Iniciar timer cuando termine la carga
  useEffect(() => {
    if (!isLoading) {
      setIsLevelActive(true);
    }
  }, [isLoading]);

  // Mostrar modal cuando se complete el nivel 4 (solo si no se ha mostrado antes)
  useEffect(() => {
    if (shouldShowModal(4)) {
      setIsLevelActive(false); // Detener el timer
      addLevelTime(levelTime); // Añadir tiempo del nivel al tiempo total
      
      const timer = setTimeout(() => {
        showModal();
      }, 1500); // Delay para que el jugador vea la victoria
      
      return () => clearTimeout(timer);
    }
  }, [shouldShowModal, showModal, levelTime, addLevelTime]);

  return (
    <LevelProtector levelNumber={4}>
      {isLoading ? (
        <LevelLoadingScreen 
          {...LEVEL_LOADING_CONFIG.level4} 
          onLoadingComplete={completeLoading}
        />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-amber-900/30 via-orange-900/30 to-yellow-900/30">
          <HeaderLevelSection />
          
          {/* Timer del nivel */}
          <div className="fixed top-4 left-4 z-30">
            <LevelTimer 
              isActive={isLevelActive} 
              onTimeUpdate={setLevelTime}
              className="shadow-lg"
            />
          </div>
          
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Área de juego principal */}
              <div className="lg:col-span-3">
                <FortressGame />
              </div>
              
              {/* Panel lateral con elementos ganados */}
              <div className="lg:col-span-1">
                <EarnedItems />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de completación */}
      <CompletionModal isVisible={isVisible} level={4} onClose={hideModal} />
    </LevelProtector>
  );
}
