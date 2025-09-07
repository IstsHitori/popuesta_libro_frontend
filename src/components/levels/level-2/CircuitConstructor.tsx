import { DndContext, DragOverlay } from "@dnd-kit/core";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useCircuitGame } from "../../../hooks/game/useCircuitGame";
import { useToast } from "../../../hooks/ui/useToast";
import { Toast } from "../../ui/Toast";
import { CIRCUIT_THEME } from "../../../constants/circuit-config";
import CircuitBoard from "./CircuitBoard";
import CircuitStats from "./CircuitStats";
import ComponentsPool from "./ComponentsPool";
import DraggableComponent from "./DraggableComponent";

import tomas_2 from "/tomas/tomas-2.png";

export default function CircuitConstructor() {
  const { 
    gameState, 
    gameStats, 
    handleComponentDrop, 
    handleComponentRemoval, 
    nextProblem, 
    resetProblem, 
    triggerHint 
  } = useCircuitGame();
  const { toast, showToast, hideToast } = useToast();
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveComponent(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveComponent(null);
    
    if (!event.over) {
      return;
    }

    const componentId = event.active.id as string;
    const targetId = event.over.id as string;
    
    // Check if dropping back to components pool
    if (targetId === 'components-pool') {
      const result = handleComponentRemoval(componentId);
      if (result.success) {
        showToast(result.message || 'Componente devuelto al pool', 'success');
      }
      return;
    }
    
    // Normal drop on slot
    const result = handleComponentDrop(componentId, targetId);
    
    if (result.success) {
      if (result.completedCircuit) {
        showToast(result.message || '¡Circuito completado!', 'success');
      } else if (result.message) {
        showToast(result.message, result.isCorrectSolution ? 'success' : 'error');
      }
    } else {
      showToast(result.message || 'No se puede colocar aquí', 'error');
    }
  };

  const handleNextProblem = () => {
    nextProblem();
    showToast('¡Nuevo circuito cargado!', 'success');
  };

  const handleUseHint = () => {
    if (gameStats.hintsRemaining > 0) {
      triggerHint();
      showToast(gameStats.currentProblem.hint || 'Pista revelada', 'info');
    } else {
      showToast('No tienes más pistas disponibles', 'error');
    }
  };

  const activeDraggedComponent = activeComponent 
    ? gameState.availableComponents.find(comp => comp.id === activeComponent)
    : null;

  return (
    <div className="w-full overflow-auto bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 p-4">
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
              Constructor de Circuitos
            </h1>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-bold border border-blue-500/30">
              Nivel 2
            </span>
          </div>
        </div>

        {/* Stats section */}
        <div className="mb-6">
          <CircuitStats 
            totalProblems={gameStats.totalProblems}
            completedProblems={gameStats.completedProblems}
            progressPercentage={gameStats.progressPercentage}
            score={gameStats.score}
            hintsRemaining={gameStats.hintsRemaining}
            isLevelCompleted={gameState.isLevelCompleted}
          />
        </div>

        <DndContext 
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Main game area with story and game */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-6">
            
            {/* Left column - Image and story */}
            <div className="xl:col-span-1 space-y-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
                <img
                  src={tomas_2}
                  alt="Tomás en el gallinero"
                  className="w-full h-48 sm:h-56 xl:h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-3">La Aventura de Tomás</h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    Tomás llegó al gallinero con su mamá. Ella dijo: 'Hoy recogimos 3 canastas de huevos, 
                    y en cada una hay 8 huevos. Necesitamos saber cuántos huevos hay en total para repartirlos.' 
                    Tomás anotó en su libreta: '8 + 8 + 8 = 24'.
                  </p>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-300 text-sm font-semibold">
                      🔬 "¡Ahora voy a crear circuitos que multipliquen automáticamente!"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem description */}
            <div className="xl:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 h-fit">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">
                    {gameState.currentProblemIndex + 1}
                  </span>
                  {gameStats.currentProblem.title}
                </h3>
                
                <p className="text-white/90 mb-4 leading-relaxed">
                  {gameStats.currentProblem.description}
                </p>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">Objetivo:</span>
                    <span 
                      className="text-xl font-bold"
                      style={{ color: CIRCUIT_THEME.accentColor }}
                    >
                      {gameStats.currentProblem.targetResult} unidades
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
                <div className="flex flex-col gap-2 mt-4">
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
                  
                  {gameState.circuitBoard.isCompleted && (
                    <button
                      onClick={handleNextProblem}
                      disabled={gameState.currentProblemIndex >= gameStats.totalProblems - 1}
                      className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      ➡️ Siguiente Circuito
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Circuit Board */}
            <div className="xl:col-span-3">
              <CircuitBoard 
                board={gameState.circuitBoard}
                currentProblem={gameStats.currentProblem}
              />
            </div>
          </div>

          {/* Available Components */}
          <ComponentsPool 
            components={gameState.availableComponents}
            title="Componentes Disponibles"
          />

          {/* Drag Overlay */}
          <DragOverlay>
            {activeDraggedComponent && (
              <DraggableComponent 
                component={activeDraggedComponent}
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
