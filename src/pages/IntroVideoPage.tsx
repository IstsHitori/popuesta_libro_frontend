import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IntroVideoPage() {
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mostrar el botón después de que termine el video o después de un tiempo mínimo
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 30000); // Mostrar botón después de 30 segundos como respaldo

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    // Marcar que el usuario ya vio el video intro
    localStorage.setItem('hasSeenIntro', 'true');
    navigate('/app');
  };

  const handleSkip = () => {
    // Marcar que el usuario ya vio el video intro (aunque lo haya saltado)
    localStorage.setItem('hasSeenIntro', 'true');
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
        
        {/* Título */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            🎬 ¡Bienvenido a la Aventura!
          </h1>
          <p className="text-white/90 text-lg md:text-xl">
            Descubre el mundo de Numerika con Ari
          </p>
        </div>

        {/* Video Container */}
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-6">
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/KaZhCljuccE?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0"
            title="Video Introductorio de Numerika"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              // El video se ha cargado
              console.log('Video cargado');
            }}
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

          {/* Botón Continuar (aparece después del video o tiempo mínimo) */}
          {showButton && (
            <button
              onClick={handleContinue}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
            >
              🚀 ¡Comenzar Aventura!
            </button>
          )}
        </div>

        {/* Indicador de progreso */}
        {!showButton && (
          <div className="text-center mt-4">
            <p className="text-white/70 text-sm">
              El botón "Comenzar Aventura" aparecerá cuando termine el video...
            </p>
            <div className="mt-2 w-full bg-gray-700/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '30%' }}></div>
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="text-center mt-6 p-4 bg-black/30 rounded-lg border border-white/10">
          <p className="text-white/80 text-sm">
            🎮 Prepárate para una emocionante aventura matemática junto a Ari en el mundo de Numerika
          </p>
        </div>
      </div>
    </div>
  );
}
