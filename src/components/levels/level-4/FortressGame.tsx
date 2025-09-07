import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useFortressGame } from "../../../hooks/game/useFortressGame";
import { useToast } from "../../../hooks/ui/useToast";
import { Toast } from "../../ui/Toast";
import CoinsDisplay from "../../ui/CoinsDisplay";
import FortressMatrixComponent from "./FortressMatrix";
import FortressOptions from "./FortressOptions";
import FortressStatsComponent from "./FortressStats";

import tomas_ganador from "/tomas/tomas-ganador.png";

export default function FortressGame() {
  const { 
    gameState, 
    gameStats, 
    selectOption, 
    useHint: triggerHint, 
    resetProblem 
  } = useFortressGame();

  const { toast, showToast, hideToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOptionSelect = async (optionId: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    const result = selectOption(optionId);
    
    if (result.success) {
      showToast(result.message || '🎯 ¡Respuesta correcta!', 'success');
    } else {
      showToast(result.message || '❌ Respuesta incorrecta', 'error');
    }
    
    // Pequeño delay para mostrar el feedback antes de continuar
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
  };

  const handleHint = () => {
    const hintMessage = triggerHint();
    showToast(hintMessage, 'info');
  };

  const handleReset = () => {
    resetProblem();
    showToast('🔄 Batalla reiniciada', 'info');
  };

  if (gameState.isLevelCompleted) {
    return (
      <div className="w-full min-h-screen overflow-auto bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-yellow-900/20 p-4">
        <div className="container mx-auto max-w-4xl flex items-center justify-center min-h-screen">
          <div className="bg-white/95 rounded-3xl p-8 text-center shadow-2xl border-4 border-amber-400">
            <img src={tomas_ganador} alt="Tomas conquistador" className="w-32 h-32 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-amber-800 mb-4">
              🏰 ¡Fortaleza Conquistada! 🏰
            </h2>
            <p className="text-amber-700 mb-6 text-lg">
              ¡Increíble trabajo, Tomás! Has navegado exitosamente a través de todos los caminos de la fortaleza. 
              Tu dominio de las operaciones matemáticas te ha llevado a la victoria.
            </p>
            <FortressStatsComponent 
              {...gameStats}
            />
            <div className="flex gap-4 justify-center mt-6">
              <Link 
                to="/app/niveles" 
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors shadow-lg"
              >
                🏠 Volver al mapa
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

      return (
        <div className="w-full min-h-screen overflow-auto bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-yellow-900/20 p-4">
          <div className="container mx-auto max-w-7xl">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-4">
              <Link 
                to="/app/niveles" 
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                <IoIosArrowRoundBack className="text-xl" />
                <span className="hidden sm:inline">Volver al mapa</span>
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-white text-xl sm:text-2xl font-bold">
                  Fortaleza de la Ingeniería
                </h1>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-bold border border-amber-500/30">
                  Nivel 4 - Fortaleza
                </span>
              </div>
              <div className="ml-auto">
                <CoinsDisplay />
              </div>
            </div>

            {/* Main game area */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              
              {/* Left column - Image and story */}
              <div className="xl:col-span-1 space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
                  <img
                    src="/tomas/fortaleza-de-la-ingenieria.png"
                    alt="Tomás explorando la fortaleza"
                    className="w-full h-48 sm:h-56 xl:h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/tomas/tomas-3.png";
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg mb-3">El camino de la fortaleza</h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                      Tomás llegó a la antigua Fortaleza de la Ingeniería. El guardián le explicó: 
                      'Para atravesar esta fortaleza debes seguir el camino dorado resolviendo operaciones. 
                      Cada celda del camino tiene un número objetivo, y debes elegir la operación correcta 
                      que da ese resultado.'
                    </p>
                    <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3">
                      <p className="text-amber-300 text-sm font-semibold">
                        🏰 "¡Voy a conquistar esta fortaleza paso a paso con mis conocimientos matemáticos!"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Problem description and controls */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 h-fit">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm">
                      {gameState.currentProblemIndex + 1}
                    </span>
                    {gameStats.currentProblem.title}
                  </h3>
                  
                  <p className="text-white/90 mb-4 leading-relaxed">
                    {gameStats.currentProblem.description}
                  </p>
                  
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Objetivo actual:</span>
                      <span className="text-2xl font-bold text-orange-400">
                        {gameStats.currentProblem.currentTarget}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Progreso:</span>
                      <span className="text-sm text-amber-400">
                        {gameStats.currentProblem.matrix.currentStep + 1} / {gameStats.currentProblem.matrix.path.length}
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

                  {/* Controls */}
                  <div className="space-y-2">
                    <button
                      onClick={handleHint}
                      disabled={gameStats.hintsRemaining === 0}
                      className={`
                        w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${gameStats.hintsRemaining > 0
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      💡 Pista ({gameStats.hintsRemaining})
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="w-full px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      🔄 Reiniciar
                    </button>
                  </div>
                </div>
              </div>

              {/* Matrix - Center */}
              <div className="xl:col-span-2">
                <FortressMatrixComponent 
                  matrix={gameStats.currentProblem.matrix}
                />
                
                {/* Stats below matrix */}
                <div className="mt-4">
                  <FortressStatsComponent {...gameStats} />
                </div>
              </div>
            </div>

            {/* Options horizontal at bottom */}
            <div className="mb-6">
              <FortressOptions 
                options={gameStats.currentProblem.options}
                currentTarget={gameStats.currentProblem.currentTarget}
                onSelectOption={handleOptionSelect}
                disabled={isProcessing}
              />
            </div>
          </div>      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
