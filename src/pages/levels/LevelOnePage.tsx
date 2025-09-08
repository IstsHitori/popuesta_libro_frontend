import { useEffect, useState } from "react";
import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import MainSectionLeveOne from "@/components/levels/main/MainSectionLeveOne_v2";
import LevelLoadingScreen from "@/components/levels/LevelLoadingScreen";
import CompletionModal from "@/components/ui/CompletionModal";
import LevelProtector from "@/components/levels/LevelProtector";
import LevelTimer from "@/components/ui/LevelTimer";
import { useLevelLoading } from "@/hooks/ui/useLevelLoading";
import { useCompletionModal } from "@/hooks/ui/useCompletionModal";
import { useEarnedItemsStore } from "@/stores/earned-items.store";
import { useGameTimer } from "@/hooks/ui/useGameTimer";
import { LEVEL_LOADING_CONFIG } from "@/constants/level-loading";

export default function LevelOnePage() {
  const { isLoading, completeLoading } = useLevelLoading({ duration: 3500 });
  const { isVisible, showModal, hideModal } = useCompletionModal();
  const { shouldShowModal } = useEarnedItemsStore();
  const { addLevelTime } = useGameTimer();
  const [levelTime, setLevelTime] = useState(0);
  const [isLevelActive, setIsLevelActive] = useState(false);

  // Iniciar timer cuando termine la carga
  useEffect(() => {
    if (!isLoading) {
      setIsLevelActive(true);
    }
  }, [isLoading]);

  // Mostrar modal cuando se complete el nivel 1 (solo si no se ha mostrado antes)
  useEffect(() => {
    if (shouldShowModal(1)) {
      setIsLevelActive(false); // Detener el timer
      addLevelTime(levelTime); // Añadir tiempo del nivel al tiempo total
      
      const timer = setTimeout(() => {
        showModal();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldShowModal, showModal, levelTime, addLevelTime]);

  if (isLoading) {
    return (
      <LevelLoadingScreen
        {...LEVEL_LOADING_CONFIG.level1}
        onLoadingComplete={completeLoading}
      />
    );
  }

  return (
    <LevelProtector levelNumber={1}>
      <div className="min-h-screen">
        <HeaderLevelSection />
        
        {/* Timer del nivel */}
        <div className="fixed top-4 right-4 z-30">
          <LevelTimer 
            isActive={isLevelActive} 
            onTimeUpdate={setLevelTime}
            className="shadow-lg"
          />
        </div>
        
        <div className="flex">
          <div className="flex-1">
            <MainSectionLeveOne />
          </div>
          <div className="hidden xl:block w-80">
            <EarnedItems />
          </div>
        </div>
      </div>
      
      {/* Modal de completación */}
      <CompletionModal isVisible={isVisible} level={1} onClose={hideModal} />
    </LevelProtector>
  );
}
