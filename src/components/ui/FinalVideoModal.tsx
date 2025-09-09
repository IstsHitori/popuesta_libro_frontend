import { useState, useRef, useEffect } from 'react';
import { useGameTimer } from '@/hooks/ui/useGameTimer';

interface FinalVideoModalProps {
  isVisible: boolean;
  onVideoComplete: () => void; // Cambiar de onClose a onVideoComplete
}

export default function FinalVideoModal({ isVisible, onVideoComplete }: FinalVideoModalProps) {
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const { formattedTotalTime } = useGameTimer();

  useEffect(() => {
    if (isVisible) {
      // Mostrar el botón después de un tiempo mínimo
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 45000); // Mostrar botón después de 45 segundos como respaldo

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleFinish = () => {
    // Llamar a onVideoComplete para mostrar el modal de fortaleza conquistada
    onVideoComplete();
  };

  const handleSkip = () => {
    handleFinish();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-5xl bg-gradient-to-br from-purple-900/95 to-blue-900/95 rounded-2xl p-6 border-2 border-yellow-500/50 shadow-2xl">
        
        {/* Título de Felicitación */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 animate-pulse" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            🎉 ¡AVENTURA COMPLETADA! 🎉
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-2">
            ¡Felicidades por completar toda la aventura de Numerika!
          </p>
          <div className="bg-black/30 rounded-lg p-3 border border-blue-500/30 inline-block">
            <p className="text-blue-300 font-bold">
              ⏱️ Tiempo Total: <span className="text-white font-mono">{formattedTotalTime}</span>
            </p>
          </div>
        </div>

        {/* Video Container */}
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-6">
          <iframe
            ref={videoRef}
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
          
          {/* Botón Saltar (siempre visible) */}
          <button
            onClick={handleSkip}
            className="px-6 py-3 bg-gray-600/80 hover:bg-gray-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 border border-gray-500/50"
          >
            ⏭️ Saltar Video
          </button>

          {/* Botón Continuar (aparece después del tiempo mínimo) */}
          {showButton && (
            <button
              onClick={handleFinish}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
            >
              � ¡Ver Resultados!
            </button>
          )}
        </div>

        {/* Indicador de progreso */}
        {!showButton && (
          <div className="text-center mt-4">
            <p className="text-white/70 text-sm">
              El botón "Ver Resultados" aparecerá cuando termine el video...
            </p>
            <div className="mt-2 w-full bg-gray-700/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        )}

        {/* Mensaje de Logro */}
        <div className="text-center mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
          <p className="text-yellow-300 font-bold text-lg mb-2">
            🌟 ¡Eres un Verdadero Maestro Matemático! 🌟
          </p>
          <p className="text-white/80 text-sm">
            Has demostrado tu habilidad en multiplicación, suma repetida, operaciones complejas y resolución de problemas. 
            ¡Continúa practicando y explorando el mundo de las matemáticas!
          </p>
        </div>
      </div>
    </div>
  );
}
