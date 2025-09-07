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
import TechCircuit from "./TechCircuit";

import tomas_2 from "/personajes/robot.jpeg";
import RepeatedAdditionStats from "./RepeatedAdditionStats";

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
          showToast('🔧 Componente devuelto al laboratorio', 'success');
        }
      }
      return;
    }
    
    // Normal drop on addition box
    if (targetId.startsWith('box-')) {
      const result = handleNumberDrop(numberId, targetId);
      
      if (result.success) {
        if (result.isCompletedProblem) {
          showToast(`🎯 ¡Circuito Activado! ${gameState.currentProblem.correctNumber} × ${gameState.currentProblem.repetitions} = ${gameState.currentProblem.targetResult}`, 'success');
        } else if (result.message) {
          showToast(result.message, result.isCorrectPlacement ? 'success' : 'error');
        }
      } else {
        showToast(result.message || 'Componente incompatible con este circuito', 'error');
      }
    }
  };

  const handleNextProblem = () => {
    nextProblem();
    showToast('🔧 ¡Nuevo circuito tecnológico cargado!', 'success');
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
              Laboratorio Tecnológico
            </h1>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-bold border border-blue-500/30">
              Nivel 2 - Centro de Tecnología
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
                  alt="Tomás reparando el robot en el laboratorio"
                  className="w-full h-48 sm:h-56 xl:h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-3">La Aventura de Tomás</h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    Tomás entró al Laboratorio de Tecnología y encontró un robot averiado. El científico le explicó: 
                    'Este robot se repara resolviendo circuitos de suma repetida. Por ejemplo, si necesita 3 sensores 
                    de 2 unidades cada uno, debes programar 2+2+2=6 para activar su sistema.'
                  </p>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-300 text-sm font-semibold">
                      🤖 "¡Voy a reparar este robot resolviendo todos los circuitos tecnológicos!"
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
                      🔄 Reiniciar Circuito
                    </button>
                  )}
                  
                  {/* Next problem button */}
                  {gameState.isCompleted && !gameStats.isLevelCompleted && (
                    <button
                      onClick={handleNextProblem}
                      className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      ➡️ Siguiente Circuito
                    </button>
                  )}

                  {/* Next level button */}
                  {gameStats.isLevelCompleted && (
                    <Link
                      to="/app/niveles/nivel-3"
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm text-center block"
                    >
                      🚀 Avanzar al Siguiente Nivel
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Addition boxes area */}
            <div className="xl:col-span-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                <h3 className="text-white font-bold text-lg mb-4 text-center">
                  🔧 Programar Circuito tecnológico de agrupamientos repetidos
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

                {/* Tech Circuit Display */}
                <TechCircuit 
                  boxes={gameState.additionBoxes}
                  targetResult={gameState.currentProblem.targetResult}
                  isCompleted={gameState.isCompleted}
                />

                {/* Progress indicator */}
                <div className="mt-6 text-center">
                  <div className="text-white/70 text-sm mb-2">
                    🔌 Conexiones del Circuito: {gameState.additionBoxes.filter(box => box.currentNumber !== null).length} / {gameState.additionBoxes.length}
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-3 border border-cyan-500/30">
                    <div 
                      className={`
                        h-3 rounded-full transition-all duration-500
                        ${gameState.isCompleted 
                          ? 'bg-gradient-to-r from-green-500 to-cyan-400 animate-pulse shadow-lg shadow-green-500/50' 
                          : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        }
                      `}
                      style={{ 
                        width: `${(gameState.additionBoxes.filter(box => box.currentNumber !== null).length / gameState.additionBoxes.length) * 100}%` 
                      }}
                    />
                  </div>
                  {gameState.isCompleted && (
                    <div className="text-green-400 text-xs mt-1 animate-pulse">
                      ⚡ Sistema Operativo - Circuito Activado
                    </div>
                  )}
                </div>

                {gameState.isCompleted && (
                  <div className="mt-4 text-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <p className="text-green-300 font-bold">
                      ⚡ ¡Circuito Activado! {gameState.currentProblem.correctNumber} × {gameState.currentProblem.repetitions} = {gameState.currentProblem.targetResult}
                    </p>
                    <p className="text-green-200 text-sm mt-1">
                      🔧 La máquina tecnológica calculó: {Array(gameState.currentProblem.repetitions).fill(gameState.currentProblem.correctNumber).join(' + ')} = {gameState.currentProblem.targetResult}
                    </p>
                  </div>
                )}

                {/* Level completion message */}
                {gameStats.isLevelCompleted && (
                  <div className="mt-4 text-center p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                    <p className="text-purple-300 font-bold text-lg">
                      🎉 ¡Centro de Tecnología Completado!
                    </p>
                    <p className="text-purple-200 text-sm mt-1">
                      Has dominado todos los circuitos de suma repetida. ¡Hora de avanzar al siguiente nivel!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Available Numbers */}
          <NumbersPool 
            numbers={gameState.availableNumbers}
            title="🔢 Componentes Numéricos del Laboratorio"
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
