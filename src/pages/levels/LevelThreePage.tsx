
import { useEffect } from "react";
import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import LevelLoadingScreen from "@/components/levels/LevelLoadingScreen";
import CompletionModal from "@/components/ui/CompletionModal";
import LevelProtector from "@/components/levels/LevelProtector";
import { useLevelLoading } from "@/hooks/ui/useLevelLoading";
import { useCompletionModal } from "@/hooks/ui/useCompletionModal";
import { useEarnedItemsStore } from "@/stores/earned-items.store";
import { LEVEL_LOADING_CONFIG } from "@/constants/level-loading";
import MathCityGame from "@/components/levels/level-3/MathCityGame";

export default function LevelThreePage() {
  const { isLoading, completeLoading } = useLevelLoading({ duration: 3500 });
  const { isVisible, showModal, hideModal } = useCompletionModal();
  const { shouldShowModal } = useEarnedItemsStore();

  // Mostrar modal cuando se complete el nivel 3 (solo si no se ha mostrado antes)
  useEffect(() => {
    if (shouldShowModal(3)) {
      const timer = setTimeout(() => {
        showModal();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldShowModal, showModal]);
  
  if (isLoading) {
    return (
      <LevelLoadingScreen
        {...LEVEL_LOADING_CONFIG.level3}
        onLoadingComplete={completeLoading}
      />
    );
  }

  return (
    <LevelProtector levelNumber={3}>
      <div className="min-h-screen">
        <HeaderLevelSection />
        <div className="flex">
          <div className="flex-1">
            <MathCityGame />
          </div>
          <div className="hidden xl:block w-80">
            <EarnedItems />
          </div>
        </div>
      </div>
      
      {/* Modal de completación */}
      <CompletionModal isVisible={isVisible} level={3} onClose={hideModal} />
    </LevelProtector>
  );
}
