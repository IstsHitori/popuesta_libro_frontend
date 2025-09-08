import { DndContext, DragOverlay } from "@dnd-kit/core";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useMathCityGame } from "../../../hooks/game/useMathCityGame";
import { useToast } from "../../../hooks/ui/useToast";
import { useSoundEffects } from "../../../hooks/ui/useSoundEffects";
import { Toast } from "../../ui/Toast";
import CoinsDisplay from "../../ui/CoinsDisplay";
import FilledGroupDisplay from "./FilledGroupDisplay";
import DraggableOperation from "./DraggableOperation";
import ResultDropZone from "./ResultDropZone";
import OperationsPool from "./OperationsPool";
import MathCityStatsComponent from "./MathCityStatsComponent";

import tomas_3 from "/tomas/tomas-3.png";

export default function MathCityGame() {
  const { 
    gameState, 
    resultZone,
    gameStats, 
    handleOperationDrop, 
    handleOperationRemoval, 
    nextProblem, 
    resetProblem, 
    useHint: triggerHint 
  } = useMathCityGame();
  const { toast, showToast, hideToast } = useToast();
  const { playCorrectSound, playIncorrectSound } = useSoundEffects();
  const [activeOperation, setActiveOperation] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveOperation(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveOperation(null);
    
    if (!event.over) {
      return;
    }

    const operationId = event.active.id as string;
    const targetId = event.over.id as string;
    
    // Check if dropping back to operations pool
    if (targetId === 'operations-pool') {
      const result = handleOperationRemoval();
      if (result.success) {
        playCorrectSound();
        showToast('🧮 Operación devuelta al pool matemático', 'success');
      }
      return;
    }
    
    // Normal drop on result zone
    if (targetId === 'result-zone') {
      const result = handleOperationDrop(operationId);
      
      if (result.success) {
        if (result.isCompletedProblem) {
          playCorrectSound();
          showToast(`🎯 ¡Problema resuelto! ${gameState.currentProblem.correctOperation} = ${gameState.currentProblem.targetResult}`, 'success');
        } else if (result.message) {
          if (result.isCorrectOperation) {
            playCorrectSound();
          } else {
            playIncorrectSound();
          }
          showToast(result.message, result.isCorrectOperation ? 'success' : 'error');
        }
      } else {
        playIncorrectSound();
        showToast(result.message || 'Operación incompatible', 'error');
      }
    }
  };

  const handleNextProblem = () => {
    nextProblem();
    showToast('🏙️ ¡Nuevo desafío matemático cargado!', 'success');
  };

  const handleUseHint = () => {
    if (triggerHint()) {
      showToast(gameStats.currentProblem.hint, 'info');
    } else {
      showToast('No tienes más pistas disponibles', 'error');
    }
  };

  const activeDraggedOperation = activeOperation 
    ? gameState.currentProblem.availableOperations.find(op => op.id === activeOperation)
    : null;

  return (
    <div className="w-full min-h-screen overflow-auto bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-4">
          <Link 
            to="/app/niveles" 
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
          >
            <IoIosArrowRoundBack className="text-xl" />
            <span className="hidden sm:inline">Volver al mapa</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-white text-xl sm:text-2xl font-bold">
              Ciudad Matemática
            </h1>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-bold border border-purple-500/30">
              Nivel 3 - Ciudad Matemática
            </span>
          </div>
          <div className="ml-auto">
            <CoinsDisplay />
          </div>
        </div>

        {/* Stats section */}
        <div className="mb-6">
          <MathCityStatsComponent {...gameStats} />
        </div>

        <DndContext 
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Main game area */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-6">
            
            {/* Left column - Image and story */}
            <div className="xl:col-span-1 space-y-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
                <img
                  src={tomas_3}
                  alt="Tomás explorando la Ciudad Matemática"
                  className="w-full h-48 sm:h-56 xl:h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-3">La Aventura de Ari</h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    Ari llegó a la fascinante Ciudad Matemática, donde todo está organizado en grupos perfectos. 
                    El alcalde le explicó: 'Aquí debes identificar las operaciones correctas que representan cada 
                    situación. Por ejemplo, si ves 3 tiendas con 4 productos cada una, la operación es 4+4+4=12.'
                  </p>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                    <p className="text-purple-300 text-sm font-semibold">
                      🏙️ "¡Voy a resolver todos los problemas matemáticos de la ciudad!"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem description */}
            <div className="xl:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 h-fit">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">
                    {gameState.currentProblemIndex + 1}
                  </span>
                  {gameStats.currentProblem.title}
                </h3>
                
                <p className="text-white/90 mb-4 leading-relaxed">
                  {gameStats.currentProblem.description}
                </p>
                
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Resultado:</span>
                    <span className="text-xl font-bold text-purple-400">
                      {gameStats.currentProblem.targetResult}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Operación correcta:</span>
                    <span className="text-sm text-purple-300">
                      ? + ? + ? = {gameStats.currentProblem.targetResult}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Dificultad:</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      gameStats.currentProblem.difficulty === 'easy' 
                        ? 'bg-green-500/20 text-green-400' 
                        : gameStats.currentProblem.difficulty === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {gameStats.currentProblem.difficulty === 'easy' ? 'Fácil' : 
                       gameStats.currentProblem.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleUseHint}
                    disabled={gameStats.hintsRemaining === 0 || gameState.isCompleted}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    💡 Usar Pista ({gameStats.hintsRemaining})
                  </button>
                  
                  {/* Only show reset button if problem is NOT completed */}
                  {!gameState.isCompleted && (
                    <button
                      onClick={resetProblem}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      🔄 Reiniciar Problema
                    </button>
                  )}
                  
                  {/* Next problem button */}
                  {gameState.isCompleted && !gameStats.isLevelCompleted && (
                    <button
                      onClick={handleNextProblem}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      ➡️ Siguiente Problema
                    </button>
                  )}

                  {/* Next level button */}
                  {gameStats.isLevelCompleted && (
                    <Link
                      to="/app/niveles/4"
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors text-sm text-center block"
                    >
                      🚀 Avanzar al Siguiente Nivel
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Game area with groups and result zone */}
            <div className="xl:col-span-3 space-y-4">
              {/* Groups display */}
              {gameState.currentProblem.groups.map((group) => (
                <FilledGroupDisplay key={group.id} group={group} />
              ))}
              
              {/* Result drop zone */}
              <ResultDropZone resultZone={resultZone} />

              {/* Completion message */}
              {gameState.isCompleted && (
                <div className="text-center p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                  <p className="text-purple-300 font-bold text-lg">
                    🎯 ¡Excelente! Has resuelto el problema matemático
                  </p>
                  <p className="text-purple-200 text-sm mt-1">
                    {gameState.currentProblem.correctOperation} = {gameState.currentProblem.targetResult}
                  </p>
                </div>
              )}

              {/* Level completion message */}
              {gameStats.isLevelCompleted && (
                <div className="text-center p-4 bg-pink-500/20 border border-pink-500/30 rounded-lg">
                  <p className="text-pink-300 font-bold text-lg">
                    🎉 ¡Ciudad Matemática Conquistada!
                  </p>
                  <p className="text-pink-200 text-sm mt-1">
                    Has dominado todas las operaciones matemáticas de la ciudad. ¡Hora de avanzar!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Available Operations */}
          <OperationsPool 
            operations={gameState.currentProblem.availableOperations}
            title="🧮 Operaciones Matemáticas Disponibles"
          />

          {/* Drag Overlay */}
          <DragOverlay>
            {activeDraggedOperation && (
              <DraggableOperation 
                operation={activeDraggedOperation}
                isOverlay={true}
              />
            )}
          </DragOverlay>
        </DndContext>

        {/* Toast notifications */}
        <Toast 
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </div>
    </div>
  );
}
