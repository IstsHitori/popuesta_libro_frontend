import { DndContext, DragOverlay } from "@dnd-kit/core";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useRepeatedAdditionGame } from "../../../hooks/game/useRepeatedAdditionGame";
import { useToast } from "../../../hooks/ui/useToast";
import { Toast } from "../../ui/Toast";
import CoinsDisplay from "../../ui/CoinsDisplay";
import AdditionBoxComponent from "./AdditionBoxComponent";
import DraggableNumberComponent from "./DraggableNumberComponent";
import NumbersPool from "./NumbersPool";
import RepeatedAdditionStats from "./RepeatedAdditionStats";

import tomas_2 from "/tomas/tomas-2.png";

export default function RepeatedAdditionGame() {
  const { 
    gameState, 
    gameStats, 
    handleNumberDrop, 
    handleNumberRemoval, 
    nextProblem, 
    resetProblem, 
    useHint: triggerHint 
  } = useRepeatedAdditionGame();
  const { toast, showToast, hideToast } = useToast();
  const [activeNumber, setActiveNumber] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveNumber(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveNumber(null);
    
    if (!event.over) {
      return;
    }

    const numberId = event.active.id as string;
    const targetId = event.over.id as string;
    
    // Check if dropping back to numbers pool
    if (targetId === 'numbers-pool') {
      // Find which box has this number and remove it
      const boxWithNumber = gameState.additionBoxes.find(box => 
        gameState.availableNumbers.find(n => n.id === numberId)?.value === box.currentNumber
      );
      
      if (boxWithNumber) {
        const result = handleNumberRemoval(boxWithNumber.id);
        if (result.success) {
          showToast(result.message || 'Número devuelto al pool', 'success');
        }
      }
      return;
    }
    
    // Normal drop on addition box
    if (targetId.startsWith('box-')) {
      const result = handleNumberDrop(numberId, targetId);
      
      if (result.success) {
        if (result.isCompletedProblem) {
          showToast(`¡Problema completado! ${gameState.currentProblem.correctNumber} × ${gameState.currentProblem.repetitions} = ${gameState.currentProblem.targetResult}`, 'success');
        } else if (result.message) {
          showToast(result.message, result.isCorrectPlacement ? 'success' : 'error');
        }
      } else {
        showToast(result.message || 'No se puede colocar aquí', 'error');
      }
    }
  };

  const handleNextProblem = () => {
    nextProblem();
    showToast('¡Nuevo problema cargado!', 'success');
  };

  const handleUseHint = () => {
    if (triggerHint()) {
      showToast(gameStats.currentProblem.hint, 'info');
    } else {
      showToast('No tienes más pistas disponibles', 'error');
    }
  };

  const activeDraggedNumber = activeNumber 
    ? gameState.availableNumbers.find(num => num.id === activeNumber)
    : null;

  return (
    <div className="w-full min-h-screen overflow-auto bg-gradient-to-br from-blue-900/20 via-green-900/20 to-purple-900/20 p-4">
      <div className="container mx-auto max-w-7xl">
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
              Suma Repetida
            </h1>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-bold border border-blue-500/30">
              Nivel 2
            </span>
          </div>
          <div className="ml-auto">
            <CoinsDisplay />
          </div>
        </div>

        {/* Stats section */}
        <div className="mb-6">
          <RepeatedAdditionStats {...gameStats} />
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
                  src={tomas_2}
                  alt="Tomás aprendiendo suma repetida"
                  className="w-full h-48 sm:h-56 xl:h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-3">La Aventura de Tomás</h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    Tomás descubrió que la multiplicación es suma repetida. Su mamá le enseñó: 
                    'Si tienes 3 grupos de 2 objetos, puedes sumar 2+2+2=6, que es lo mismo que 3×2=6.'
                  </p>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                    <p className="text-green-300 text-sm font-semibold">
                      🧮 "¡Ahora entiendo! La multiplicación es sumar el mismo número varias veces!"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem description */}
            <div className="xl:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 h-fit">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm">
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
                    <span 
                      className="text-xl font-bold text-green-400"
                    >
                      {gameStats.currentProblem.targetResult}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Cajas:</span>
                    <span className="text-sm text-blue-400">
                      {gameStats.currentProblem.repetitions} cajas
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
                    disabled={gameStats.hintsRemaining === 0}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    💡 Usar Pista ({gameStats.hintsRemaining})
                  </button>
                  
                  <button
                    onClick={resetProblem}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    🔄 Reiniciar
                  </button>
                  
                  {gameState.isCompleted && (
                    <button
                      onClick={handleNextProblem}
                      disabled={gameState.currentProblemIndex >= gameStats.totalProblems - 1}
                      className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      ➡️ Siguiente Problema
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Addition boxes area */}
            <div className="xl:col-span-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                <h3 className="text-white font-bold text-lg mb-4 text-center">
                  Completa la suma repetida
                </h3>
                
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {gameState.additionBoxes.map((box) => (
                    <AdditionBoxComponent
                      key={box.id}
                      box={box}
                      targetResult={gameState.currentProblem.targetResult}
                      repetitions={gameState.currentProblem.repetitions}
                    />
                  ))}
                </div>

                {/* Progress indicator */}
                <div className="mt-6 text-center">
                  <div className="text-white/70 text-sm mb-2">
                    Progreso: {gameState.additionBoxes.filter(box => box.currentNumber !== null).length} / {gameState.additionBoxes.length}
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(gameState.additionBoxes.filter(box => box.currentNumber !== null).length / gameState.additionBoxes.length) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {gameState.isCompleted && (
                  <div className="mt-4 text-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <p className="text-green-300 font-bold">
                      ¡Excelente! {gameState.currentProblem.correctNumber} × {gameState.currentProblem.repetitions} = {gameState.currentProblem.targetResult}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Available Numbers */}
          <NumbersPool 
            numbers={gameState.availableNumbers}
            title="Números Disponibles"
          />

          {/* Drag Overlay */}
          <DragOverlay>
            {activeDraggedNumber && (
              <DraggableNumberComponent 
                number={activeDraggedNumber}
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
