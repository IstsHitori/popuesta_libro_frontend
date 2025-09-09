import { useEffect, useState } from "react";
import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import MainSectionLeveOne from "@/components/levels/main/MainSectionLeveOne_v2";
import LevelLoadingScreen from "@/components/levels/LevelLoadingScreen";
import CompletionModal from "@/components/ui/CompletionModal";
import LevelProtector from "@/components/levels/LevelProtector";
import LevelTimer from "@/components/ui/LevelTimer";
import ErrorBoundary from "@/components/ErrorBoundary";
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
      <ErrorBoundary fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 max-w-lg w-full text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-white text-2xl font-bold mb-4">
              Error en el Nivel 1
            </h1>
            <p className="text-white/80 mb-6 leading-relaxed">
              Hubo un problema con el juego de arrastre. Esto puede suceder cuando se mueven elementos muy rápidamente.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              🔄 Reiniciar nivel
            </button>
          </div>
        </div>
      }>
        <div className="min-h-screen">
          <HeaderLevelSection />
          
          {/* Timer del nivel */}
          <div className="fixed top-4 left-4 z-30">
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
      </ErrorBoundary>
    </LevelProtector>
  );
}
