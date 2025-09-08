
import { useEffect } from "react";
import FortressGame from "@/components/levels/level-4/FortressGame";
import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import CompletionModal from "@/components/ui/CompletionModal";
import LevelProtector from "@/components/levels/LevelProtector";
import { useCompletionModal } from "@/hooks/ui/useCompletionModal";
import { useEarnedItemsStore } from "@/stores/earned-items.store";

export default function LevelFourPage() {
  const { isVisible, showModal, hideModal } = useCompletionModal();
  const { shouldShowModal } = useEarnedItemsStore();

  // Mostrar modal cuando se complete el nivel 4 (solo si no se ha mostrado antes)
  useEffect(() => {
    if (shouldShowModal(4)) {
      const timer = setTimeout(() => {
        showModal();
      }, 1500); // Delay para que el jugador vea la victoria
      
      return () => clearTimeout(timer);
    }
  }, [shouldShowModal, showModal]);

  return (
    <LevelProtector levelNumber={4}>
      <div className="min-h-screen bg-gradient-to-br from-amber-900/30 via-orange-900/30 to-yellow-900/30">
        <HeaderLevelSection />
        
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
      
      {/* Modal de completación */}
      <CompletionModal isVisible={isVisible} level={4} onClose={hideModal} />
    </LevelProtector>
  );
}
