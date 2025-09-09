import { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useFortressGame } from "../../../hooks/game/useFortressGame";
import { useToast } from "../../../hooks/ui/useToast";
import { useSoundEffects } from "../../../hooks/ui/useSoundEffects";
import { Toast } from "../../ui/Toast";
import CoinsDisplay from "../../ui/CoinsDisplay";
import FortressMatrixComponent from "./FortressMatrix";
import FortressOptions from "./FortressOptions";
import FortressStatsComponent from "./FortressStats";

export default function FortressGame() {
  const { 
    gameState, 
    gameStats, 
    selectOption, 
    useHint: triggerHint, 
    resetProblem 
  } = useFortressGame();

  const { toast, showToast, hideToast } = useToast();
  const { playCorrectSound, playIncorrectSound, playVictorySound } = useSoundEffects();
  const [isProcessing, setIsProcessing] = useState(false);

  // Reproducir sonido de victoria cuando se completa el nivel
  useEffect(() => {
    if (gameState.isLevelCompleted) {
      playVictorySound();
    }
  }, [gameState.isLevelCompleted, playVictorySound]);

  const handleOptionSelect = async (optionId: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    const result = selectOption(optionId);
    
    if (result.success) {
      // Reproducir sonido de éxito
      playCorrectSound();
      showToast(result.message || '🎯 ¡Respuesta correcta!', 'success');
    } else {
      // Reproducir sonido de error
      playIncorrectSound();
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
      <div className="w-full min-h-screen overflow-auto bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-yellow-900/20 p-4 relative">
        {/* Partículas de celebración en el fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-70"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-amber-500 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute bottom-32 left-16 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-50"></div>
          <div className="absolute bottom-20 right-32 w-2 h-2 bg-yellow-300 rounded-full animate-bounce opacity-80"></div>
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-amber-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-orange-300 rounded-full animate-ping opacity-70"></div>
        </div>

        <div className="container mx-auto max-w-5xl flex items-center justify-center min-h-screen relative z-10">
          <div className="w-full bg-gradient-to-br from-purple-900/95 to-blue-900/95 rounded-2xl p-6 border-2 border-yellow-500/50 shadow-2xl">
            
            {/* Título de Felicitación */}
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 animate-pulse" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                🎉 ¡NIVEL 4 COMPLETADO! 🎉
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-2">
                ¡Felicidades! Has conquistado todos los desafíos de Numerika
              </p>
            </div>

            {/* Video Container */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-6">
              <iframe
                src="https://www.youtube.com/embed/HktqvePKwCE?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0"
                title="Video Final de Numerika - ¡Aventura Completada!"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Controles */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              
              {/* Botón para ir al mapa */}
              <Link 
                to="/app/niveles" 
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                � ¡Ver Resultados!
              </Link>
            </div>

            {/* Mensaje de Logro */}
            <div className="text-center mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
              <p className="text-yellow-300 font-bold text-lg mb-2">
                � ¡Eres un Verdadero Maestro Matemático! 🌟
              </p>
              <p className="text-white/80 text-sm">
                Has demostrado tu habilidad en multiplicación, suma repetida, operaciones complejas y resolución de problemas. 
                ¡Continúa practicando y explorando el mundo de las matemáticas!
              </p>
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
                    alt="Ari explorando la fortaleza"
                    className="w-full h-48 sm:h-56 xl:h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/tomas/tomas-3.png";
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg mb-3">El desafío de Caos</h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                      Cuando Ari se acercó al puente que llevaba a la Fortaleza de la Ingeniería, una sombra 
                      siniestra apareció bloqueando su camino. Era <strong>Caos</strong>, el villano que había 
                      aterrorizado el reino matemático. Con una sonrisa malévola, Caos declaró: 
                      "¡Para cruzar mi puente y entrar a la fortaleza, debes resolver mi acertijo más diabólico! 
                      Solo los agrupamientos repetidos te permitirán avanzar por el camino dorado, ¡si es que puedes!"
                    </p>
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-3">
                      <p className="text-red-300 text-sm font-semibold">
                        👹 <strong>Caos:</strong> "¡Muajaja! ¿Crees que puedes derrotar mis trampas matemáticas, pequeña Ari?"
                      </p>
                    </div>
                    <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3">
                      <p className="text-amber-300 text-sm font-semibold">
                        🏰 <strong>Ari:</strong> "¡Acepto tu desafío, Caos! Con mis conocimientos de agrupamientos 
                        repetidos cruzaré tu puente y conquistaré la fortaleza!"
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
