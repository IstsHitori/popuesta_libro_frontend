import { useEffect } from "react";
import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import MainSectionLeveOne from "@/components/levels/main/MainSectionLeveOne_v2";
import LevelLoadingScreen from "@/components/levels/LevelLoadingScreen";
import CompletionModal from "@/components/ui/CompletionModal";
import { useLevelLoading } from "@/hooks/ui/useLevelLoading";
import { useCompletionModal } from "@/hooks/ui/useCompletionModal";
import { useEarnedItemsStore } from "@/stores/earned-items.store";
import { LEVEL_LOADING_CONFIG } from "@/constants/level-loading";
import useUserProfile from "@/hooks/profile/useUserProfile";

export default function LevelOnePage() {
  const { isLoading, completeLoading } = useLevelLoading({ duration: 3500 });
  const { userProfile } = useUserProfile();
  const { isVisible, showModal, hideModal } = useCompletionModal();
  const { shouldShowModal } = useEarnedItemsStore();

  console.log(userProfile);

  // Mostrar modal cuando se complete el nivel 1 (solo si no se ha mostrado antes)
  useEffect(() => {
    if (shouldShowModal(1)) {
      const timer = setTimeout(() => {
        showModal();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldShowModal, showModal]);

  if (isLoading) {
    return (
      <LevelLoadingScreen
        {...LEVEL_LOADING_CONFIG.level1}
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
            <MainSectionLeveOne />
          </div>
          <div className="hidden xl:block w-80">
            <EarnedItems />
          </div>
        </div>
      </div>
      
      {/* Modal de completación */}
      <CompletionModal isVisible={isVisible} level={1} onClose={hideModal} />
    </>
  );
}
