import { DndContext, DragOverlay } from "@dnd-kit/core";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

import { useVisualMultiplicationGame } from "../../../hooks/game/useVisualMultiplicationGame";
import { useToast } from "../../../hooks/ui/useToast";
import { useSoundEffects } from "../../../hooks/ui/useSoundEffects";
import VisualMultiplicationProblem from "../level-1/VisualMultiplicationProblem";
import VisualItemsPool from "../level-1/VisualItemsPool";
import GameStats from "../level-1/GameStats";
import DraggableVisualItem from "../level-1/DraggableVisualItem";
import { Toast } from "../../ui/Toast";
import CoinsDisplay from "../../ui/CoinsDisplay";
import CoinsFeedback from "../../ui/CoinsFeedback";

import tomas_1 from "/tomas/nivel_1.webp";

export default function MainSectionLeveOne() {
  const { gameState, gameStats, handleDragEnd } = useVisualMultiplicationGame();
  const { toast, showToast, hideToast } = useToast();
  const { playCorrectSound, playIncorrectSound } = useSoundEffects();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  
  const handleDragStart = (event: DragStartEvent) => {
    setActiveItem(event.active.id as string);
  };

  const handleDragEndWrapper = (event: DragEndEvent) => {
    setActiveItem(null);
    const result = handleDragEnd(event);
    
    // Show feedback to the user
    if (result.success) {
      playCorrectSound();
      showToast(result.message || '¡Muy bien!', 'success');
    } else if (result.message) {
      playIncorrectSound();
      showToast(result.message, 'error');
    }
  };

  const activeDraggedItem = activeItem 
    ? gameState.availableItems.find(item => item.id === activeItem)
    : null;

  return (
    <div className="min-h-screen w-full overflow-auto bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto p-2 sm:p-4 max-w-7xl">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-4">
          <Link 
            to="/app/niveles" 
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <IoIosArrowRoundBack className="text-xl" />
            <span className="hidden sm:inline">Volver al mapa</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-white text-xl sm:text-2xl font-bold">
              El reto del mercado de café
            </h1>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-bold border border-yellow-500/30">
              Nivel 1
            </span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 min-h-[calc(100vh-8rem)]">
          
          {/* Left column - Image and story */}
          <div className="xl:col-span-1 space-y-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
              <img
                src={tomas_1}
                alt="Nivel 1"
                className="w-full h-48 sm:h-56 xl:h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-3">La Aventura de Ari</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  Ari entra a un bosque mágico donde los árboles guardan frutas iguales. 
                  Pero Caós aparece: —"¡Nunca entenderás esto! Las sumas te confundirán 
                  y jamás obtendrás el cristal".
                </p>
                <p className="text-green-400 text-sm leading-relaxed">
                  Tika explica: —Mira Ari, la multiplicación comienza con sumar lo mismo 
                  varias veces. Por ejemplo, si tienes 2 manzanas en cada árbol y hay 4 árboles, 
                  en vez de sumar 2+2+2+2, puedes multiplicar 2×4.
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Game content */}
          <div className="xl:col-span-3">
            <DndContext 
              onDragStart={handleDragStart}
              onDragEnd={handleDragEndWrapper}
            >
              <div className="space-y-4 h-full">
                
                {/* Game Stats and Coins */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <GameStats 
                      totalProblems={gameStats.totalProblems}
                      completedProblems={gameStats.completedProblems}
                      progressPercentage={gameStats.progressPercentage}
                      isLevelCompleted={gameState.isLevelCompleted}
                    />
                  </div>
                  <CoinsDisplay showHistory={true} />
                </div>
                
                {/* Instructions */}
                <div className="text-center">
                  <h2 className="text-green-400 text-lg sm:text-xl font-bold flex items-center justify-center gap-2 mb-2">
                    🧩 ¡Forma grupos iguales con los objetos!
                  </h2>
                  <p className="text-white/80 text-sm">
                    Arrastra las manzanas, cristales o semillas para formar grupos iguales que resuelvan cada problema.
                  </p>
                </div>

                {/* Multiplication Problems - Each problem shows different grouping options */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {gameState.problems.map((problem) => (
                    <VisualMultiplicationProblem 
                      key={problem.id} 
                      problem={problem}
                    />
                  ))}
                </div>
                
                {/* Available Items Pool - Floating Version */}
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 max-w-4xl w-[90%]">
                  <div className="bg-black/90 backdrop-blur-lg rounded-xl border-2 border-white/30 shadow-2xl">
                    <VisualItemsPool 
                      items={gameState.availableItems} 
                      title="🎯 Arrastra estos objetos para formar grupos"
                      isFloating={true}
                    />
                  </div>
                </div>
                
              </div>

              {/* Drag Overlay */}
              <DragOverlay>
                {activeDraggedItem && (
                  <DraggableVisualItem 
                    item={activeDraggedItem} 
                    isOverlay={true}
                  />
                )}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      
      {/* Coins feedback */}
      <CoinsFeedback />
    </div>
  );
}
