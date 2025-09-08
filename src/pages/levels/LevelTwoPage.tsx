
import { useEffect } from "react";
import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import LevelLoadingScreen from "@/components/levels/LevelLoadingScreen";
import CompletionModal from "@/components/ui/CompletionModal";
import { useLevelLoading } from "@/hooks/ui/useLevelLoading";
import { useCompletionModal } from "@/hooks/ui/useCompletionModal";
import { useEarnedItemsStore } from "@/stores/earned-items.store";
import { LEVEL_LOADING_CONFIG } from "@/constants/level-loading";
import RepeatedAdditionGame from "@/components/levels/level-2/RepeatedAdditionGame";

export default function LevelTwoPage() {
  const { isLoading, completeLoading } = useLevelLoading({ duration: 3500 });
  const { isVisible, showModal, hideModal } = useCompletionModal();
  const { shouldShowModal } = useEarnedItemsStore();

  // Mostrar modal cuando se complete el nivel 2 (solo si no se ha mostrado antes)
  useEffect(() => {
    if (shouldShowModal(2)) {
      const timer = setTimeout(() => {
        showModal();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldShowModal, showModal]);
  
  if (isLoading) {
    return (
      <LevelLoadingScreen
        {...LEVEL_LOADING_CONFIG.level2}
        onLoadingComplete={completeLoading}
      />
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <HeaderLevelSection />
        <div className="flex">
          <div className="flex-1">
            <RepeatedAdditionGame />
          </div>
          <div className="hidden xl:block w-80">
            <EarnedItems />
          </div>
        </div>
      </div>
      
      {/* Modal de completación */}
      <CompletionModal isVisible={isVisible} level={2} onClose={hideModal} />
    </>
  );
}
